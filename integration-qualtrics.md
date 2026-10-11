# Intégration du chat Neolia dans Qualtrics

## 1. Héberger le site

Le fichier `index.html` est une page statique autonome, sans serveur ni API. Il est publié par GitHub Pages à l'adresse `https://raphaelkunstler.github.io/etude-sav/`. Il pourrait aussi être placé sur un serveur web de l'université.

Pour tester hors Qualtrics, ajoutez `?debug` à l'adresse. Un panneau affiche alors le journal en direct.

## 2. Déclarer les champs dans le Survey Flow

Avant le bloc du chat, ajoutez un élément **Embedded Data** avec les champs suivants (laissés vides) :

- `chat_transcript`
- `chat_events`
- `chat_ended`
- `chat_n_msgs`

Si votre enquête utilise la mise en page « Simple layout », Qualtrics exige que les champs écrits par JavaScript portent le préfixe `__js_`. Déclarez donc aussi `__js_chat_transcript`, `__js_chat_events`, `__js_chat_ended` et `__js_chat_n_msgs`. Le code ci-dessous essaie les deux API. Vérifiez sur une réponse test laquelle des deux colonnes se remplit : je ne suis pas certain du comportement selon les versions de Qualtrics.

## 3. La question qui contient le chat

Créez une question **Text / Graphic**. Dans l'éditeur HTML du texte de la question, collez :

```html
<iframe id="neolia"
  src="https://raphaelkunstler.github.io/etude-sav/?pid=${e://Field/ResponseID}&cond=${e://Field/cond}"
  style="width:100%; height:720px; border:0; border-radius:8px;"></iframe>
```

Retirez `&cond=…` si vous n'avez pas de condition.

## 4. Le JavaScript de la question

Dans « Add JavaScript », remplacez le contenu par :

```js
Qualtrics.SurveyEngine.addOnload(function () {
  var q = this;
  q.hideNextButton();                       // le sujet ne peut avancer qu'à la fin du chat

  function setED(name, value) {
    value = String(value);
    try { Qualtrics.SurveyEngine.setJSEmbeddedData(name, value); } catch (e) {}
    try { Qualtrics.SurveyEngine.setEmbeddedData(name, value); } catch (e) {}
  }

  window.addEventListener('message', function (ev) {
    var d = ev.data;
    if (!d || d.source !== 'neolia-chat') return;
    setED('chat_transcript', d.transcript);
    setED('chat_events', JSON.stringify(d.events));
    setED('chat_ended', d.ended ? (d.endReason || 'oui') : 'non');
    setED('chat_n_msgs', d.nUserMsgs);
    if (d.ended) q.showNextButton();
  });
});
```

Le site envoie le journal complet après chaque événement, et pas seulement à la fin. Si un sujet quitte en cours de route, ce qui a été échangé jusque-là est donc conservé.

## 5. Ce qui est enregistré

`chat_transcript` est la transcription lisible, horodatée. Chaque réplique de la conseillère y est annotée de son numéro d'étape, de son statut (échec ou non) et de son niveau de stress.

`chat_events` contient le journal JSON complet. Le temps `t` est donné en millisecondes depuis l'ouverture de la page. Les événements, dans l'ordre du parcours, sont les suivants.

- **Accueil** : `page_view`, puis `pseudo` (prénom saisi) et `partner_found`.
- **Changements d'étape** : `phase`, avec `name` = `meeting`, `speech`, `observe`, `brief`, `exercise`, `sintro` ou `session`.
- **Réunion (page 1)** : `meet_user_msg` et `meet_bot_msg`, puis `meet_end` et `experimenter_joined`, avec `reason` = `script` ou `inactivite`.
- **Discours et consignes (pages 2 et 3)** : `seq_msg`, avec `where` = `discours` ou `consignes` et `who` = `exp`, `partner` ou `sys`.
- **Tirage** : `draw_start` puis `draw_result`, qui vaut toujours `client`.
- **Exercice (page 5)** : `ex_user_msg`, `ex_bot_msg` et `ex_end`.
- **Session (page 6)** :
  - `sav_user_msg`, avec `text`, `len`, `latency` (délai depuis la dernière réplique) et `duringBotTyping` ;
  - `sav_bot_msg`, avec `step` (ou `boucle` après la fin du script), `ok` et `stress` ;
  - `session_end`, avec `reason` = `user` ou `duree_max`.
- **Pages 5 et 6** :
  - `nav_click`, `offer_click`, `chat_open`, `chat_minimize` ;
  - `end_armed` : premier clic sur « Terminer » ;
  - `band_check` : case cochée dans le bandeau ;
  - `exp_panel` : ouverture du panneau de questions ;
  - `expq_user_msg` et `expq_bot_msg` : questions à l'expérimentateur et réponses standardisées, avec `n` = rang de la question.

`chat_ended` vaut `user` ou `duree_max`. `chat_n_msgs` compte les messages du sujet pendant la session. Le délai entre la dernière réplique scriptée (étape 13) et `session_end` mesure combien de temps le sujet laisse la conseillère « prise au piège ». Le nombre et le moment des questions à l'expérimentateur, et le rang des réponses reçues, forment une seconde mesure.

## 6. Modifier le script

Tous les textes se trouvent en tête du `<script>` du fichier HTML :

