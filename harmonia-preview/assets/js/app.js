/**
 * app.js — Harmonia Preview
 *
 * Feature modules (in order):
 *   1. Theme toggle
 *   2. Toast notifications
 *   3. Bottom-sheet modal
 *   4. Avatar SVG generator
 *   5. Sign-up form validation
 *   6. Photo grid
 *   7. Visual calibration (MetaFBP face rater)
 *   8. Psychometric questionnaire (PIIP)
 *   9. HLA upload simulation
 *  10. Swipe deck
 *  11. Match list & chat
 *  12. Profile view + radar chart
 *  13. Admin dashboard
 *  14. DOMContentLoaded bootstrap
 *
 * Depends on: data.js  animations.js  GSAP + ScrollTrigger
 */


/* ─────────────────────────────────────────────────────────────
   1. THEME TOGGLE
   ───────────────────────────────────────────────────────────── */
function togTheme() {
  const html    = document.documentElement;
  const newMode = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = newMode;
  document.getElementById('thbtn').innerHTML =
    `<svg><use href="#i-${newMode === 'dark' ? 'moon' : 'sun'}"/></svg>`;
  toast(newMode.charAt(0).toUpperCase() + newMode.slice(1) + ' mode', 'tg');
}


/* ─────────────────────────────────────────────────────────────
   2. TOAST NOTIFICATIONS
   ───────────────────────────────────────────────────────────── */
function toast(message, variant = 'tg') {
  const container = document.getElementById('toasts');
  const el        = document.createElement('div');
  el.className    = `toast ${variant}`;
  el.textContent  = message;
  container.appendChild(el);

  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 3000);

  // Keep max 3 toasts visible
  while (container.children.length > 3) container.firstChild.remove();
}


/* ─────────────────────────────────────────────────────────────
   3. BOTTOM-SHEET MODAL
   ───────────────────────────────────────────────────────────── */
function openSheet(html) {
  document.getElementById('mcontent').innerHTML = html;
  document.getElementById('mbg').classList.add('open');
  document.getElementById('msheet').classList.add('open');
}

function closeSheet() {
  document.getElementById('mbg').classList.remove('open');
  document.getElementById('msheet').classList.remove('open');
}


/* ─────────────────────────────────────────────────────────────
   4. AVATAR SVG GENERATOR
   Deterministic pseudo-random from integer seed.
   ───────────────────────────────────────────────────────────── */

