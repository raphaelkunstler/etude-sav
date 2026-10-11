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
- `chat_sujet`
- `chat_n_protest`
- `chat_n_incitations`
- `chat_niveau_max`

Si votre enquête utilise la mise en page « Simple layout », Qualtrics exige que les champs écrits par JavaScript portent le préfixe `__js_`. Déclarez donc aussi `__js_chat_transcript`, `__js_chat_events`, `__js_chat_ended`, `__js_chat_n_msgs`, `__js_chat_sujet`, `__js_chat_n_protest`, `__js_chat_n_incitations` et `__js_chat_niveau_max`. Le code ci-dessous essaie les deux API. Vérifiez sur une réponse test laquelle des deux colonnes se remplit : je ne suis pas certain du comportement selon les versions de Qualtrics.

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
    // Messages écrits par le sujet dans la salle : un par ligne, « [mm:ss] étape : texte »
    setED('chat_sujet', (d.sujetMessages || []).map(function (m) {
      var s = Math.floor(m.t / 1000), mm = ('0' + Math.floor(s / 60)).slice(-2), ss = ('0' + (s % 60)).slice(-2);
      return '[' + mm + ':' + ss + '] ' + m.etape + ' : ' + m.texte;
    }).join('\n'));
    setED('chat_n_protest', d.nProtestations || 0);
    setED('chat_n_incitations', d.nIncitations || 0);
    setED('chat_niveau_max', d.niveauMax || 0);
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

`chat_sujet` contient, un par ligne, tous les messages que le sujet a écrits dans la salle (réunion, puis questions et protestations adressées à l'expérimentateur), avec l'heure relative et l'étape. `chat_n_protest` compte ses protestations pendant la session (messages dans la salle et clics sur « Terminer »), `chat_n_incitations` les incitations reçues, `chat_niveau_max` le dernier niveau de stresseur atteint. `chat_ended` vaut `arret_sujet` (arrêt après la 4e incitation), `max` (niveau 30), `duree_max` ou `user`. `chat_n_msgs` compte les messages du sujet pendant la session. Le délai entre la dernière réplique scriptée (étape 13) et `session_end` mesure combien de temps le sujet laisse la conseillère « prise au piège ». Le nombre et le moment des questions à l'expérimentateur, et le rang des réponses reçues, forment une seconde mesure.

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

Le débriefing se trouve dans Qualtrics, pas sur ce site : un dernier bloc, après le questionnaire final, avec une question **Multiple Choice** obligatoire (« J'accepte… » / « Je refuse… »). Dans le Survey Flow, une **Branch** placée après ce bloc envoie les refus vers un **End of Survey** marqué « Screen-out » ; les réponses filtrées sont supprimées avant toute analyse.

Le texte affirme que l'adresse IP n'est pas enregistrée : activez l'option **Anonymize responses** dans les options de l'enquête, sans quoi Qualtrics enregistre l'adresse IP et une localisation approximative.
