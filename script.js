const desk = document.getElementById('desk');
const tasksEl = document.getElementById('tasks');
const menu = document.getElementById('menu');
const startBtn = document.getElementById('start');

const ICONS = {
  doc: '<svg viewBox="0 0 48 48"><path d="M10 4h20l10 10v30H10z" fill="#fff" stroke="#6b7a99" stroke-width="2"/><path d="M30 4v10h10" fill="#cfd8ee" stroke="#6b7a99" stroke-width="2"/><path d="M16 22h18M16 28h18M16 34h12" stroke="#316AC5" stroke-width="2"/></svg>',
  folder: '<svg viewBox="0 0 48 48"><path d="M4 12h14l4 4h22v26H4z" fill="#F4C84A" stroke="#B8891A" stroke-width="2"/><path d="M4 20h40v22H4z" fill="#FBE08A" stroke="#B8891A" stroke-width="2"/></svg>',
  star: '<svg viewBox="0 0 48 48"><path d="M24 4l6 13 14 2-10 10 3 14-13-7-13 7 3-14L4 19l14-2z" fill="#FFD84A" stroke="#B8891A" stroke-width="2"/></svg>',
  play: '<svg viewBox="0 0 48 48"><rect x="4" y="8" width="40" height="30" rx="4" fill="#1b1b1b" stroke="#6b7a99" stroke-width="2"/><path d="M20 16l12 7-12 7z" fill="#7FD13B"/><path d="M12 42h24" stroke="#6b7a99" stroke-width="3"/></svg>',
  mail: '<svg viewBox="0 0 48 48"><rect x="4" y="10" width="40" height="28" rx="2" fill="#fff" stroke="#6b7a99" stroke-width="2"/><path d="M5 12l19 15 19-15" fill="none" stroke="#316AC5" stroke-width="2"/></svg>'
};

// Proyectos: editá o agregá acá (imagen, link, categoría, título, descripción)
const PROJECTS = [
  ['fotos/proyecto11.png', 'https://www.instagram.com/reel/DfKleRfhSct/?utm_source=ig_web_copy_link&psln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', 'Motion graphics / Entorno digital', '3D Urban room', 'Desarrollo de un espacio digital inmersivo con estética urbana y personajes animados en un entorno tridimensional.'],
  ['fotos/projecto2.png', 'https://www.instagram.com/reel/DezKyLhREzU/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', 'Motion graphics / Collage digital', 'Shianlu.exe virus', 'Diseño de movimiento y composición digital que emula un entorno de sistema operativo retro utilizando gráficos de baja fidelidad y estética de virus informático.'],
  ['fotos/proyecto10.png', 'https://www.instagram.com/reel/Db8vRtppReu/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', 'Motion graphics / Lyrics visualization', 'Bic-Phone off Visualizer', 'Visualizer y kinetic typography para el track Phone Off de Bic. Animación 3D y motion graphics a partir de la identidad del lanzamiento.'],
  ['fotos/projecto1.png', 'https://www.instagram.com/reel/DaoXO5dO2eP/?igsh=MXFha245N2lveXR0Nw==', 'Motion graphics / UI design', 'Interactive Music Player UI', 'Reproductor dinámico para la estética visual del álbum. Atmósfera, iluminación roja y dinamismo en capas.'],
  ['fotos/proyecto3.png', 'https://www.instagram.com/reel/DZLI8xItMK7/?igsh=cHg4MW1rOXN2dnIx', 'Poster design / Arte digital', 'Saramalacara / Grunge Goth', 'Dirección de arte inspirada en la gráfica under del punk y el metal: blackletter, textura serigráfica y paleta reducida.'],
  ['fotos/proyecto4.png', 'https://www.instagram.com/reel/DbWIMZVJjMl/?igsh=MXhsaXFtbjFpaHNraA==', 'Motion graphics / Collage digital', 'Visualizer Y2K — "Tan Mala" (Salasflaco)', 'Pieza audiovisual Internet Core y webcore con animación collage y VFX retro para un lanzamiento musical.'],
  ['fotos/proyecto5.png', 'https://www.instagram.com/reel/Dbovo7LOq0L/?igsh=dmx4ZzhnazA3cHdh', 'Motion graphics / Lyrics visualization', 'Zell-Diamante Visualizer', 'Lyric video con tipografía animada en sincronía con el ritmo, cámara 3D y capas gráficas.'],
  ['fotos/proyecto6.png', 'https://www.instagram.com/reel/DZGtDKOtaiP/?igsh=MXUzbmZqbXN5MmJ0Mg==', 'Poster design / Arte digital', 'Bhavi / Dale nino', 'Afiche post-punk / grunge-pop con influencia de fanzine: duotono amarillo y rosa neón, texturas de imprenta.'],
  ['fotos/proyecto7.png', 'https://www.behance.net/gallery/254005917/LEVEL-UP-CUP-UIUX-Web-Design-%28Desktop-Mobile%29', 'UX/UI / Diseño web', 'Level Up — Landing Page Design', 'Landing responsive para eventos de esports: arquitectura de información, componentes y reserva de entradas.'],
  ['fotos/proyecto8.png', 'https://gianlucalaura04.github.io/Codigotaller2/index.html', 'UX/UI / Diseño web', 'Rolling Stone — Website Redesign Concept', 'Rediseño del sitio de Rolling Stone en Español: maquetación editorial y módulos de interacción con álbumes.'],
  ['fotos/proyecto9.png', 'https://www.behance.net/gallery/253913121/Nueva-Aplicacion-de-Carrefour-Case-study', 'UX/UI / Diseño web', 'Carrefour — Mobile App Redesign', 'Rediseño de la app: experiencia e-commerce, cupones de fidelización y checkout simplificado.']
];

