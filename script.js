/* ══════════════════════════════════════════
   PREMIUM PORTFOLIO — Harini D
   Main Script
══════════════════════════════════════════ */

/* ── LOADING SCREEN ── */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Minimum display time = loader bar animation (~1.8s)
  const hide = () => { loader.classList.add('hidden'); };
  if (document.readyState === 'complete') {
    setTimeout(hide, 1900);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 1900));
  }
})();

/* ── AOS INIT ── */
// AOS removed — using native Intersection Observer instead

/* ── INTERSECTION OBSERVER REVEAL ── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  // Observe all reveal elements
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom').forEach((el) => {
    io.observe(el);
  });

  // Hero elements — trigger immediately (they're in viewport on load)
  setTimeout(() => {
    document.querySelectorAll('.hero-section .reveal-up, .hero-section .reveal-zoom').forEach((el) => {
      el.classList.add('in-view');
    });
  }, 200);
})();

/* ── CUSTOM CURSOR ── */
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;

  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring follows with lag
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  // Hover enlargement
  const hoverTargets = 'a, button, .tilt-card, .contact-btn, .proj-link, .orbit-icon';
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
})();

/* ── NEURAL NETWORK BACKGROUND ── */
(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, mouse = { x: -9999, y: -9999 };

  const COLORS = ['rgba(79,70,229,', 'rgba(6,182,212,', 'rgba(34,211,238,', 'rgba(16,185,129,'];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    init();
  }

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function init() {
    const count = Math.min(110, Math.floor((W * H) / 12000));
    particles = Array.from({ length: count }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.35, 0.35), vy: rand(-0.35, 0.35),
      r: rand(1, 2.4),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: rand(0.3, 0.8),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const op = (1 - dist / 130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(79,70,229,${op})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      // Mouse interaction glow
      const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
      const md = Math.hypot(mdx, mdy);
      if (md < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - md / 160)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
    // Draw nodes
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  resize();
  draw();
})();

/* ── TYPING ANIMATION ── */
(function () {
  const el = document.getElementById('typing-el');
  if (!el) return;

  const words = [
    'GitHub Developer',
    'Open Source Contributor',
    'Cloud Learner',
    'Technical Writer',
    'Frontend Developer',
    'GitHub Pages Developer',
    'MLOps Contributor',
    'AI Enthusiast',
  ];

  let wIdx = 0, cIdx = 0, deleting = false, pause = 0;

  function tick() {
    const word = words[wIdx];
    if (pause > 0) { pause--; setTimeout(tick, 60); return; }

    if (!deleting) {
      el.textContent = word.slice(0, ++cIdx);
      if (cIdx === word.length) { pause = 30; deleting = true; }
      setTimeout(tick, 90);
    } else {
      el.textContent = word.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; pause = 8; }
      setTimeout(tick, 45);
    }
  }
  tick();
})();

/* ── ANIMATED COUNTERS ── */
(function () {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach((c) => io.observe(c));
})();

/* ── NAVIGATION ── */
(function () {
  const nav      = document.querySelector('.top-nav');
  const ham      = document.querySelector('.hamburger');
  const drawer   = document.getElementById('mobile-menu');
  const overlay  = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-links a');
  const navLinks    = document.querySelectorAll('.nav-links a');

  // Scroll: sticky opacity
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Hamburger
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    ham.classList.add('open');
    ham.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    ham.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (ham) ham.addEventListener('click', () => {
    drawer.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay)  overlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach((l) => l.addEventListener('click', closeDrawer));

  // Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActive() {
    let current = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    navLinks.forEach((l) => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

/* ── TILT CARDS (3D mouse tracking) ── */
(function () {
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const rotX   = ((e.clientY - cy) / rect.height) * -14;
      const rotY   = ((e.clientX - cx) / rect.width)  *  14;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
      // Move inner glow to mouse
      const glow = card.querySelector('.project-card-glow');
      if (glow) {
        const px = ((e.clientX - rect.left) / rect.width)  * 100;
        const py = ((e.clientY - rect.top)  / rect.height) * 100;
        glow.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(79,70,229,0.18), transparent 60%)`;
        glow.style.opacity = '1';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const glow = card.querySelector('.project-card-glow');
      if (glow) glow.style.opacity = '0';
    });
  });
})();

/* ── MAGNETIC BUTTONS ── */
(function () {
  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect  = btn.getBoundingClientRect();
      const mx    = e.clientX - (rect.left + rect.width  / 2);
      const my    = e.clientY - (rect.top  + rect.height / 2);
      btn.style.transform = `translate(${mx * 0.28}px, ${my * 0.28}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
    // Ensure clicks work — reset transform on click
    btn.addEventListener('mousedown', () => {
      btn.style.transform = '';
    });
  });
})();

/* ── GSAP HERO ENTRANCE ── */
(function () {
  if (!window.gsap) {
    // GSAP இல்லன்னா manually visible பண்ணு
    document.querySelectorAll('.hero-eyebrow, .hero-name, .hero-role, .hero-college, .typing-wrap, .hero-btns, .hero-visual, .hero-stats').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }
  const { gsap } = window;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  // Section headers with ScrollTrigger
  if (window.ScrollTrigger) {
    gsap.utils.toArray('.section-title').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 20, duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });
  }
})();

/* ── PAGE TRANSITION (fade in on load) ── */
(function () {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  // Use both load + DOMContentLoaded as fallback
  const show = () => { setTimeout(() => { document.body.style.opacity = '1'; }, 80); };
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    show();
  } else {
    window.addEventListener('load', show);
    document.addEventListener('DOMContentLoaded', show);
  }
})();

