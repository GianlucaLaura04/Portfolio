// ============================================
// TIMELINE NAV: progreso de scroll + timecode
// ============================================
const progressBar = document.getElementById('timelineProgress');
const timecodeEl = document.getElementById('timecode');
const keyframes = Array.from(document.querySelectorAll('.keyframe'));
const sections = keyframes.map(kf => document.getElementById(kf.dataset.target)).filter(Boolean);

function formatTimecode(percent) {
  // Timecode ficticio: mapeamos 0-100% del scroll a un "clip" de 00:02:00:00 (2 min, 24fps)
  const totalFrames = 2 * 60 * 24; // 2 minutos a 24fps
  const frame = Math.floor((percent / 100) * totalFrames);
  const ff = frame % 24;
  const totalSeconds = Math.floor(frame / 24);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

function updateTimeline() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

  if (progressBar) progressBar.style.width = percent + '%';
  if (timecodeEl) timecodeEl.textContent = formatTimecode(percent);

  // marca el keyframe activo según qué sección está más cerca del tope de la pantalla
  let activeIndex = 0;
  sections.forEach((sec, i) => {
    if (sec && sec.getBoundingClientRect().top <= window.innerHeight * 0.35) {
      activeIndex = i;
    }
  });
  keyframes.forEach((kf, i) => kf.classList.toggle('is-active', i <= activeIndex));
}

window.addEventListener('scroll', updateTimeline, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();

// click en un keyframe: scroll suave a la sección
keyframes.forEach(kf => {
  kf.addEventListener('click', () => {
    const target = document.getElementById(kf.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ============================================
// Animar las barras de "Herramientas" al entrar en pantalla
// ============================================
const tracks = document.querySelectorAll('.track');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  tracks.forEach(track => observer.observe(track));
} else {
  tracks.forEach(track => track.classList.add('is-visible'));
}

// ============================================
// Parallax de los blobs del hero según el mouse
// ============================================
const heroEl = document.querySelector('.hero');
const blobWraps = document.querySelectorAll('.blob-wrap');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroEl && blobWraps.length && !prefersReducedMotion) {
  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    // posición del mouse relativa al centro del hero, de -1 a 1
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

    blobWraps.forEach(wrap => {
      const depth = parseFloat(wrap.dataset.depth) || 40;
      wrap.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });

  heroEl.addEventListener('mouseleave', () => {
    blobWraps.forEach(wrap => { wrap.style.transform = 'translate(0, 0)'; });
  });
}
// ============================================
// Carrusel de proyectos + expansión a grilla con filtros
// ============================================
const projectsViewport = document.getElementById('projectsViewport');
const projectsGrid = document.getElementById('projectsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const filtersWrap = document.getElementById('filtersWrap');
const filterBtns = document.querySelectorAll('.filter-btn');

if (projectsViewport && projectsGrid) {
  // clona todas las tarjetas una vez para que el loop del carrusel sea infinito y sin cortes
  const originalCards = Array.from(projectsGrid.children);
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    clone.classList.add('project-card--clone');
    projectsGrid.appendChild(clone);
  });

  projectsViewport.classList.add('is-carousel');
}

function expandProjects() {
  if (!projectsViewport || !projectsGrid) return;

  projectsGrid.querySelectorAll('.project-card--clone').forEach(clone => clone.remove());
  projectsViewport.classList.remove('is-carousel');

  if (loadMoreBtn) loadMoreBtn.classList.add('is-hidden');
  if (filtersWrap) filtersWrap.classList.remove('is-hidden');
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', expandProjects);
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('#projectsGrid .project-card').forEach(card => {
      const matches = filter === 'todos' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !matches);
    });
  });
});