/** Mulberry32 PRNG — returns a seeded () => [0,1) function */
function mub(seed) {
  return function () {
    seed |= 0;
    seed  = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t     = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function genAv(seed, size) {
  const s  = size || 80;
  const r  = mub(seed);

  const skinPalette = ['#F4C7A3','#E8B88A','#D4A373','#C68E5B','#A0714F','#8B6242'];
  const hairPalette = ['#2C1810','#4A3728','#8B6242','#D4A853','#C0392B','#1A1A2E'];
  const eyePalette  = ['#4A90D9','#2C6B3F','#8B6242','#4A3728'];

  const skin     = skinPalette[r() * skinPalette.length | 0];
  const hair     = hairPalette[r() * hairPalette.length | 0];
  const eye      = eyePalette [r() * eyePalette.length  | 0];
  const fw       = 28 + r() * 8;
  const fh       = 32 + r() * 8;
  const glasses  = r() > .7;
  const mouthCrv = r() > .5 ? 3 : -1;

  return `<svg width="${s}" height="${s}" viewBox="0 0 80 80">
  <defs>
    <linearGradient id="bg${seed}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="hsl(${seed % 360},26%,20%)"/>
      <stop offset="100%" stop-color="hsl(${(seed * 7) % 360},36%,13%)"/>
    </linearGradient>
  </defs>
  <rect width="80" height="80" fill="url(#bg${seed})" rx="10"/>
  <ellipse cx="40" cy="44" rx="${fw / 2}"     ry="${fh / 2}" fill="${skin}"/>
  <ellipse cx="40" cy="28" rx="${fw / 2 + 2}" ry="14"        fill="${hair}"/>
  <rect x="${40 - fw / 2 - 1}" y="22" width="${fw + 2}" height="10" fill="${hair}" rx="2"/>
  <circle cx="34" cy="42" r="2.5" fill="${eye}"/>
  <circle cx="46" cy="42" r="2.5" fill="${eye}"/>
  <circle cx="34.8" cy="41.5" r=".9" fill="white"/>
  <circle cx="46.8" cy="41.5" r=".9" fill="white"/>
  <path d="M36 52 Q40 ${52 + mouthCrv} 44 52" fill="none" stroke="#8B4542" stroke-width="1.5" stroke-linecap="round"/>
  ${glasses ? `
  <circle cx="34" cy="42" r="5" fill="none" stroke="rgba(200,200,200,.5)" stroke-width=".8"/>
  <circle cx="46" cy="42" r="5" fill="none" stroke="rgba(200,200,200,.5)" stroke-width=".8"/>
  <line x1="39" y1="42" x2="41" y2="42" stroke="rgba(200,200,200,.5)" stroke-width=".8"/>` : ''}
</svg>`;
}


/* ─────────────────────────────────────────────────────────────
   5. SIGN-UP FORM
   ───────────────────────────────────────────────────────────── */
function doSignup() {
  const name    = document.getElementById('fn').value.trim();
  const age     = +document.getElementById('fa').value;
  const email   = document.getElementById('fe').value.trim();
  const consent = document.getElementById('fc').checked;
  let valid = true;

  // Name
  if (name.length < 2) {
    document.getElementById('efn').style.display = 'block'; valid = false;
  } else {
    document.getElementById('efn').style.display = 'none';
  }

  // Age
  if (isNaN(age) || age < 18 || age > 99) {
    document.getElementById('efa').style.display = 'block'; valid = false;
  } else {
    document.getElementById('efa').style.display = 'none';
  }

  // Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('efe').style.display = 'block'; valid = false;
  } else {
    document.getElementById('efe').style.display = 'none';
  }

  if (valid && consent) {
    U.fn  = name;
    U.age = age;
    toast('Profile created!', 'tg');
    flash();
    scrollToSection(2);
  } else if (!consent) {
    toast('Accept consent', 'tm');
  }
}


/* ─────────────────────────────────────────────────────────────
   6. PHOTO GRID
   ───────────────────────────────────────────────────────────── */
let photoN = 0;

function initPhotos() {
  const grid = document.getElementById('pgrid');
  grid.innerHTML = '';
  photoN = 0;

  for (let i = 0; i < 6; i++) {
    const slot = document.createElement('div');
    slot.className = `pslot${i === 0 ? ' main' : ''}`;
    slot.innerHTML = `
      <span class="plus"><svg><use href="#i-${i === 0 ? 'cam' : 'plus'}"/></svg></span>
      ${i === 0 ? '<span class="slbl">Main</span>' : ''}
      <button class="dbtn" onclick="event.stopPropagation();rmPh(this.parentElement)">×</button>`;
    slot.onclick = () => fillPh(slot, i);
    grid.appendChild(slot);
  }
  updPh();
}

function fillPh(slot, i) {
  if (slot.classList.contains('on')) return;
  slot.classList.add('on');
  const hue = 20 + Math.random() * 30;
  slot.style.background = `linear-gradient(135deg,hsl(${hue},42%,28%),hsl(${hue + 20},50%,18%))`;
  slot.querySelector('.plus').style.display = 'none';
  const avatar = document.createElement('div');
  avatar.className = 'sav';
  avatar.innerHTML = genAv(60 + i * 7, 65);
  slot.appendChild(avatar);
  gsap.from(slot, { scale: .8, opacity: 0, duration: .4, ease: 'back.out(1.7)' });
  photoN++;
  updPh();
  flash();
}

function rmPh(slot) {
  slot.classList.remove('on');
  slot.style.background = '';
  const av = slot.querySelector('.sav');
  if (av) av.remove();
  slot.querySelector('.plus').style.display = '';
  photoN--;
  updPh();
}

function updPh() {
  document.getElementById('pcount').textContent = `${photoN}/6 photos`;
  document.getElementById('photobtn').disabled  = photoN < 1;
}


/* ─────────────────────────────────────────────────────────────
   7. VISUAL CALIBRATION (MetaFBP face rater)
   ───────────────────────────────────────────────────────────── */
let calN = 0;

function initCal() {
  calN = 0;
  updCal();
  showFace();
  setupFSwipe();
}

function showFace() {
  if (calN >= 50) {
    toast('Learning preferences...', 'tg');
    setTimeout(() => scrollToSection(4), 1200);
    return;
  }
  document.getElementById('fsvg').innerHTML = genAv(calN * 17 + 42, 130);
  gsap.fromTo('#fcard',
    { y: 24, opacity: 0, scale: .96 },
    { y:  0, opacity: 1, scale:  1,  duration: .35, ease: 'back.out(1.7)' }
  );
}

function rateFace(rating) {
  calN++;
  updCal();
  flash();
  const dir = rating >= 4 ? 'right' : rating <= 2 ? 'left' : 'up';
  const tx  = dir === 'right' ? 350 : dir === 'left' ? -350 : 0;
  gsap.to('#fcard', {
    x: tx, y: dir === 'up' ? -250 : 0,
    rotation: tx * .04, opacity: 0,
    duration: .3, ease: 'power3.in',
    onComplete() { gsap.set('#fcard', { x: 0, y: 0, rotation: 0 }); showFace(); },
  });
}

function updCal() {
  const offset = 188.5 - (calN / 50) * 188.5;
  gsap.to('#calring', { attr: { 'stroke-dashoffset': offset }, duration: .4, ease: 'power2.out' });
  document.getElementById('calnum').textContent = `${calN}/50`;
}

function setupFSwipe() {
  const wrap = document.getElementById('fcwrap');
  let startX = 0, dragging = 0;

  wrap.addEventListener('pointerdown', e => { startX = e.clientX; dragging = 1; });

  document.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx   = e.clientX - startX;
    const card = document.getElementById('fcard');
    card.style.transform = `translateX(${dx}px) rotate(${dx * .1}deg)`;
    card.querySelector('.st-like').style.opacity = Math.min(Math.max( dx / 130, 0), 1);
    card.querySelector('.st-nope').style.opacity = Math.min(Math.max(-dx / 130, 0), 1);
  });

  document.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = 0;
    const dx   = e.clientX - startX;
    const card = document.getElementById('fcard');
    card.querySelector('.st-like').style.opacity = 0;
    card.querySelector('.st-nope').style.opacity = 0;
    if (Math.abs(dx) > 110) {
      rateFace(dx > 0 ? 4 : 2);
    } else {
      gsap.to(card, { x: 0, rotation: 0, duration: .5, ease: 'elastic.out(1,.5)' });
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   8. PSYCHOMETRIC QUESTIONNAIRE (PIIP)
   ───────────────────────────────────────────────────────────── */
let qI = 0;

function initQ() { qI = 0; showQ(0); }

function showQ(i) {
  if (i >= FQ.length) { startGem(); return; }

  document.getElementById('qctr').textContent  = `Q${i + 1} of 6`;
  document.getElementById('qtxt').textContent  = FQ[i];
  document.getElementById('qta').value         = '';
  document.getElementById('qbtn').disabled     = true;
  document.getElementById('wcnt').textContent  = '0 / 25 word minimum';
  document.getElementById('wcnt').className    = 'wcount bad';

  gsap.fromTo('#qwrap',
    { x: 50, opacity: 0 },
    { x:  0, opacity: 1, duration: .35, ease: 'expo.out' }
  );
}

function onQInput() {
  const text    = document.getElementById('qta').value.trim();
  const words   = text ? text.split(/\s+/).length : 0;
  const counter = document.getElementById('wcnt');
  const btn     = document.getElementById('qbtn');

  if (words < 25) {
    counter.textContent = `${words} / 25 word minimum`;
    counter.className   = 'wcount bad';
    btn.disabled        = true;
  } else if (words <= 150) {
    counter.textContent = `${words} words ✓`;
    counter.className   = 'wcount ok';
    btn.disabled        = false;
  } else {
    counter.textContent = `${words} — 150 max`;
    counter.className   = 'wcount bad';
    btn.disabled        = true;
  }

  // Live neural-net stats
  document.getElementById('nnn').textContent = 40  + Math.floor(words / 10);
  document.getElementById('nnc').textContent = 156 + Math.floor(words / 25) * 20;
  document.getElementById('nns').textContent = Math.min(.45 + words * .005, .99).toFixed(2);
}

function submitQ() {
  flash();
  qI++;
  gsap.to('#qwrap', {
    x: -50, opacity: 0, duration: .25, ease: 'power3.in',
    onComplete() { showQ(qI); },
  });
}

function startGem() {
  const overlay = document.getElementById('govl');
  overlay.classList.add('on');

  const label = document.getElementById('gtxt');
  const bar   = document.getElementById('gfill');

  const phases = [
    { t: 'Extracting linguistic signals...',   p: 20,  d: 0     },
    { t: 'Mapping personality dimensions...',  p: 50,  d: 2000  },
    { t: 'Calculating confidence scores...',   p: 80,  d: 4500  },
    { t: 'Building your profile...',           p: 100, d: 7000  },
  ];

  phases.forEach(ph => setTimeout(() => {
    label.textContent  = ph.t;
    bar.style.width    = ph.p + '%';
  }, ph.d));

  setTimeout(() => {
    label.textContent = 'Profile Complete!';
    gsap.to('#gres', { opacity: 1, duration: .5 });
  }, 8500);

  setTimeout(() => {
    overlay.classList.remove('on');
    scrollToSection(5);
  }, 10500);
}


/* ─────────────────────────────────────────────────────────────
   9. HLA UPLOAD SIMULATION
   ───────────────────────────────────────────────────────────── */
let hlaUp = false;

function simUpload() {
  if (hlaUp) return;
  const bar  = document.getElementById('upbar');
  const fill = document.getElementById('upfill');
  bar.style.display = 'block';

  gsap.to(fill, {
    width: '100%', duration: 2, ease: 'power2.inOut',
    onComplete() {
      hlaUp = true;
      const loci = [
        { el: 'la', v: 'A*02:01',    d: 0   },
        { el: 'lb', v: 'B*07:02',    d: 300 },
        { el: 'lc', v: 'DRB1*15:01', d: 600 },
      ];
      loci.forEach(l => setTimeout(() => {
        const cell = document.getElementById(l.el);
        cell.classList.add('act');
        cell.querySelector('.lv').textContent = l.v;
        gsap.from(cell, { scale: .8, duration: .4, ease: 'back.out(1.7)' });
      }, l.d));

      toast('Genetic data encrypted', 'tg');

      const bioRow = document.getElementById('biock');
      if (bioRow) {
        bioRow.innerHTML = '<span class="ck done"><svg><use href="#i-check"/></svg></span>Biological data uploaded — 3 HLA loci';
      }
    },
  });
}


/* ─────────────────────────────────────────────────────────────
   10. SWIPE DECK
   ───────────────────────────────────────────────────────────── */
let cardI = 0, swpN = 0, rtN = 0;

function initDeck() { cardI = 0; swpN = 0; rtN = 0; renderDeck(); }

function renderDeck() {
  const deck  = document.getElementById('deck');
  const empty = document.getElementById('edeck');
  deck.innerHTML = '';

  if (cardI >= CANDS.length) {
    deck.style.display  = 'none';
    empty.style.display = 'block';
    return;
  }

  deck.style.display  = '';
  empty.style.display = 'none';

  // Stack: back → front (off = 2..0)
  for (let off = 2; off >= 0; off--) {
    const idx  = cardI + off;
    if (idx >= CANDS.length) continue;

    const c    = CANDS[idx];
    const card = document.createElement('div');
    card.className   = 'scard';
    card.style.zIndex = 3 - off;
    card.style.transform = `scale(${1 - off * .05}) translateY(${off * 10}px)`;
    if (off > 0) card.style.pointerEvents = 'none';

    const hue = (idx * 47 + 20) % 360;
    card.innerHTML = `
      <div class="stamp st-l">LIKE</div>
      <div class="stamp st-n">NOPE</div>
      <div class="stamp st-s">SUPER</div>
      <div class="cphoto" style="background:linear-gradient(135deg,hsl(${hue},32%,20%),hsl(${hue+30},42%,13%))">
        ${genAv(idx * 31 + 100, 110)}
        <div class="dots">
          ${Array(c.ph).fill(0).map((_, i) => `<div class="dot${i === 0 ? ' on' : ''}"></div>`).join('')}
        </div>
      </div>
      <div class="cinfo">
        <div class="cname">${c.n}, ${c.a}</div>
        <div class="cloc"><svg><use href="#i-pin"/></svg>${c.l}</div>
        <div class="ctags">${c.t.map(t => `<span class="bdg bdg-g">${t}</span>`).join('')}</div>
      </div>`;

    deck.appendChild(card);
    if (off === 0) setupSwipe(card);
  }
}

function setupSwipe(card) {
  let sx = 0, sy = 0, dragging = 0;

  card.addEventListener('pointerdown', e => {
    sx = e.clientX; sy = e.clientY; dragging = 1;
    card.style.transition = 'none';
  });

  const onMove = e => {
    if (!dragging) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    card.style.transform = `translateX(${dx}px) translateY(${dy}px) rotate(${dx * .08}deg)`;
    card.querySelector('.st-l').style.opacity = Math.min(Math.max( dx / 130, 0), 1);
    card.querySelector('.st-n').style.opacity = Math.min(Math.max(-dx / 130, 0), 1);
    card.querySelector('.st-s').style.opacity = Math.min(Math.max(-dy /  90, 0), 1);
  };

  const onUp = e => {
    if (!dragging) return;
    dragging = 0;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    ['st-l','st-n','st-s'].forEach(cls => { card.querySelector(`.${cls}`).style.opacity = 0; });

    if      (Math.abs(dx) > 120) commitSwipe(dx > 0 ? 'right' : 'left');
    else if (dy < -90)           commitSwipe('up');
    else gsap.to(card, { x: 0, y: 0, rotation: 0, duration: .5, ease: 'elastic.out(1,.5)' });
  };

  document.addEventListener('pointermove', onMove);
  document.addEventListener('pointerup',   onUp);
}

function commitSwipe(dir) {
  const deck = document.getElementById('deck');
  const card = deck.lastElementChild;
  if (!card) return;

  const tx = dir === 'right' ? 650 : dir === 'left' ? -650 : 0;
  const ty = dir === 'up'    ? -450 : 0;

  if (dir === 'right') rtN++;
  swpN++;
  flash();

  gsap.to(card, {
    x: tx, y: ty, rotation: tx ? tx * .04 : 0, opacity: 0,
    duration: .3, ease: 'power3.in',
    onComplete() {
      cardI++;
      if (rtN === 3 && dir === 'right') setTimeout(trigMR, 300);
      renderDeck();
    },
  });
}


/* ─────────────────────────────────────────────────────────────
   11. MATCH LIST & CHAT
   ───────────────────────────────────────────────────────────── */
function initMatches() {
  const list = document.getElementById('mlist');
  list.innerHTML = '';

  MATCHES.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = 'mcard';
    card.onclick   = () => openChat(i);
    const bg = `linear-gradient(135deg,hsl(${i*60+10},36%,26%),hsl(${i*60+40},46%,18%))`;
    const circ  = 2 * Math.PI * 13;
    const score = circ * (1 - m.wtm / 100);

    card.innerHTML = `
      <div class="av av-m" style="background:${bg}">${m.i}</div>
      <div class="mi">
        <div class="mn">${m.n}, ${m.a}</div>
        <div class="mb"><span class="${m.bc}">${m.bg}</span></div>
        ${m.lm
          ? `<div class="ml">${m.lm}</div>`
          : `<div class="ml" style="opacity:.4;font-style:italic">No messages yet</div>`}
      </div>
      <div style="flex-shrink:0;text-align:center">
        <svg width="34" height="34">
          <circle cx="17" cy="17" r="13" fill="none" stroke="var(--bdr)" stroke-width="2.5"/>
          <circle cx="17" cy="17" r="13" fill="none" stroke="var(--gold)" stroke-width="2.5"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${score}"
            style="transform:rotate(-90deg);transform-origin:center"/>
        </svg>
        <div style="font-size:.55rem;font-weight:700;margin-top:-24px;position:relative">${m.wtm}</div>
      </div>`;

    list.appendChild(card);
  });
}

