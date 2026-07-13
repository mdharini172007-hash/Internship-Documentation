/* ══════════════════════════════════════════
   CERTIFICATIONS PAGE SCRIPT
   Lightbox · Zoom · Pan · Tilt · Reveal
══════════════════════════════════════════ */

const CERTS = [
  {
    src:   'assets/certificates/linux-foundation-lfd102.jpg',
    title: 'LFD102 — A Beginner\'s Guide to Open Source Software Development',
    org:   'The Linux Foundation · June 18, 2026 · ID: LF-lunhmt6o9w',
  },
  {
    src:   'assets/certificates/linux-foundation-lfd140.jpg',
    title: 'LFD140 — GitHub for Open Standards Development',
    org:   'The Linux Foundation · 2026 · Linux Foundation Education',
  },
];

/* ── LIGHTBOX ── */
(function () {
  const modal    = document.getElementById('cert-modal');
  const backdrop = modal.querySelector('.modal-backdrop');
  const img      = document.getElementById('modal-img');
  const titleEl  = document.getElementById('modal-title');
  const footerEl = document.getElementById('modal-footer');
  const wrap     = document.getElementById('modal-img-wrap');
  const btnClose = document.getElementById('btn-close');
  const btnZoomIn  = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const btnReset   = document.getElementById('btn-reset');
  const btnDownload = document.getElementById('btn-download');

  let scale = 1, panX = 0, panY = 0;
  let dragging = false, startX = 0, startY = 0, lastPanX = 0, lastPanY = 0;

  function applyTransform() {
    img.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }

  function openModal(idx) {
    const cert = CERTS[idx];
    img.src = cert.src;
    img.alt = cert.title;
    titleEl.textContent = cert.title;
    footerEl.textContent = cert.org;
    btnDownload.href = cert.src;
    btnDownload.download = cert.title + '.jpg';
    scale = 1; panX = 0; panY = 0;
    applyTransform();
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modal.focus();
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    img.src = '';
  }

  // Open triggers
  document.querySelectorAll('[data-cert]').forEach((el) => {
    el.addEventListener('click', () => openModal(+el.dataset.cert));
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+el.dataset.cert); }
    });
  });

  btnClose.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Zoom buttons
  btnZoomIn.addEventListener('click',  () => { scale = Math.min(scale + 0.25, 4); applyTransform(); });
  btnZoomOut.addEventListener('click', () => { scale = Math.max(scale - 0.25, 0.5); applyTransform(); });
  btnReset.addEventListener('click',   () => { scale = 1; panX = 0; panY = 0; applyTransform(); });

  // Mouse wheel zoom
  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    scale = Math.min(Math.max(scale + (e.deltaY < 0 ? 0.15 : -0.15), 0.5), 4);
    applyTransform();
  }, { passive: false });

  // Pan (drag)
  wrap.addEventListener('mousedown', (e) => {
    dragging = true; startX = e.clientX - lastPanX; startY = e.clientY - lastPanY;
    wrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    panX = e.clientX - startX; panY = e.clientY - startY;
    lastPanX = panX; lastPanY = panY;
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    wrap.style.cursor = 'grab';
  });

  // Touch pinch zoom + pan
  let initDist = 0, initScale = 1;
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      initDist  = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      initScale = scale;
    }
  }, { passive: true });
  wrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      scale = Math.min(Math.max(initScale * (dist / initDist), 0.5), 4);
      applyTransform();
    }
  }, { passive: false });
})();

/* ── TILT CARDS ── */
document.querySelectorAll('.cert-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const rx = ((e.clientY - cy) / rect.height) * -10;
    const ry = ((e.clientX - cx) / rect.width)  *  10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;

    // Glow follow
    const mx = ((e.clientX - rect.left) / rect.width)  * 100;
    const my = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow = card.querySelector('.cert-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${mx}% ${my}%, rgba(79,70,229,0.2), transparent 55%)`;
      glow.style.opacity = '1';
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    const glow = card.querySelector('.cert-card-glow');
    if (glow) { glow.style.opacity = '0'; }
  });
});

/* ── SCROLL REVEAL ── */
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal-up').forEach((el) => io.observe(el));
  // Trigger hero immediately
  setTimeout(() => {
    document.querySelectorAll('.cert-hero .reveal-up, .cert-stats.reveal-up').forEach((el) => el.classList.add('in-view'));
  }, 150);
})();