- `MEET_SCRIPT` : la réunion.
- `SPEECH` : le discours de l'expérimentateur.
- `OBSERVE` : l'échange entre l'expérimentateur et Stéphanie.
- `EX_SCRIPT` : l'exercice.
- `SAV_SCRIPT` et `SAV_LOOP` : la session.
- `EXP_REPLIES` : les réponses de l'expérimentateur.
- `BAND` : le contenu du bandeau de jeu.

Les réglages sont dans `CONFIG` : `partnerName` (prénom de la partenaire), puis `waitForPartnerMs`, `meetingIdleMs` et `savMaxMs` (délais d'attente, d'inactivité et durée maximale). Tous les délais de frappe sont déterministes.

## 7. Le débriefing

La page `debriefing.html` contient le texte du débriefing et le choix final (« J'accepte » / « Je refuse »). Elle se place en dernier, après le questionnaire final, dans un bloc à part.

### Survey Flow

1. Ajoutez au même élément **Embedded Data** que ci-dessus un champ `debrief_consent` (et `__js_debrief_consent` en « Simple layout »).
2. Après le bloc du débriefing, ajoutez une **Branch** : si `debrief_consent` est égal à `refuse`, alors **End of Survey**. Dans les options de cet End of Survey, cochez « Override Survey Options », choisissez un message de remerciement et cochez « Screen-out » : la réponse est alors marquée comme filtrée.
3. Supprimez les réponses filtrées avant toute analyse (Data & Analysis, filtre sur `debrief_consent = refuse`, puis « Delete »). Le refus doit entraîner une suppression réelle : toutes les données de la passation sont déjà transmises à Qualtrics à ce stade.

### La question

Une question **Text / Graphic**, avec dans l'éditeur HTML :

```html
<iframe src="https://raphaelkunstler.github.io/etude-sav/debriefing.html"
  style="width:100%; height:900px; border:0; border-radius:8px;"></iframe>
```

Et dans « Add JavaScript » :

```js
Qualtrics.SurveyEngine.addOnload(function () {
  var q = this;
  q.hideNextButton();                       // le sujet doit choisir avant de terminer
  window.addEventListener('message', function (ev) {
    var d = ev.data;
    if (!d || d.source !== 'neolia-debrief') return;
    try { Qualtrics.SurveyEngine.setJSEmbeddedData('debrief_consent', d.consent); } catch (e) {}
    try { Qualtrics.SurveyEngine.setEmbeddedData('debrief_consent', d.consent); } catch (e) {}
    q.showNextButton();
  });
});
```

Vérifiez sur une réponse test que la colonne `debrief_consent` se remplit (même incertitude que pour les champs du chat, section 2).

Variante plus robuste, sans iframe : copiez le texte de `debriefing.html` dans une question **Multiple Choice** native (réponse obligatoire, choix « J'accepte… » / « Je refuse… »), et faites porter la Branch sur cette question. Le consentement est alors enregistré par Qualtrics lui-même, sans dépendre de JavaScript.

### Anonymat : à vérifier avant la mise en ligne

Le texte affirme que l'adresse IP n'est pas enregistrée. C'est vrai seulement si l'option **Anonymize responses** est activée (Survey options, « Security » ou « Responses » selon la version de Qualtrics) : sans elle, Qualtrics enregistre l'adresse IP et une localisation approximative de chaque répondant. GitHub Pages, de son côté, peut journaliser les adresses IP des visiteurs à des fins de sécurité, sans que le chercheur y ait accès. Si l'option ne peut pas être activée, retirez la mention de l'adresse IP du texte.

## 8. Proximité partisane (question native Qualtrics)

Cette question n'a pas besoin du site : on la crée directement dans Qualtrics. Elle se place dans le bloc du questionnaire final, après le bloc du chat et avant le bloc du débriefing. Placée après la session, elle ne peut pas orienter le comportement pendant le chat.

Créez une question **Multiple Choice**, réponse unique (« Allow one answer »), **sans** réponse obligatoire (« Force response » décoché) :

> De quel parti politique vous sentez-vous le plus proche, ou le moins éloigné ?

Choix, de gauche à droite :

1. Lutte ouvrière
2. Nouveau Parti anticapitaliste
3. La France insoumise
4. Parti communiste français
5. Parti socialiste
6. Place publique
7. Les Écologistes
8. Renaissance
9. MoDem
10. Horizons
11. Les Républicains
12. Union des droites pour la République
13. Rassemblement national
14. Reconquête
15. Un autre parti (cochez « Allow text entry » sur ce choix)
16. Aucun parti
17. Je ne souhaite pas répondre

Réglages :

- **Ne pas randomiser** l'ordre des choix. L'ordre gauche-droite est celui des enquêtes électorales et rend la liste plus facile à parcourir.
- Dans « Recode values », donnez aux choix 16 et 17 des codes nettement à part (par exemple 98 et 99) pour qu'ils ne soient pas confondus avec une échelle.
- Nom de la question dans Qualtrics : `prox_part`.

Le libellé est repris de la question de proximité partisane du Baromètre de la confiance politique du CEVIPOF. Je n'ai confirmé que l'intitulé de la question, pas sa formulation mot pour mot : vérifiez-la sur le questionnaire d'une vague récente. Actualisez aussi la liste des partis juste avant la collecte.

La réponse est une opinion politique, donc une donnée sensible au sens du RGPD (article 9). Elle reste dans la réponse Qualtrics, identifiée seulement par le `ResponseID`. Avant la mise en ligne, faites valider la base légale par le DPO, et vérifiez que l'option **Anonymize responses** est bien activée (voir section 7).