/* ── SMOOTH SCROLL FOR ANCHOR LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── GLASS CARD HOVER GLOW (mouse position) ── */
document.querySelectorAll('.glass-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--gx', x + '%');
    card.style.setProperty('--gy', y + '%');
  });
});

/* ══════════════════════════════════════════
   CERTIFICATE LIGHTBOX
══════════════════════════════════════════ */
(function () {
  const CERTS = [
    {
      src:   'assets/certificates/linux-foundation-lfd102.jpg',
      fallback: 'assets/certificates/placeholder.svg',
      title: 'LFD102 — A Beginner\'s Guide to Open Source Software Development',
      footer: 'The Linux Foundation · June 18, 2026 · Credential: LF-lunhmt6o9w',
    },
    {
      src:   'assets/certificates/linux-foundation-lfd140.jpg',
      fallback: 'assets/certificates/placeholder.svg',
      title: 'LFD140 — GitHub for Open Standards Development',
      footer: 'The Linux Foundation · 2026 · Linux Foundation Education',
    },
    {
      src:   'assets/certificates/aws-cloud-quest.jpg',
      fallback: 'assets/certificates/aws-placeholder.svg',
      title: 'AWS Cloud Practitioner Learning Badge — Cloud Quest',
      footer: 'Amazon Web Services · AWS Cloud Quest · Cloud Practitioner Level',
    },
  ];

  const modal    = document.getElementById('cert-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.cert-modal-backdrop');
  const img      = document.getElementById('cm-img');
  const titleEl  = document.getElementById('cert-modal-title');
  const footerEl = document.getElementById('cm-footer');
  const wrap     = document.getElementById('cm-imgwrap');
  const btnClose = document.getElementById('cm-close');
  const btnZoomIn  = document.getElementById('cm-zoomin');
  const btnZoomOut = document.getElementById('cm-zoomout');
  const btnReset   = document.getElementById('cm-reset');
  const btnDl      = document.getElementById('cm-download');

  let scale = 1, panX = 0, panY = 0;
  let drag = false, sx = 0, sy = 0, lpx = 0, lpy = 0;

  const apply = () => {
    img.style.transform = `translate(${panX}px,${panY}px) scale(${scale})`;
  };

  function open(idx) {
    const c = CERTS[idx];
    img.src = c.src;
    img.onerror = () => { img.src = c.fallback; img.onerror = null; };
    img.alt = c.title;
    titleEl.textContent = c.title;
    footerEl.textContent = c.footer;
    btnDl.href = c.src; btnDl.download = c.title + '.jpg';
    scale = 1; panX = 0; panY = 0; lpx = 0; lpy = 0;
    apply();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    img.src = '';
  }

  // Triggers — both thumb and button
  document.querySelectorAll('[data-cert]').forEach((el) => {
    el.addEventListener('click', () => open(+el.dataset.cert));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(+el.dataset.cert); }
    });
  });

  btnClose.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // Zoom
  btnZoomIn.addEventListener('click',  () => { scale = Math.min(scale + 0.25, 4); apply(); });
  btnZoomOut.addEventListener('click', () => { scale = Math.max(scale - 0.25, 0.5); apply(); });
  btnReset.addEventListener('click',   () => { scale = 1; panX = 0; panY = 0; lpx = 0; lpy = 0; apply(); });

  // Wheel zoom
  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale = Math.min(Math.max(scale + (e.deltaY < 0 ? 0.15 : -0.15), 0.5), 4);
    apply();
  }, { passive: false });

  // Drag pan
  wrap.addEventListener('mousedown', (e) => {
    drag = true; sx = e.clientX - lpx; sy = e.clientY - lpy;
  });
  window.addEventListener('mousemove', (e) => {
    if (!drag) return;
    panX = e.clientX - sx; panY = e.clientY - sy;
    lpx = panX; lpy = panY; apply();
  });
  window.addEventListener('mouseup', () => { drag = false; });

  // Touch pinch
  let id = 0, is = 1;
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      id = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      is = scale;
    }
  }, { passive: true });
  wrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      scale = Math.min(Math.max(is * (d / id), 0.5), 4); apply();
    }
  }, { passive: false });

  // Cert card tilt
  document.querySelectorAll('.premium-cert-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height/2) / r.height) * -10;
      const ry = ((e.clientX - r.left - r.width /2) / r.width)  *  10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      const mx = ((e.clientX - r.left) / r.width)  * 100;
      const my = ((e.clientY - r.top)  / r.height) * 100;
      const g = card.querySelector('.pcert-glow');
      if (g) { g.style.background = `radial-gradient(circle at ${mx}% ${my}%, rgba(79,70,229,0.2), transparent 55%)`; g.style.opacity = '1'; }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const g = card.querySelector('.pcert-glow');
      if (g) g.style.opacity = '0';
    });
  });
})();
