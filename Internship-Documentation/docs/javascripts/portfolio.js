/* ══════════════════════════════════════════
   HARINI D — PREMIUM MKDOCS ENHANCEMENTS
   Cursor glow · Progress bar · Reveal · Hero
══════════════════════════════════════════ */

/* ── CURSOR GLOW ── */
(function () {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  window.addEventListener('pointermove', (e) => {
    glow.style.transform = `translate(${e.clientX - 120}px, ${e.clientY - 120}px)`;
  });
})();

/* ── SCROLL PROGRESS BAR ── */
(function () {
  const bar = document.createElement('div');
  bar.className = 'portfolio-progress';
  document.body.appendChild(bar);
  const update = () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${total > 0 ? Math.min(scrolled / total, 1) : 0})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

/* ── HERO SURFACE WRAP ── */
(function () {
  const content = document.querySelector('.md-content__inner');
  if (!content) return;

  // Page pill (section label)
  const pill = document.createElement('div');
  pill.className = 'page-pill';
  const slug = window.location.pathname.replace(/\/$/, '').split('/').pop() || 'home';
  const labels = {
    'index':                'Home · Portfolio',
    '':                     'Home · Portfolio',
    'about-me':             '01 · About Me',
    'internship-overview':  '02 · Internship',
    'learning-journey':     '03 · Learning Journey',
    'open-source':          '04 · Open Source',
    'projects':             '05 · Projects',
    'cloud-learning':       '06 · Cloud Learning',
    'github-devops':        '07 · GitHub Workflow',
    'certifications':       '08 · Certifications',
    'documentation':        '09 · Documentation',
    'achievements':         '10 · Achievements',
    'contact':              '11 · Contact',
    'conclusion':           '12 · Conclusion',
  };
  pill.textContent = labels[slug] || 'Harini D · Portfolio';
  content.prepend(pill);

  // Wrap h1 in hero surface
  const h1 = content.querySelector('h1');
  if (h1) {
    const hero = document.createElement('div');
    hero.className = 'hero-surface';
    const label = document.createElement('div');
    label.className = 'hero-surface__label';
    label.textContent = 'Harini D · AI & ML Portfolio';
    hero.appendChild(label);
    h1.parentNode.insertBefore(hero, h1);
    hero.appendChild(h1);
  }
})();

/* ── REVEAL ON SCROLL ── */
(function () {
  const targets = document.querySelectorAll(
    '.md-content__inner > p,' +
    '.md-content__inner > ul,' +
    '.md-content__inner > ol,' +
    '.md-content__inner > table,' +
    '.md-content__inner > blockquote,' +
    '.md-content__inner > .admonition,' +
    '.md-content__inner > details,' +
    '.md-content__inner h2,' +
    '.md-content__inner h3,' +
    '.md-content__inner .grid.cards > *'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${Math.min(i * 40, 300)}ms`;
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((t) => io.observe(t));
})();

/* ── ANIMATED COUNTERS (for stat numbers in content) ── */
(function () {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target   = +el.dataset.count;
        const duration = 1200;
        const start    = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    io.observe(el);
  });
})();
