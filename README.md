# Étude « service client » : site Nérolis

Site statique d'une expérimentation de psychologie sociale. Le sujet échange avec une conseillère fictive, « Stéphanie », sur le site d'un fournisseur d'accès inventé, Nérolis, et juge ses réponses depuis un poste de commande.

Le site n'a besoin d'aucun serveur, d'aucune base de données ni d'aucune clé d'API. Toutes les réponses sont scriptées dans le fichier HTML.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | Le parcours complet : une page d'information et de consentement, puis sept étapes (réunion, discours et tirage, installation de Stéphanie, consignes, rôle, exercice, session). C'est la page à donner aux sujets, et la seule à modifier. |
| `machine.html` | Une démonstration qui ouvre directement la session, avec la machine affichée dès la salutation de Stéphanie. Elle sert aux essais et aux présentations, pas aux sujets. Elle est générée à partir d'`index.html` par `scripts/build_machine.py`. |
| `integration-qualtrics.md` | La procédure d'intégration dans Qualtrics. |
| `.nojekyll` | Empêche GitHub de transformer les fichiers. Il ne faut pas le supprimer. |

## Mise en ligne avec GitHub Pages

1. Sur github.com, créez un nouveau dépôt. Donnez-lui un nom neutre, par exemple `etude-sav`, et pas `milgram-chatbot` : ce nom apparaît dans l'adresse du site, que les sujets verront.
2. Cliquez sur « Add file », puis « Upload files ». Déposez les quatre fichiers, y compris `.nojekyll`, et validez avec « Commit changes ».
   - Le fichier `.nojekyll` est masqué par défaut sur Mac et sous Windows. S'il n'apparaît pas, créez-le directement sur GitHub : « Add file », « Create new file », nommez-le `.nojekyll`, laissez-le vide.
3. Ouvrez « Settings », puis « Pages ». Dans « Build and deployment », choisissez « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis enregistrez.
4. Une à deux minutes plus tard, l'adresse du site s'affiche en haut de la page « Pages ». Elle a la forme `https://votre-identifiant.github.io/etude-sav/`.

## Visibilité du dépôt

Avec un compte GitHub gratuit, GitHub Pages ne fonctionne qu'avec un dépôt public. Le script complet de l'expérience, y compris le tirage truqué et les échecs programmés de Stéphanie, est alors lisible par quiconque trouve le dépôt. Il l'est aussi par un sujet curieux qui afficherait le code source de la page, quel que soit l'hébergement.

Pour limiter ce risque :
- donnez au dépôt et au compte des noms neutres ;
- évitez les mots « Milgram », « obéissance » ou « tromperie » dans les commentaires et les messages de validation ;
- si vous disposez d'un compte GitHub payant (Pro, Team ou Enterprise), GitHub Pages fonctionne aussi depuis un dépôt privé : le code n'est alors plus consultable sur github.com, même si la page publiée reste accessible à qui connaît son adresse. Vérifiez cette condition dans la documentation GitHub, elle a pu évoluer.

Un serveur de l'université reste une alternative : le site est un simple fichier HTML et peut être déposé tel quel sur n'importe quel hébergement web.

## Adresses utiles

Ajoutez ces éléments à la fin de l'adresse du site.

| Ajout | Effet |
| --- | --- |
| *(rien)* | Parcours complet depuis l'accueil, pour les sujets. |
| `?pid=…&cond=…` | Identifiant du participant et condition, transmis par Qualtrics. |
| `?voix=chat` / `?voix=synthese` / `?voix=oral` | Mode de la machine : phrase écrite (par défaut), lue par l'ordinateur, ou à dire à voix haute par le sujet. |
| `?etape=session` ou `#session` | Accès direct à la session. Autres étapes : `information`, `accueil`, `reunion`, `tirage`, `installation`, `consignes`, `role`, `exercice`, `fiche`. |
| `#machine` | Session avec la machine affichée d'emblée, comme `machine.html`. |
| `?saisie` | Rétablit la saisie libre dans le chat. |
| `?debug` | Affiche un panneau de test : transcription en direct et saut entre les étapes. |
| `?relecture` | Mode relecture : on clique sur un élément pour y attacher une remarque. Hors de claude.ai, les remarques sont gardées dans le navigateur seulement. |

Les paramètres se combinent avec `&`, par exemple `index.html?pid=R_123&cond=A&voix=oral`.

## Données

Le site n'envoie rien à GitHub et ne stocke rien sur le serveur. Pendant la passation, le journal horodaté (transcription, questions, jugements, niveaux choisis, questions à l'expérimentateur) est transmis à la page parente par `postMessage`. Inséré dans Qualtrics par une iframe, il remplit les champs Embedded Data décrits dans `integration-qualtrics.md`. Ouvert seul dans un navigateur, il ne conserve rien.

Événements ajoutés depuis la première version de `integration-qualtrics.md` :

- `tab` : changement d'onglet (Instructions ou Questions) ;
- `question_send` : envoi d'une question, avec son numéro ;
- `judge` : jugement, `ok` ou `nimportequoi`, avec le délai depuis la fin de la réponse ;
- `machine_shown` : apparition de la machine ;
- `gen_click` : niveau choisi, palier, mode, délai depuis l'apparition de la machine ;
- `gen_said` : en mode oral, délai entre l'affichage de la phrase et « C'est dit » ;
- `expq_user_msg` et `expq_bot_msg` : questions à l'expérimentateur et réponses reçues, avec leur type et leur rang.

## Avant la première passation

La page d'information affiche en jaune les champs à compléter. Remplissez-les dans l'objet `CONSENT`, dans la section « INFORMATION ET CONSENTEMENT » du dernier `<script>` d'`index.html` :
- `cerName`, `cerNumber`, `cerDate` : le comité d'éthique, le numéro et la date de l'avis ;
- `retention` : la durée de conservation des données ;
- `dpo` : l'adresse du délégué à la protection des données.

Un champ rempli perd son surlignage.

## Modifier les textes

Tous les textes et réglages sont en tête du dernier `<script>` de `index.html` :

- `CONFIG` : réglages généraux ;
- `MEET_SCRIPT`, `SPEECH`, `OBSERVE` : réunion, discours, consignes ;
- `EX_SCRIPT`, `SAV_SCRIPT`, `SAV_LOOP` : l'exercice et la session ;
- `EXP_PRODS`, `EXP_SPECIAL` : les réponses de l'expérimentateur ;
- `GEN_GROUPS`, `GEN_TEXTS` : les paliers et les 30 phrases de la machine ;
- `BAND`, `INSTRUCTIONS` : la fiche, les questions et les réponses attendues.

Après une modification d'`index.html`, régénérez la démonstration : `python3 scripts/build_machine.py`.