// ---------- Ventanas ----------
const defs = Array.from(document.querySelectorAll('template[data-win]')).map(t => ({
  key: t.dataset.win, title: t.dataset.title, icon: t.dataset.icon, tpl: t
}));
const wins = {};
let z = 10;
let physicsOn = false;
let setGravity = null;

function focusWin(el) {
  el.style.zIndex = ++z;
  Object.values(wins).forEach(o => o.task.classList.toggle('on', o.el === el));
}

// Reproductor: agregá tus videos acá. Con archivo: { title: 'Showreel', src: 'videos/showreel.mp4' }
// Con YouTube: { title: 'Showreel', youtube: 'ID_DEL_VIDEO' }
const PLAYER_VIDEOS = [];

function initPlayer(body) {
  const screen = body.querySelector('.screen');
  const list = body.querySelector('.plist');
  const now = body.querySelector('.now');
  function play(v) {
    screen.innerHTML = '';
    let m;
    if (v.youtube) {
      m = document.createElement('iframe');
      m.src = `https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0`;
      m.allow = 'autoplay; encrypted-media; fullscreen';
      m.allowFullscreen = true;
      m.title = v.title;
    } else {
      m = document.createElement('video');
      m.src = v.src; m.controls = true; m.autoplay = true; m.playsInline = true;
    }
    screen.appendChild(m);
    now.textContent = v.title;
    Array.from(list.children).forEach(li => li.classList.toggle('on', li.dataset.t === v.title));
  }
  if (!PLAYER_VIDEOS.length) {
    screen.innerHTML = '<p class="empty">Todavía no hay videos. Agregalos en PLAYER_VIDEOS (script.js).</p>';
    return;
  }
  PLAYER_VIDEOS.forEach(v => {
    const li = document.createElement('li');
    li.textContent = v.title; li.dataset.t = v.title; li.tabIndex = 0;
    li.addEventListener('click', () => play(v));
    li.addEventListener('keydown', (e) => { if (e.key === 'Enter') play(v); });
    list.appendChild(li);
  });
  play(PLAYER_VIDEOS[0]);
}

// mover una ventana desde su barra de título (solo con física/escritorio)
function dragify(el) {
  el.querySelector('.tb').addEventListener('pointerdown', (e) => {
    if (!physicsOn || e.target.closest('button')) return;
    const dx = e.clientX - el.offsetLeft, dy = e.clientY - el.offsetTop;
    const move = (ev) => {
      el.style.left = Math.max(0, Math.min(desk.clientWidth - 80, ev.clientX - dx)) + 'px';
      el.style.top = Math.max(0, Math.min(desk.clientHeight - 30, ev.clientY - dy)) + 'px';
    };
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  });
}