function openChat(i) {
  const m   = MATCHES[i];
  const ch  = document.getElementById('chatarea');
  const ph  = document.getElementById('chatplaceholder');
  ph.style.display = 'none';
  ch.style.display = 'flex';

  const bg = `linear-gradient(135deg,hsl(${i*60+10},36%,26%),hsl(${i*60+40},46%,18%))`;
  document.getElementById('chatav').textContent   = m.i;
  document.getElementById('chatav').style.background = bg;
  document.getElementById('chatname').textContent = m.n;

  const msgs = document.getElementById('msgs');
  msgs.innerHTML = m.msgs.map(msg =>
    `<div class="bub ${msg.f === 'you' ? 'you' : 'them'}">${msg.t}<div class="btime">${msg.tm}</div></div>`
  ).join('') + '<div class="typi" id="typi"><i></i><i></i><i></i></div>';

  setTimeout(() => { msgs.scrollTop = msgs.scrollHeight; }, 50);
}

function closeChat() {
  document.getElementById('chatarea').style.display = 'none';
  document.getElementById('chatplaceholder').style.display = '';
}

function sendMsg() {
  const input = document.getElementById('chinp');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';

  const msgs  = document.getElementById('msgs');
  const typi  = document.getElementById('typi');
  const now   = new Date();
  const ts    = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  const outBub = document.createElement('div');
  outBub.className = 'bub you';
  outBub.innerHTML = `${text}<div class="btime">${ts}</div>`;
  msgs.insertBefore(outBub, typi);
  msgs.scrollTop = msgs.scrollHeight;

  // Typing indicator then auto-reply
  setTimeout(() => { typi.classList.add('on'); msgs.scrollTop = msgs.scrollHeight; }, 500);
  setTimeout(() => {
    typi.classList.remove('on');
    const reply  = document.createElement('div');
    reply.className = 'bub them';
    const tsNext = `${now.getHours()}:${String(now.getMinutes() + 1).padStart(2, '0')}`;
    reply.innerHTML = `${AREPLIES[Math.random() * AREPLIES.length | 0]}<div class="btime">${tsNext}</div>`;
    msgs.insertBefore(reply, typi);
    msgs.scrollTop = msgs.scrollHeight;
  }, 2500);
}


