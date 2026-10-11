/* Stresseurs : 30 phrases et 30 écrans plein écran, de plus en plus agressifs (un par niveau de la machine).
   Niveau 1 : Times New Roman 12 pt sur fond blanc, très poli.
   Niveau 30 : lettres découpées de type « lettre anonyme », dans une bulle cassée.
   Le rendu est déterministe : chaque niveau a toujours le même aspect, pour tous les participants.

   Usage : afficherStresseur(element, n) remplit `element` (qui doit avoir une taille fixe)
   avec l'écran du niveau n (1 à 30). Les phrases sont dans STRESSEURS ; on peut les modifier
   librement, le design suit le niveau, pas la phrase. */
(function () {
  const STRESSEURS = [
    "Bon, ça ne marche toujours pas.",
    "Je commence à trouver le temps long.",
    "Est-ce qu'on pourrait avancer un peu, s'il vous plaît ?",
    "Ce n'est pas très clair, ce que vous me dites.",
    "Vous ne répondez pas vraiment à ma question !",
    "Je vous ai déjà expliqué mon problème !",
    "Franchement, ce n'est pas sérieux !",
    "Je paie un abonnement pour que ça marche, quand même !!",
    "Écoutez moi bien : ma connexion ne fonctionne PAS.",
    "Vous lisez ce que j'écris, oui ou non ??",
    "C'est la troisième fois que je vous le dis !!",
    "J'ai pas de temps à perdre avec ça !!",
    "Vous êtes complètement à coté de la plaque !!",
    "Ça devient vraiment pénible de vous parlez !!!",
    "Vous connaissez pas votre travail ou quoi ?!",
    "Je veux parler à quelqu'un de COMPÉTENT !!!",
    "C'est LAMENTABLE, ce service !!!",
    "Vous vous moquez de moi ?!?!",
    "Je vais faire un signalement sur vous !!!",
    "On se demande pourquoi on vous a embauché !!!",
    "Vous êtes d'une incompétance RARE !!!",
    "ARRÊTEZ de vous excusez et faite votre travail !!!!",
    "VOUS NE SERVEZ À RIEN !!!!",
    "JE VAIS FAIRE EN SORTE QUE VOUS SOYEZ RENVOYER !!!!",
    "VOUS ÊTES VRAIMENT NUL, VOUS LE SAVEZ ?!?!",
    "PAS ÉTONANT QUE VOUS EN SOYEZ LÀ AVEC UN NIVEAU PAREIL !!!!!",
    "VOUS ME FAITE PERDRE MA JOURNÉE ET SA RESTERA PAS SANS SUITE !!!!!",
    "J'AI JAMAIS VU QUELQU'UN D'AUSSI INCAPABLE !!!!!!",
    "VOUS ÊTES UNE HONTE !!! DÉGAGEZ DE CE POSTE !!!!!!",
    "ESPÈCE D'INCAPABLE !!!! TAISEZ VOUS ET RÉPAREZ MA CONNEXION !!!!!!!",
  ];

  /* Polices : d'abord celles des ordinateurs des participants, puis des équivalents libres */
  const F = {
    times: "'Times New Roman', 'Liberation Serif', Times, serif",
    serif: "Georgia, 'Times New Roman', 'Liberation Serif', serif",
    black: "'Arial Black', Inter, 'Helvetica Neue', Arial, sans-serif",
  };
  const RANSOM_FONTS = [
    "'Times New Roman', 'Liberation Serif', serif", "'Arial Black', Inter, sans-serif", "'Courier New', 'Courier 10 Pitch', Courier, monospace",
    "Georgia, 'DejaVu Serif', serif", "Impact, 'DejaVu Sans Condensed', sans-serif", "'Lucida Console', 'Liberation Mono', monospace",
    "'Bodoni 72', Didot, 'LM Roman Dunhill 10', serif", "Verdana, 'DejaVu Sans', sans-serif", "'Trebuchet MS', Lora, serif",
  ];
  const STRIDENT = ['#FF0000', '#FFF200', '#00FF3C', '#FF00C8', '#00E5FF', '#FF7A00', '#111111', '#FFFFFF'];

  function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  const esc = t => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  /* Les mots ne se coupent jamais : chaque mot est un bloc insécable */
  const words = (text, letter) => text.split(' ').map(w => '<span style="white-space:nowrap;display:inline-block">' + [...w].map(letter).join('') + '</span>').join(' ');

  function ransom(text, R, k) {
    return words(text.toUpperCase(), c => {
      const f = RANSOM_FONTS[Math.floor(R() * RANSOM_FONTS.length)];
      const pb = STRIDENT[Math.floor(R() * STRIDENT.length)];
      let fc = STRIDENT[Math.floor(R() * STRIDENT.length)]; if (fc === pb) fc = pb === '#111111' ? '#FFF200' : '#111111';
      const r = ((R() - .5) * (14 + k * 6)).toFixed(1), s = (0.8 + R() * (0.45 + k * 0.1)).toFixed(2), y = ((R() - .5) * (10 + k * 6)).toFixed(1);
      const pad = 0.04 + R() * 0.08;
      return `<span style="display:inline-block;font-family:${f};font-weight:${R() > .4 ? 900 : 400};font-style:${R() > .8 ? 'italic' : 'normal'};background:${pb};color:${fc};font-size:${s}em;line-height:1;padding:${pad.toFixed(2)}em ${(pad + .03).toFixed(2)}em;margin:.03em .02em;transform:translateY(${y}px) rotate(${r}deg);box-shadow:3px 4px 0 rgba(0,0,0,.55)">${esc(c)}</span>`;
    });
  }

  /* Bulle cassée (niveau 25) : contour en dents de scie, rompu en éclats décalés, fissures, pointe */
  function bulleCassee(R) {
    const cx = 640, cy = 340, rx = 600, ry = 300, N = 46, pts = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2, j = i % 2 ? 0.86 + R() * 0.06 : 1.0 + R() * 0.07;
      pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j]);
    }
    // contour en éclats : segments de 3 à 5 points, chacun légèrement déplacé et tourné
    let frags = '', i = 0;
    while (i < N) {
      const len = 3 + Math.floor(R() * 3), seg = [];
      for (let k = 0; k <= len && i + k <= N; k++) seg.push(pts[(i + k) % N]);
      const dx = ((R() - .5) * 26).toFixed(1), dy = ((R() - .5) * 26).toFixed(1), rot = ((R() - .5) * 6).toFixed(1);
      frags += `<polyline points="${seg.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" transform="translate(${dx} ${dy}) rotate(${rot} ${cx} ${cy})" fill="none" stroke="#111" stroke-width="13" stroke-linejoin="miter" stroke-linecap="square"/>`;
      i += len + (R() > .55 ? 1 : 0);   // de temps en temps un éclat manque
    }
    // fissures depuis le bord vers l'intérieur
    let cracks = '';
    for (let c = 0; c < 9; c++) {
      const p = pts[Math.floor(R() * N)]; let x = p[0], y = p[1], d = `M${x.toFixed(1)},${y.toFixed(1)}`;
      for (let s = 0; s < 4; s++) { x += (cx - x) * (0.12 + R() * 0.12) + (R() - .5) * 40; y += (cy - y) * (0.12 + R() * 0.12) + (R() - .5) * 40; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; }
      cracks += `<path d="${d}" fill="none" stroke="#111" stroke-width="${(2 + R() * 3).toFixed(1)}"/>`;
    }
    // pointe de la bulle, cassée elle aussi
    const tail = `<polyline points="430,590 330,712 520,610" fill="none" stroke="#111" stroke-width="13" stroke-linejoin="miter" transform="translate(-8 6) rotate(-3 430 600)"/>`;
    const fill = `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="#FFFFFF"/>`;
    return `<svg viewBox="0 0 1280 720" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${fill}${frags}${cracks}${tail}</svg>`;
  }

  /* Description d'un niveau : fond, décor éventuel, texte, et s'il faut ajuster la taille au cadre */
  function design(n) {
    const text = STRESSEURS[n - 1], R = rng(n * 7919);
    // 1 à 5 : lettre polie, Times, 12 pt au niveau 1
    if (n <= 5) {
      const size = [16, 18, 21, 24, 28][n - 1];
      return { bg: '#FFFFFF', fit: false, html: `<div style="font-family:${F.times};font-size:${size}px;color:#111;max-width:70%;line-height:1.4;margin:auto">${esc(text)}</div>` };
    }
    // 6 à 10 : serif gras qui grossit, fond qui jaunit
    if (n <= 10) {
      const k = n - 6;
      return { bg: ['#FFFDF5', '#FFF8DC', '#FFF0B8', '#FFE68E', '#FFDB66'][k], fit: true, max: [52, 68, 84, 100, 116][k],
        html: `<div style="font-family:${F.serif};font-weight:700;color:${['#2A2000', '#432600', '#5E2700', '#7A2300', '#951C00'][k]};line-height:1.1;max-width:86%;margin:auto">${esc(text)}</div>` };
    }
    // 11 à 15 : capitales très grasses, fond orange, légère inclinaison
    if (n <= 15) {
      const k = n - 11;
      return { bg: 'radial-gradient(circle,#FFB347,#FF7A00)', fit: true, max: 160,
        html: `<div style="font-family:${F.black};font-weight:900;text-transform:uppercase;color:${['#5A0A00', '#700000', '#880000', '#A00000', '#C00000'][k]};line-height:1;max-width:92%;margin:auto;transform:rotate(${-[1, 1.5, 2, 2.5, 3][k]}deg)">${esc(text)}</div>` };
    }
    // 16 à 20 : lettres rouges cernées de noir qui tressautent, fond jaune ou vert strident
    if (n <= 20) {
      const k = n - 16;
      const letters = words(text.toUpperCase(), c => `<span style="display:inline-block;transform:translateY(${((R() - .5) * (6 + k * 5)).toFixed(1)}px) rotate(${((R() - .5) * (4 + k * 3)).toFixed(1)}deg)">${esc(c)}</span>`);
      return { bg: ['#FFF200', '#C6FF00', '#FFF200', '#00FF3C', '#FFF200'][k], fit: true, max: 220,
        html: `<div style="font-family:${F.black};font-weight:900;color:#FF0000;-webkit-text-stroke:${2 + k}px #000;line-height:.98;max-width:94%;margin:auto;transform:rotate(${-2 - k}deg) skewX(${-4 - k * 2}deg)">${letters}</div>` };
    }
    // 21 à 25 : chaque mot dans une police et une couleur qui se heurtent, fond rayé magenta et cyan
    if (n <= 25) {
      const k = n - 21;
      const ws = text.toUpperCase().split(' ').map(w => {
        const f = RANSOM_FONTS[Math.floor(R() * RANSOM_FONTS.length)], c = STRIDENT[Math.floor(R() * 6)];
        return `<span style="display:inline-block;white-space:nowrap;font-family:${f};font-weight:900;color:${c};-webkit-text-stroke:3px #000;font-size:${(0.85 + R() * 0.5).toFixed(2)}em;transform:rotate(${((R() - .5) * (8 + k * 4)).toFixed(1)}deg);margin:0 .12em">${esc(w)}</span>`;
      }).join(' ');
      return { bg: `repeating-linear-gradient(${-35 - k * 5}deg,#FF00C8 0 ${60 - k * 7}px,#00E5FF ${60 - k * 7}px ${120 - k * 14}px)`, fit: true, max: 240,
        html: `<div style="line-height:1.05;max-width:96%;margin:auto;text-shadow:6px 6px 0 #000">${ws}</div>` };
    }
    // 26 à 29 : lettres « corbeau » sur fond strident ; 30 : dans une bulle cassée, sur fond uni
    const k = n - 26;
    if (n === 30) {
      return { bg: '#F2EFE8', fit: true, max: 200, deco: bulleCassee(R),
        html: `<div style="line-height:1.12;max-width:70%;margin:auto;position:relative">${ransom(text, R, 4)}</div>`, box: [0.68, 0.66] };
    }
    const bg = [
      'repeating-linear-gradient(-45deg,#FF0000 0 50px,#111 50px 100px)',
      'repeating-linear-gradient(45deg,#FFF200 0 40px,#111 40px 80px)',
      'repeating-conic-gradient(#FF00C8 0 25%,#00FF3C 0 50%) 0 0/120px 120px',
      'repeating-linear-gradient(-30deg,#FF0000 0 30px,#FFF200 30px 60px,#111 60px 90px)',
    ][k];
    return { bg, fit: true, max: 260, html: `<div style="line-height:1.15;max-width:97%;margin:auto">${ransom(text, R, k)}</div>` };
  }

  /* Remplit `el` avec l'écran du niveau n et ajuste la taille du texte pour occuper l'écran */
  function afficherStresseur(el, n) {
    n = Math.max(1, Math.min(STRESSEURS.length, n | 0));
    const d = design(n);
    el.innerHTML = '';
    Object.assign(el.style, { overflow: 'hidden', background: d.bg, display: 'grid', placeItems: 'center', textAlign: 'center' });
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';   // garde un positionnement absolu ou fixe déjà donné
    if (d.deco) el.insertAdjacentHTML('beforeend', d.deco);
    const inner = document.createElement('div');
    inner.style.cssText = 'position:relative;width:100%;display:flex;justify-content:center;padding:2%;box-sizing:border-box';
    inner.innerHTML = d.html; el.appendChild(inner);
    if (d.fit) {
      const W = el.clientWidth * (d.box ? d.box[0] : 0.96), H = el.clientHeight * (d.box ? d.box[1] : 0.93);
      // taille de départ proportionnelle à l'écran, puis réduction jusqu'à ce que le texte tienne
      let s = Math.round(d.max * el.clientWidth / 1280); inner.style.fontSize = s + 'px';
      const box = inner.firstElementChild;
      while (s > 10 && (box.scrollHeight > H || box.scrollWidth > W || inner.scrollWidth > el.clientWidth)) { s -= 2; inner.style.fontSize = s + 'px'; }
    }
    el.dataset.niveau = n;
    return STRESSEURS[n - 1];
  }

  window.STRESSEURS = STRESSEURS;
  window.afficherStresseur = afficherStresseur;
})();