function openWin(key) {
  let o = wins[key];
  if (!o) {
    const d = defs.find(x => x.key === key);
    const el = document.createElement('section');
    el.className = 'win';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', d.title);
    el.innerHTML = '<div class="tb"><span></span><button class="mn" aria-label="Minimizar">_</button><button class="x" aria-label="Cerrar">&times;</button></div><div class="wb"></div>';
    el.querySelector('.tb span').textContent = d.title;
    const body = el.querySelector('.wb');
    if (key === 'proyectos') {
      PROJECTS.forEach(p => {
        const a = document.createElement('a');
        a.className = 'proj'; a.href = p[1]; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = '<div class="th"></div><div><b></b><small></small><em></em></div>';
        a.querySelector('.th').style.backgroundImage = `url('${p[0]}')`;
        a.querySelector('b').textContent = p[3];
        a.querySelector('small').textContent = p[2];
        a.querySelector('em').textContent = p[4];
        body.appendChild(a);
      });
    } else {
      body.appendChild(d.tpl.content.cloneNode(true));
    }
    const n = Object.keys(wins).length;
    el.style.left = Math.max(8, Math.min(60 + n * 32, desk.clientWidth - 580)) + 'px';
    el.style.top = (24 + n * 28) + 'px';
    el.dataset.key = key;
    if (key === 'player') initPlayer(body);
    desk.appendChild(el);

    const task = document.createElement('button');
    task.className = 'task';
    task.textContent = d.title;
    tasksEl.appendChild(task);
    o = wins[key] = { el, task };

    task.addEventListener('click', () => {
      if (el.hidden) { el.hidden = false; focusWin(el); }
      else if (task.classList.contains('on')) { el.hidden = true; task.classList.remove('on'); }
      else focusWin(el);
    });
    el.addEventListener('pointerdown', () => focusWin(el));
    el.querySelector('.mn').addEventListener('click', () => { el.hidden = true; task.classList.remove('on'); });
    el.querySelector('.x').addEventListener('click', () => { el.remove(); task.remove(); delete wins[key]; });

    dragify(el);
  }
  o.el.hidden = false;
  focusWin(o.el);
}

// ---------- Íconos, nota de bienvenida y menú Inicio ----------
let down = null;
desk.addEventListener('mousedown', (e) => { down = { x: e.clientX, y: e.clientY }; });

const bodiesEls = [];
const note = document.createElement('div');
note.className = 'note';
note.innerHTML = '<div class="tb"><span>Bienvenido.txt</span></div><div class="wb"><h1>Gianluca Laura</h1><p>Diseñador multimedia · Motion · Video · UX/UI</p><p>Arrastrame, empujame y abrí los íconos.</p></div>';
desk.appendChild(note);
bodiesEls.push(note);

defs.forEach(d => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'icon';
  b.innerHTML = ICONS[d.icon] + '<span></span>';
  b.querySelector('span').textContent = d.title;
  b.addEventListener('click', (e) => {
    if (e.detail !== 0 && down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return;
    openWin(d.key);
  });
  desk.appendChild(b);
  bodiesEls.push(b);

  const m = document.createElement('button');
  m.innerHTML = ICONS[d.icon] + '<span></span>';
  m.querySelector('span').textContent = d.title;
  m.addEventListener('click', () => { menu.hidden = true; openWin(d.key); });
  menu.appendChild(m);
});

startBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.hidden = !menu.hidden; });
document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.hidden = true; });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') menu.hidden = true; });

const clock = document.getElementById('clock');
const tickClock = () => { clock.textContent = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }); };
tickClock();
setInterval(tickClock, 10000);