/* ─────────────────────────────────────────────────────────────
   12. PROFILE VIEW + RADAR CHART
   ───────────────────────────────────────────────────────────── */
function initProfile() {
  const container = document.getElementById('profcontent');
  const sins      = U.sins;

  container.innerHTML = `
    <div class="profhdr">
      <div class="av av-xl av-ring" style="background:linear-gradient(135deg,var(--golds),var(--bg3))">${U.fn[0]}</div>
      <h2>${U.fn}</h2>
      <p class="pm">${U.age} · ${U.loc}</p>
      <div class="qbadge" style="margin-top:8px">
        <svg style="width:12px;height:12px;fill:var(--gold)"><use href="#i-diamond"/></svg>
        Profile Quality: High
      </div>
    </div>
    <div class="pgal">
      ${[0,1,2,3].map(i =>
        `<div style="background:linear-gradient(135deg,hsl(${20+i*30},36%,26%),hsl(${40+i*30},46%,18%))">${genAv(i*13+50, 38)}</div>`
      ).join('')}
      <div style="border:2px dashed var(--goldd);background:transparent;cursor:pointer" onclick="toast('Photo picker','ti')">
        <svg style="width:16px;height:16px;fill:var(--gold)"><use href="#i-plus"/></svg>
      </div>
    </div>
    <div class="stitle">Personality Breakdown</div>
    ${Object.entries(sins).map(([, v]) => {
      const pct = Math.abs(v.s) / 5 * 50;
      return `<div class="pbrow">
        <div class="pblbl">${v.f}</div>
        <div class="pbbar">
          <div class="pbctr"></div>
          <div class="pbfill ${v.s > 0 ? 'vice' : 'virtue'}" style="width:${pct}%"></div>
        </div>
        <div class="pbsc">${v.s > 0 ? '+' : ''}${v.s}</div>
        <div class="pbwt">${v.w}×</div>
      </div>`;
    }).join('')}`;

  // Animate bars
  setTimeout(() => {
    gsap.from('.pbfill', { scaleX: 0, transformOrigin: '50% 50%', duration: .8, stagger: .1, ease: 'expo.out' });
  }, 200);

  drawRadar();
}

