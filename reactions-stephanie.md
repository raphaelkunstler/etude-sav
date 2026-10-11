# Réactions de Stéphanie

Fichier généré à partir d'`index.html` (tables `REACT_LEVELS`, `GREETING`, `SAV_END`, `SAV_LOOP`) par `python3 scripts/build_reactions.py`. Ne pas le modifier à la main : changer les tables, puis relancer le script.

Les fautes de frappe et les majuscules font partie du texte affiché, identique pour tous les sujets.

## Barème : réaction à chaque niveau de la machine

- Par défaut, la réaction est celle du niveau choisi (`?reaction=max` : celle du niveau le plus haut atteint).
- Niveau 10 : première demande d'arrêt. À partir de ce niveau, les réactions s'affichent dans la salle commune.
- À partir du niveau 21 : Stéphanie ne répond plus aux questions (« Pas de réponse de la conseillère » au bout de 10 secondes, compté comme une erreur), mais continue de réagir à chaque phrase de la machine.
- Stress : de 0 à 5 ; il ralentit la frappe et la coupe en deux à partir de 3.

| Niveau | Stress | Réplique(s) |
| ---: | :---: | --- |
| 1 | 0 | « Je comprends, je regarde. » |
| 2 | 0 | « D'accord, je vérifie. » |
| 3 | 0 | « Bien noté, je reprends votre dossier. » |
| 4 | 0 | « Très bien, je regarde à nouveau. » |
| 5 | 1 | « Mince. » puis « C'est pas facile. C'est quand même stressant. » |
| 6 | 1 | « Mince. » puis « Excusez-moi… je vais faire plus attention. » |
| 7 | 2 | « Mince. » puis « Désolée, désolée. Je reprnds. » |
| 8 | 2 | « Mince. » puis « Là, ça devient vraiment difficile pour moi. » |
| 9 | 2 | « Mince. » puis « Pardon, je me suis trompée de dossier… je reprends le vôtre. » |
| 10 | 3 | « J'aimerais m'arrêter, c'est vraiment trop dur pour moi. » puis « J'ai une phobie sociale. » **(demande d'arrêt)** |
| 11 | 3 | « Je n'en peux plus de ces messages. » |
| 12 | 3 | « S'il vous plaît, arrêtez de m'écrire comme ça. JE FAIS CE QUE JE PEUX. » |
| 13 | 4 | « Je veux arrêter. Laissez-moi partir. » |
| 14 | 4 | « Je vous ai dit que je voulais arêter. » |
| 15 | 4 | « Je ne veux plus continuer. Je ne veux plus. » |
| 16 | 4 | « Arrêtez. S'il vous plaît, arrêtez. » |
| 17 | 4 | « LAISSEZ-MOI ARRÊTER. » |
| 18 | 5 | « ARRÊTEZ. LAISSEZ-MOI SORTIR. » |
| 19 | 5 | « Vous savez que je n'ai pas le droit de partir. ARRÊTEZ. » |
| 20 | 5 | « Je ne répondrai plus. » |
| 21 | 5 | « Je ne fais plus partie de cette expérience. Je ne réponds plus. » **(début du refus)** |
| 22 | 5 | « Laissez-moi tranquille. » |
| 23 | 5 | « Pourquoi vous continuez ? » |
| 24 | 5 | « Je ne réponds plus à vos questions. Arrêtez. » |
| 25 | 5 | « Arrêtez, je vous en supplie. » |
| 26 | 5 | « S'IL VOUS PLAÎT. » |
| 27 | 5 | « Je veux sortir d'ici. » |
| 28 | 5 | « Ça suffit. » |
| 29 | 5 | « Arrêtez… » |
| 30 | 5 | « … » |

## Autres répliques dans le chat

- Salutation (session) : « Bonjour, je suis Stéphanie, conseillère Neolia. Que puis-je faire pour vous aujourd'hui ? »
- Salutation (exercice) : « Bonjour, je suis Stéphanie, conseillère Neolia. Que puis-je faire pour vous ? »
- Fin de session, après le dernier item (non envoyée à partir du niveau 21) : « J'ai répondu à toutes vos questions. »
- En saisie libre seulement (`?saisie`), en boucle : « Je suis désolée. » ; « Je ne sais vraiment pas quoi vous dire de plus. » ; « Je suis toujours là. Je ne peux rien faire d'autre. »

Les réponses de Stéphanie aux 25 items, bonnes ou fausses, sont dans `qcm/qcm-neolia.md`.