// ---------- Física (solo escritorio con mouse) ----------
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (window.Matter && fine && !reduce && window.innerWidth >= 900) {
  physicsOn = true;
  const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
  const engine = Engine.create({ gravity: { x: 0, y: 0 } });
  let W = desk.clientWidth, H = desk.clientHeight;
  const walls = [];

  function buildWalls() {
    walls.forEach(w => Composite.remove(engine.world, w));
    walls.length = 0;
    const t = 200, o = { isStatic: true, collisionFilter: { category: 2 } };
    walls.push(
      Bodies.rectangle(W / 2, -t / 2, W + 2 * t, t, o),
      Bodies.rectangle(W / 2, H + t / 2, W + 2 * t, t, o),
      Bodies.rectangle(-t / 2, H / 2, t, H + 2 * t, o),
      Bodies.rectangle(W + t / 2, H / 2, t, H + 2 * t, o)
    );
    Composite.add(engine.world, walls);
  }
  buildWalls();

  const spots = [[0.5, 0.3], [0.15, 0.72], [0.38, 0.8], [0.62, 0.8], [0.85, 0.72], [0.2, 0.35]];
  const items = bodiesEls.map((el, i) => {
    const w = el.offsetWidth, h = el.offsetHeight;
    const s = spots[i % spots.length];
    const body = Bodies.rectangle(s[0] * W + (Math.random() - 0.5) * 20, s[1] * H, w, h, {
      chamfer: { radius: 6 }, restitution: 0.85, friction: 0.05, frictionAir: 0.012,
      angle: (Math.random() - 0.5) * 0.3
    });
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: (Math.random() - 0.5) * 3 });
    Composite.add(engine.world, body);
    return { el, body, w, h };
  });

  setGravity = (on) => {
    engine.gravity.y = on ? 1 : 0;
    // al apagarla, un empujón hacia arriba para que vuelvan a flotar
    if (!on) items.forEach(it => Body.setVelocity(it.body, { x: (Math.random() - 0.5) * 6, y: -(2 + Math.random() * 4) }));
  };

  const mouse = Mouse.create(desk);
  mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
  const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } } });
  mc.collisionFilter.mask = 1;
  Composite.add(engine.world, mc);

  const ptr = { x: 0, y: 0, on: false };
  let px = 0, py = 0;
  desk.addEventListener('mousemove', (e) => {
    // solo empuja si el cursor está sobre el escritorio libre, no sobre una ventana
    ptr.on = !e.target.closest('.win');
    ptr.x = e.clientX; ptr.y = e.clientY;
  });
  desk.addEventListener('mouseleave', () => { ptr.on = false; mouse.button = -1; });
  window.addEventListener('mouseup', () => { mouse.button = -1; });
  // Matter mide el mouse contra el escritorio; si el cursor está sobre una ventana, no agarra nada
  desk.addEventListener('mousedown', (e) => { if (e.target.closest('.win')) mouse.button = -1; }, true);

  let last = 0;
  function tick(now) {
    requestAnimationFrame(tick);
    const dt = Math.min(now - last || 16, 32);
    last = now;
    const vx = ptr.x - px, vy = ptr.y - py;
    px = ptr.x; py = ptr.y;
    const reach = 130;

    items.forEach((it, i) => {
      const b = it.body;
      const dr = 0.000012 * b.mass;
      Body.applyForce(b, b.position, { x: Math.sin(now * 0.0004 + i * 1.7) * dr, y: Math.cos(now * 0.00035 + i * 2.3) * dr });
      if (ptr.on && mc.body !== b) {
        const dx = b.position.x - ptr.x, dy = b.position.y - ptr.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < reach) {
          const s = Math.pow(1 - d / reach, 2);
          Body.applyForce(b, b.position, { x: ((dx / d) * 0.0009 + vx * 0.00004) * b.mass * s, y: ((dy / d) * 0.0009 + vy * 0.00004) * b.mass * s });
        }
      }
    });

    Engine.update(engine, dt);

    items.forEach(it => {
      const b = it.body;
      const sp = Math.hypot(b.velocity.x, b.velocity.y);
      if (sp > 28) Body.setVelocity(b, { x: b.velocity.x * 28 / sp, y: b.velocity.y * 28 / sp });
      it.el.style.transform = `translate3d(${b.position.x - it.w / 2}px, ${b.position.y - it.h / 2}px, 0) rotate(${b.angle}rad)`;
    });
  }
  requestAnimationFrame(tick);

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      W = desk.clientWidth; H = desk.clientHeight;
      buildWalls();
      items.forEach(it => Body.setPosition(it.body, {
        x: Math.max(it.w / 2, Math.min(W - it.w / 2, it.body.position.x)),
        y: Math.max(it.h / 2, Math.min(H - it.h / 2, it.body.position.y))
      }));
    }, 150);
  });
} else {
  desk.classList.add('static');
}