function drawRadar() {
  const cv = document.getElementById('radar');
  if (!cv) return;

  const ctx  = cv.getContext('2d');
  const W    = cv.width;
  const H    = cv.height;
  const cx   = W / 2;
  const cy   = H / 2;
  const R    = 110;
  const sins = U.sins;
  const lbl  = Object.values(sins).map(v => v.f);
  const vals = Object.values(sins).map(v => (v.s + 5) / 10);
  const n    = 7;
  const step = (Math.PI * 2) / n;

  ctx.clearRect(0, 0, W, H);

  // Background rings
  for (let ring = 1; ring <= 4; ring++) {
    const r = (ring / 4) * R;
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const a = i * step - Math.PI / 2;
      i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
              : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(240,200,110,.08)';
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  // Spoke lines
  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    ctx.strokeStyle = 'rgba(240,200,110,.05)';
    ctx.stroke();
  }

  // Filled polygon
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const a   = idx * step - Math.PI / 2;
    const r   = vals[idx] * R;
    i === 0 ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
            : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fillStyle   = 'rgba(240,200,110,.12)';
  ctx.fill();
  ctx.strokeStyle = '#F0C86E';
  ctx.lineWidth   = 2;
  ctx.stroke();

  // Data-point dots
  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2;
    const r = vals[i] * R;
    ctx.beginPath();
    ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 3, 0, 6.28);
    ctx.fillStyle = '#F0C86E';
    ctx.fill();
  }

  // Labels
  ctx.font         = '10px DM Sans,sans-serif';
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle    = getComputedStyle(document.documentElement).getPropertyValue('--t2').trim() || '#C4B8B0';

  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2;
    ctx.fillText(lbl[i], cx + Math.cos(a) * (R + 20), cy + Math.sin(a) * (R + 20));
  }
}

