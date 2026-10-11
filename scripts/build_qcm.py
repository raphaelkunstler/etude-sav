"""Génère qcm/qcm-neolis.js à partir de qcm/qcm-neolis.md.

Usage : python3 scripts/build_qcm.py
À relancer après chaque modification du QCM.
"""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = (root / "qcm" / "qcm-neolis.md").read_text(encoding="utf-8")

items = []
for m in re.finditer(r"\*\*(\d+)\. (.+?)\*\* *\nA\. (.+)\nB\. (.+)\nC\. (.+)\nD\. (.+)", src):
    items.append({"n": int(m.group(1)), "client": m.group(2),
                  "reponses": [m.group(i).strip() for i in range(3, 7)]})
ligne = src.split("**Corrigé :**")[1].split("\n")[0]
corrige = {int(n): l for n, l in re.findall(r"(\d+) ([ABCD])", ligne)}

nums = [it["n"] for it in items]
assert nums == list(range(1, len(items) + 1)), f"numérotation discontinue : {nums}"
assert set(corrige) == set(nums), "le corrigé ne couvre pas exactement les items"
for it in items:
    it["correcte"] = corrige[it["n"]]

js = ("/* Questionnaire à choix multiples de la conseillère Neolis.\n"
      "   Pour chaque message du client, quatre réponses : la bonne (correcte) et trois distracteurs.\n"
      "   Fichier généré : modifier qcm/qcm-neolis.md, puis relancer python3 scripts/build_qcm.py */\n"
      "window.QCM_NEOLIS = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n")
(root / "qcm" / "qcm-neolis.js").write_text(js, encoding="utf-8")
print(f"qcm-neolis.js régénéré : {len(items)} items")