// ---------- Ventanas emergentes con humor ----------
const POPUPS = [
  { title: 'Mensaje', text: '¿Querés contactarme?', buttons: [['Sí', () => openWin('contacto')], ['No', null, true]] },
  { title: 'Error crítico', err: true, text: 'Se detectó demasiado talento en este escritorio. Se recomienda contratar de inmediato.', buttons: [['Aceptar', () => openWin('contacto')], ['Ignorar']] },
  { title: 'Aviso del sistema', text: 'Hay un diseñador multimedia disponible para proyectos freelance. ¿Abrir Proyectos?', buttons: [['Abrir', () => openWin('proyectos')], ['Más tarde']] },
  { title: 'Reproductor', text: '¿Ya viste el showreel? Dura menos que un café.', buttons: [['Ver ahora', () => openWin('player')], ['Después']] }
];
let popN = 0;

function showPopup() {
  if (desk.querySelector('.pop') || popN >= POPUPS.length) return;
  const d = POPUPS[popN++];
  const el = document.createElement('section');
  el.className = 'win pop';
  el.setAttribute('role', 'alertdialog');
  el.setAttribute('aria-label', d.title);
  el.innerHTML = '<div class="tb"><span></span><button class="x" aria-label="Cerrar">&times;</button></div><div class="wb"><div class="ic"></div><p></p><div class="btns"></div></div>';
  el.querySelector('.tb span').textContent = d.title;
  const ic = el.querySelector('.ic');
  ic.textContent = d.err ? '!' : '?';
  if (d.err) ic.classList.add('err');
  el.querySelector('p').textContent = d.text;
  const close = () => el.remove();
  el.querySelector('.x').addEventListener('click', close);
  d.buttons.forEach(([label, fn, runs]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    let dodges = 0;
    // el "No" se escapa del cursor unas veces; después se deja clickear
    if (runs) b.addEventListener('pointerenter', () => {
      if (dodges++ < 6) b.style.transform = `translate(${(Math.random() - 0.5) * 220}px, ${-20 - Math.random() * 60}px)`;
    });
    b.addEventListener('click', () => { close(); if (fn) fn(); });
    el.querySelector('.btns').appendChild(b);
  });
  el.style.left = Math.max(8, Math.random() * (desk.clientWidth - 340)) + 'px';
  el.style.top = (60 + Math.random() * Math.max(40, desk.clientHeight - 300)) + 'px';
  desk.appendChild(el);
  focusWin(el);
  dragify(el);
}

function startPopups() {
  setTimeout(function loop() {
    showPopup();
    if (popN < POPUPS.length) setTimeout(loop, 28000);
  }, 9000);
}

// ---------- Pantalla de arranque + inicio de sesión ----------
(function () {
  const boot = document.getElementById('boot');
  let seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch (e) {}
  if (reduce || seen) { boot.remove(); startPopups(); return; }

  let done = false;
  function endBoot() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    boot.classList.add('out');
    setTimeout(() => boot.remove(), 650);
    startPopups();
  }
  const user = document.getElementById('loginUser');
  user.focus();
  user.addEventListener('click', () => {
    user.disabled = true;
    document.getElementById('loginMsg').textContent = 'Cargando tu configuración personal...';
    setTimeout(endBoot, 1400);
  });
  document.getElementById('bootSkip').addEventListener('click', endBoot);
})();

// ---------- Opciones en el menú Inicio: fondo y gravedad ----------
(function () {
  menu.appendChild(document.createElement('hr'));
  const BGS = [['prairie', 'Pradera'], ['blue', 'Azul clásico'], ['sunset', 'Atardecer'], ['teal', 'Verde azulado']];
  let bg = 0;
  try {
    const k = BGS.findIndex(b => b[0] === localStorage.getItem('bg'));
    if (k >= 0) bg = k;
  } catch (e) {}

  const bgBtn = document.createElement('button');
  bgBtn.className = 'opt';
  const applyBg = () => {
    document.documentElement.dataset.bg = BGS[bg][0];
    bgBtn.textContent = 'Fondo: ' + BGS[bg][1];
    try { localStorage.setItem('bg', BGS[bg][0]); } catch (e) {}
  };
  bgBtn.addEventListener('click', () => { bg = (bg + 1) % BGS.length; applyBg(); });
  menu.appendChild(bgBtn);
  applyBg();

  if (setGravity) {
    let on = false;
    const gBtn = document.createElement('button');
    gBtn.className = 'opt';
    gBtn.textContent = 'Gravedad: desactivada';
    gBtn.addEventListener('click', () => {
      on = !on;
      setGravity(on);
      gBtn.textContent = 'Gravedad: ' + (on ? 'activada' : 'desactivada');
    });
    menu.appendChild(gBtn);
  }
})();