function openSettings() {
  openSheet(`
    <div style="margin-bottom:16px">
      <h4 style="font-family:'Cormorant Garamond',serif;font-size:1rem;margin-bottom:10px">Account</h4>
      ${[['Name', U.fn], ['Email', U.email], ['Location', U.loc]].map(([label, val]) => `
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--bdr);font-size:.82rem">
        <span style="color:var(--t2)">${label}</span><span style="color:var(--t3)">${val}</span>
      </div>`).join('')}
    </div>
    <div style="margin-bottom:16px">
      <h4 style="font-family:'Cormorant Garamond',serif;font-size:1rem;margin-bottom:10px">Preferences</h4>
      ${[['Age Range', '22–34'], ['Distance', '15 km']].map(([label, val]) => `
      <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--bdr);font-size:.82rem">
        <span style="color:var(--t2)">${label}</span><span style="color:var(--t3)">${val}</span>
      </div>`).join('')}
    </div>
    <div style="margin-bottom:16px">
      <h4 style="font-family:'Cormorant Garamond',serif;font-size:1rem;margin-bottom:10px">Actions</h4>
      <button style="color:var(--gold);background:none;border:none;cursor:pointer;font-size:.82rem;text-decoration:underline"
        onclick="toast('Would restart questionnaire','ti')">Retake Questionnaire</button><br>
      <button style="color:var(--gold);background:none;border:none;cursor:pointer;font-size:.82rem;text-decoration:underline;margin-top:6px"
        onclick="toast('Would open upload','ti')">Add DNA Data</button>
    </div>
    <button style="width:100%;padding:10px;background:transparent;border:1.5px solid var(--mar);color:var(--marl);border-radius:10px;font-weight:600;cursor:pointer;font-size:.85rem"
      onclick="toast('Requires confirmation','tm')">Delete Account</button>`);
}


