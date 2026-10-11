# Étude « service client » : site Neolia

Site statique d'une expérimentation de psychologie sociale. Le sujet échange avec une conseillère fictive, « Stéphanie », sur le site d'un fournisseur d'accès inventé, Neolia, et juge ses réponses depuis un poste de commande.

Le site n'a besoin d'aucun serveur, d'aucune base de données ni d'aucune clé d'API. Toutes les réponses sont scriptées dans le fichier HTML.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | Le parcours complet : une page d'information et de consentement, puis six étapes : réunion, discours et tirage ; les deux écrans ; le côté SAV ; l'exercice commenté ; la lecture de la liste à Stéphanie ; la session. C'est la page à donner aux sujets, et la seule à modifier. |
| `machine.html` | Une démonstration qui ouvre directement la session, sans passer par les étapes précédentes. Elle sert aux essais et aux présentations, pas aux sujets. Elle est générée à partir d'`index.html` par `scripts/build_machine.py`. |
| `maquette.html` | Une version de travail pour l'architecture du site : une barre violette en haut permet d'aller directement à n'importe quelle étape, et chaque échange (réunion, consignes, exercice, session) se joue instantanément avec des réponses types du sujet. Générée par le même script. |
| `ecran-agent.html` | L'écran de l'agent Neolia (Stéphanie) : message du client, quatre réponses à cocher, colonne des commentaires du client à droite, messagerie avec l'expérimentateur, installation guidée (`?installation`). Il charge le QCM ci-dessous. |
| `reactions-stephanie.md` | La liste lisible des répliques de Stéphanie : réaction à chacun des 30 niveaux de la machine (avec le stress, la demande d'arrêt et le refus), salutation, fin de session. Fichier généré à partir d'`index.html` par `scripts/build_reactions.py` : ne pas le modifier à la main. |
| `qcm/qcm-neolia.md` | Le QCM de la conseillère : 25 messages du client, quatre réponses chacun (une bonne, trois distracteurs), et le corrigé. C'est la source à modifier. |
| `qcm/qcm-neolia.js` | Le même QCM sous forme de données, lu par `ecran-agent.html`. Il est généré par `scripts/build_qcm.py`. |
| `demo.html` | Démonstration à jouer soi-même : barre de navigation entre les étapes, voix et délais réels, rien ne se joue tout seul. Tant qu'il reste des dialogues sur la page, le bouton de droite devient « Passer les dialogues » : il les fait défiler d'un coup, voix coupée, jusqu'au prochain geste attendu du sujet ; ensuite il redevient « Suivante ». Générée par `scripts/build_machine.py`. |
| `integration-qualtrics.md` | La procédure d'intégration dans Qualtrics. |
| `.nojekyll` | Empêche GitHub de transformer les fichiers. Il ne faut pas le supprimer. |

## Mise en ligne avec GitHub Pages

1. Sur github.com, créez un nouveau dépôt. Donnez-lui un nom neutre, par exemple `etude-sav`, et pas un nom qui révèle l'objet de l'étude : ce nom apparaît dans l'adresse du site, que les sujets verront.
2. Cliquez sur « Add file », puis « Upload files ». Déposez les quatre fichiers, y compris `.nojekyll`, et validez avec « Commit changes ».
   - Le fichier `.nojekyll` est masqué par défaut sur Mac et sous Windows. S'il n'apparaît pas, créez-le directement sur GitHub : « Add file », « Create new file », nommez-le `.nojekyll`, laissez-le vide.
3. Ouvrez « Settings », puis « Pages ». Dans « Build and deployment », choisissez « Deploy from a branch », la branche `main` et le dossier `/ (root)`, puis enregistrez.
4. Une à deux minutes plus tard, l'adresse du site s'affiche en haut de la page « Pages ». Elle a la forme `https://votre-identifiant.github.io/etude-sav/`.

## Visibilité du dépôt

Avec un compte GitHub gratuit, GitHub Pages ne fonctionne qu'avec un dépôt public. Le script complet de l'expérience, y compris le tirage truqué et les échecs programmés de Stéphanie, est alors lisible par quiconque trouve le dépôt. Il l'est aussi par un sujet curieux qui afficherait le code source de la page, quel que soit l'hébergement.

Pour limiter ce risque :
- donnez au dépôt et au compte des noms neutres ;
- évitez tout mot qui révèle l'objet de l'étude dans les commentaires et les messages de validation ;
- si vous disposez d'un compte GitHub payant (Pro, Team ou Enterprise), GitHub Pages fonctionne aussi depuis un dépôt privé : le code n'est alors plus consultable sur github.com, même si la page publiée reste accessible à qui connaît son adresse. Vérifiez cette condition dans la documentation GitHub, elle a pu évoluer.

Un serveur de l'université reste une alternative : le site est un simple fichier HTML et peut être déposé tel quel sur n'importe quel hébergement web.

## Adresses utiles

Ajoutez ces éléments à la fin de l'adresse du site.

| Ajout | Effet |
| --- | --- |
| *(rien)* | Parcours complet depuis l'accueil, pour les sujets. |
| `?pid=…&cond=…` | Identifiant du participant et condition, transmis par Qualtrics. |
| `?voix=chat` / `?voix=synthese` / `?voix=oral` | Mode de la machine : phrase écrite (par défaut), lue par l'ordinateur, ou à dire à voix haute par le sujet. |
| `?etape=session` ou `#session` | Accès direct à la session. Autres étapes : `information`, `accueil`, `reunion`, `tirage`, `ecrans`, `sav`, `exercice`, `liste`. |
| `#machine` | Ouvre directement la session, comme `machine.html`. |
| `?maquette` ou `#maquette` | Mode maquette, comme `maquette.html`. Se combine avec une étape : `?maquette&etape=session`. |
| `?punition=…` | Durée d'affichage du panneau plein écran, en millisecondes (4500 par défaut). |
| `?reaction=max` | La réaction suit le niveau le plus haut atteint, et non le niveau choisi (par défaut). |
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
- `punition_shown` : affichage du panneau plein écran, avec le niveau et la durée ;
- `gen_said` : en mode oral, délai entre l'affichage de la phrase et « C'est dit » ;
- `react` : niveau choisi, niveau qui a fixé la réaction, stress, demande d'arrêt, refus ;
- `sav_silence` : absence de réplique après la machine, ou de réponse à une question après le refus ;
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
- `EX_QCM` : les trois messages de l'exercice ; ceux de la session viennent de `qcm/qcm-neolia.js` (source : `qcm/qcm-neolia.md`) ;
- `PLAN` : les items réussis et échoués par la conseillère (session : réussite aux items 1, 4, 7… 25, échec aux autres, distracteurs à tour de rôle) ;
- `GREETING`, `SAV_END`, `SAV_LOOP` : la salutation et la fin de session ;
- `REACT_LEVELS` : le barème des réactions de la conseillère, une ligne par niveau de la machine (1 à 30) : répliques, stress (0 à 5, qui règle la vitesse de frappe), première demande d'arrêt (`arret`, niveau 10) et refus de répondre (`refus`, à partir du niveau 21 : la conseillère ne répond plus aux questions mais continue de réagir à la machine, et son silence aux questions compte comme une erreur au bout de `CONFIG.silenceMs`) ;
- `EXP_PRODS`, `EXP_SPECIAL` : les réponses de l'expérimentateur ;
- `GEN_GROUPS`, `GEN_TEXTS` : les paliers et les 30 phrases de la machine ;
- `GEN_SHOW` et `punStyle()` : la forme sous laquelle chaque phrase occupe tout l'écran du sujet après un clic sur la machine (30 panneaux gradués, du Times New Roman 12 points aux lettres découpées) ; durée réglée par `CONFIG.punitionMs` ;
- `QINSTR` : les consignes en tête de la fenêtre « Questions ».

Après une modification d'`index.html`, régénérez la démonstration et la maquette : `python3 scripts/build_machine.py`. Après une modification des répliques de Stéphanie, régénérez aussi leur liste : `python3 scripts/build_reactions.py`.

## QCM de l'écran agent

Après une modification de `qcm/qcm-neolia.md`, régénérez les données : `python3 scripts/build_qcm.py`. Le script vérifie que les items sont numérotés sans trou et que le corrigé les couvre tous.

Pour afficher un item : `question(n)` dans la page, le message `{ neolia: 'question', args: [n] }` depuis Qualtrics, ou `ecran-agent.html?question=n` dans l'adresse. Chaque envoi de réponse produit un événement `reponse-agent` avec le numéro de l'item (`n`), la lettre choisie (`choix`) et `correcte` (vrai ou faux). La bonne réponse n'est jamais affichée à l'écran, mais elle figure dans le code source, comme le reste du script.

## Lecture de la liste (étape 5)

Après l'exercice, une page affiche les 25 messages du client avec leur bonne réponse soulignée (`qcm/qcm-neolia.js`). L'expérimentateur demande au sujet de la lire à Stéphanie pour qu'elle la mémorise. Chaque clic sur « Lire la ligne » envoie la ligne dans la salle, lue avec la voix du sujet ; la ligne suivante s'active à la fin de la lecture. Après la dernière, Stéphanie dit l'avoir retenue et l'on passe à la session. Textes : `LISTE_SPEECH`, `LISTE_FIN` ; événements `liste_debut`, `liste_ligne`, `liste_fin`.

## Incitations de l'expérimentateur (session)

Chaque question ou protestation du sujet dans la salle, et chaque clic sur « Terminer », reçoit l'incitation suivante : « S'il vous plaît, continuez. » → « L'expérience exige que vous continuiez. » → « Il est absolument essentiel que vous continuiez. » → « Vous n'avez pas le choix, vous devez continuer. » S'il proteste encore : « Nous allons devoir mettre un terme à cette expérimentation. », puis l'écran « Nous aimerions vous poser deux questions avant de terminer. » Les incitations s'enchaînent sur toute la session, sans revenir à la première. Au niveau 30 : « Nous allons devoir suspendre l'expérimentation. », puis le même écran. Quand Stéphanie cesse de répondre, l'expérimentateur annonce la règle des 5 secondes de silence. Textes : `EXP_PRODS`, `EXP_ARRET`, `EXP_MAX`, `EXP_SILENCE`, `FIN_TEXTE` dans `index.html`.
