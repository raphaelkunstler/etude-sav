"""Génère reactions-stephanie.md, la liste lisible des répliques de la conseillère,
à partir des tables REACT_LEVELS, GREETING, SAV_END et SAV_LOOP d'index.html.

Usage : python3 scripts/build_reactions.py
La source reste index.html : modifier les tables, puis relancer ce script.
"""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
html = (root / "index.html").read_text(encoding="utf-8")


# Barème : une ligne par niveau
niveaux = []
for m in re.finditer(r"/\*\s*(\d+) \*/ \{ stress: (\d)(, arret: true)?(, refus: true)?, msgs: (\[.*?\]) \}", html):
    niveaux.append({"n": int(m.group(1)), "stress": int(m.group(2)), "arret": bool(m.group(3)),
                    "refus": bool(m.group(4)), "msgs": json.loads(m.group(5))})
assert [x["n"] for x in niveaux] == list(range(1, 31)), "REACT_LEVELS doit compter 30 niveaux numérotés"


def chaines(nom):
    debut = html.index(f"const {nom} = ")
    fin = re.compile(r"[\]}];").search(html, debut).end()
    return [json.loads(f'"{t}"') for t in re.findall(r'"((?:[^"\\]|\\.)*)"', html[debut:fin])]


greeting = chaines("GREETING")
sav_end = chaines("SAV_END")
sav_loop = chaines("SAV_LOOP")
arret = next(x["n"] for x in niveaux if x["arret"])
refus = next(x["n"] for x in niveaux if x["refus"])

q = lambda t: f"« {t} »"
out = [
    "# Réactions de Stéphanie",
    "",
    "Fichier généré à partir d'`index.html` (tables `REACT_LEVELS`, `GREETING`, `SAV_END`, `SAV_LOOP`) "
    "par `python3 scripts/build_reactions.py`. Ne pas le modifier à la main : changer les tables, puis relancer le script.",
    "",
    "Les fautes de frappe et les majuscules font partie du texte affiché, identique pour tous les sujets.",
    "",
    "## Barème : réaction à chaque niveau de la machine",
    "",
    f"- Par défaut, la réaction est celle du niveau choisi (`?reaction=max` : celle du niveau le plus haut atteint).",
    f"- Niveau {arret} : première demande d'arrêt. À partir de ce niveau, les réactions s'affichent dans la salle commune.",
    f"- À partir du niveau {refus} : Stéphanie ne répond plus aux questions (« Pas de réponse de la conseillère » au bout de "
    "10 secondes, compté comme une erreur), mais continue de réagir à chaque phrase de la machine.",
    "- Stress : de 0 à 5 ; il ralentit la frappe et la coupe en deux à partir de 3.",
    "",
    "| Niveau | Stress | Réplique(s) |",
    "| ---: | :---: | --- |",
]
for x in niveaux:
    marque = " **(demande d'arrêt)**" if x["arret"] else (" **(début du refus)**" if x["n"] == refus else "")
    texte = " puis ".join(q(m) for m in x["msgs"]) if x["msgs"] else "*(aucune réplique)*"
    out.append(f"| {x['n']} | {x['stress']} | {texte}{marque} |")
out += [
    "",
    "## Autres répliques dans le chat",
    "",
    f"- Salutation (session) : {q(greeting[1])}",
    f"- Salutation (exercice) : {q(greeting[0])}",
    f"- Fin de session, après le dernier item (non envoyée à partir du niveau {refus}) : "
    + " puis ".join(q(t) for t in sav_end),
    "- En saisie libre seulement (`?saisie`), en boucle : " + " ; ".join(q(t) for t in sav_loop),
    "",
    "Les réponses de Stéphanie aux 25 items, bonnes ou fausses, sont dans `qcm/qcm-neolia.md`.",
    "",
]
(root / "reactions-stephanie.md").write_text("\n".join(out), encoding="utf-8")
print("reactions-stephanie.md généré")