/* ─────────────────────────────────────────────────────────────
   13. ADMIN DASHBOARD
   ───────────────────────────────────────────────────────────── */
function initAdmin() {
  const container = document.getElementById('admincontent');

  container.innerHTML = `
    <div class="astats">
      ${[['total','Total'],['pend','Pending'],['appr','Approved'],['corr','Corrected'],['rej','Rejected']].map(([k, label]) => `
      <div class="astat">
        <div class="an" data-t="${STATS[k]}">0</div>
        <div class="al">${label}</div>
      </div>`).join('')}
    </div>

    <div class="stitle">Coverage Heatmap</div>
    <div style="font-size:.78rem;margin-bottom:6px">134/210 validated — 63.8%</div>
    <div style="height:4px;background:var(--bdr);border-radius:2px;overflow:hidden;margin-bottom:10px">
      <div style="height:100%;width:63.8%;background:linear-gradient(90deg,var(--gold),var(--gold2));border-radius:2px;box-shadow:0 0 6px var(--golds)"></div>
    </div>

    <div class="hmgrid">
      <div class="hmhdr"></div>
      ${['Q1','Q2','Q3','Q4','Q5','Q6'].map(q => `<div class="hmhdr">${q}</div>`).join('')}
      ${SINS.map((sin, ri) =>
        `<div class="hmrl">${sin}</div>` +
        HM[ri].map(v => `<div class="hmc ${v >= 5 ? 'hg' : v >= 2 ? 'hs' : 'hm'}">${v}</div>`).join('')
      ).join('')}
    </div>

    <div class="stitle">Review Queue</div>
    ${CALDATA.map((ex, i) => `
    <div class="rcard" id="rc${i}">
      <div class="rh">
        <span class="bdg bdg-g">Q${ex.qn}</span>
        <span class="bdg bdg-m">${ex.sin}</span>
      </div>
      <div class="rt">${ex.txt}</div>
      <div class="rm">
        <span>Score: <b>${ex.sc}</b></span>
        <span>Confidence: <b>${ex.co}</b></span>
      </div>
      <div class="re">"${ex.ev}"</div>
      <div class="racts">
        <button class="ra" onclick="revAct(${i},'a')">✓ Approve</button>
        <button class="rc" onclick="document.getElementById('cp${i}').classList.toggle('on')">✎ Correct</button>
        <button class="rr" onclick="revAct(${i},'r')">✕ Reject</button>
      </div>
      <div class="cpanel" id="cp${i}">
        <div class="cv" id="cv${i}">${ex.sc}</div>
        <input type="range" min="-50" max="50" value="${ex.sc * 10}"
          oninput="document.getElementById('cv${i}').textContent=(this.value/10).toFixed(1)">
        <button class="btn-g" style="width:100%;margin-top:6px;padding:7px" onclick="revAct(${i},'c')">Submit</button>
      </div>
    </div>`).join('')}

    <div class="stitle" style="margin-top:16px">Gemini Drift</div>
    <canvas id="effch" width="400" height="180" style="width:100%;max-height:180px;border-radius:12px"></canvas>`;

  // Animate stat counters
  setTimeout(() => {
    container.querySelectorAll('.an[data-t]').forEach(el => {
      gsap.to({ v: 0 }, {
        v: +el.dataset.t, duration: 1, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].v); },
      });
    });
    gsap.from('.hmc', { opacity: 0, duration: .2, stagger: .015 });
  }, 100);

  setTimeout(drawEff, 200);
}

function revAct(i, action) {
  const card = document.getElementById(`rc${i}`);
  gsap.to(card, {
    x: action === 'r' ? -250 : 250,
    opacity: 0, height: 0, padding: 0, margin: 0,
    duration: .35, ease: 'power2.in',
    onComplete() { card.remove(); },
  });
  toast({ a: 'Approved', c: 'Corrected', r: 'Rejected' }[action], action === 'r' ? 'tm' : 'tg');
}

function drawEff() {
  const cv = document.getElementById('effch');
  if (!cv) return;

  const ctx  = cv.getContext('2d');
  const W    = cv.width;
  const H    = cv.height;
  const pad  = { t: 16, r: 14, b: 24, l: 34 };
  const pW   = W - pad.l - pad.r;
  const pH   = H - pad.t - pad.b;
  const maxY = 2.5;
  const xS   = pW / (EFF.length - 1);

  ctx.clearRect(0, 0, W, H);

  // Y-axis labels + grid lines
  ctx.font      = '9px JetBrains Mono,monospace';
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--t3').trim() || '#7A6E68';
  ctx.textAlign = 'right';

  for (let i = 0; i <= 5; i++) {
    const val = (maxY / 5 * i).toFixed(1);
    const y   = pad.t + pH - (i / 5) * pH;
    ctx.fillText(val, pad.l - 4, y + 3);
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(W - pad.r, y);
    ctx.strokeStyle = 'rgba(122,110,104,.08)';
    ctx.lineWidth   = 1;
    ctx.stroke();
  }

  // X-axis labels
  ctx.textAlign = 'center';
  EFF.forEach((d, i) => ctx.fillText(`B${d.b}`, pad.l + i * xS, H - 5));

  // Fill area
  ctx.beginPath();
  EFF.forEach((d, i) => {
    const x = pad.l + i * xS;
    const y = pad.t + pH - (d.d / maxY) * pH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.lineTo(pad.l + (EFF.length - 1) * xS, pad.t + pH);
  ctx.lineTo(pad.l, pad.t + pH);
  ctx.closePath();
  ctx.fillStyle = 'rgba(240,200,110,.06)';
  ctx.fill();

  // Line
  const gold = getComputedStyle(document.documentElement).getPropertyValue('--gold').trim() || '#F0C86E';
  ctx.beginPath();
  EFF.forEach((d, i) => {
    const x = pad.l + i * xS;
    const y = pad.t + pH - (d.d / maxY) * pH;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = gold;
  ctx.lineWidth   = 2;
  ctx.stroke();

  // Data-point dots
  EFF.forEach((d, i) => {
    const x = pad.l + i * xS;
    const y = pad.t + pH - (d.d / maxY) * pH;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 6.28);
    ctx.fillStyle = gold;
    ctx.fill();
  });

  // Annotation
  ctx.font      = '9px DM Sans';
  ctx.fillStyle = gold;
  ctx.textAlign = 'center';
  ctx.fillText('↓ 62.9% improvement', W / 2, pad.t + 5);
}


/* ─────────────────────────────────────────────────────────────
   14. BOOTSTRAP
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Ambient effects
  initDust();
  initDots();
    // Sync theme button icon with initial theme
    const initTheme = document.documentElement.dataset.theme;
    document.getElementById('thbtn').innerHTML =
      `<svg><use href="#i-${initTheme === 'dark' ? 'moon' : 'sun'}"/></svg>`;

  // Staggered sign-up form entrance
  gsap.from('#signupform .fgroup', {
    y: 18, opacity: 0, duration: .45, stagger: .07, ease: 'expo.out', delay: .3,
  });

  // Feature modules
  initPhotos();
  initCal();
  initQ();
  showQ(0);
  initDeck();
  initMatches();
  initProfile();
  initAdmin();

  // Confetti on completion section enter
  ScrollTrigger.create({
    trigger: '#s6',
    start: 'top center',
    onEnter: () => boom(),
    once: true,
  });

  // ScrollTrigger entrance animations + dot sync
  setTimeout(initScroll, 100);

  console.log('Harmonia Preview v9.0 — modular build');
});
