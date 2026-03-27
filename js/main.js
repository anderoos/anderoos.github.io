/* ============================================================
   PORTFOLIO JS
   Navigation, transitions, date stamp, skill bars.
   ============================================================ */

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────────
  // Add page IDs here as you build them out.
  const PAGES = ['home', 'about', 'resume', 'projects', 'contact'];

  // ── STATE ───────────────────────────────────────────────────
  let current = 'home';
  let transitioning = false;

  // ── ELEMENTS ────────────────────────────────────────────────
  const hbtn        = document.getElementById('hbtn');
  const menuOverlay = document.getElementById('menu-overlay');
  const wipe        = document.getElementById('page-wipe');

  // ── MENU ────────────────────────────────────────────────────
  function openMenu() {
    hbtn.classList.add('open');
    menuOverlay.classList.add('open');
  }

  function closeMenu() {
    hbtn.classList.remove('open');
    menuOverlay.classList.remove('open');
  }

  function toggleMenu() {
    menuOverlay.classList.contains('open') ? closeMenu() : openMenu();
  }

  // Expose globally for inline onclick handlers
  window.toggleMenu = toggleMenu;

  // ── PAGE TRANSITIONS ────────────────────────────────────────
  function goTo(id) {
    if (!PAGES.includes(id) || id === current || transitioning) return;
    transitioning = true;
    closeMenu();

    // Wipe in (left → right)
    wipe.style.transition = 'transform 0.22s cubic-bezier(0.77,0,0.175,1)';
    wipe.style.transformOrigin = 'left';
    wipe.style.transform = 'scaleX(1)';

    setTimeout(function () {
      // Swap visible page
      const prev = document.getElementById('page-' + current);
      const next = document.getElementById('page-' + id);
      if (prev) prev.hidden = true;
      if (next) next.hidden = false;

      current = id;
      window.location.hash = id === 'home' ? '' : id;

      // Wipe out (right → left)
      wipe.style.transformOrigin = 'right';
      wipe.style.transform = 'scaleX(0)';

      setTimeout(function () {
        transitioning = false;
        onPageEnter(id);
      }, 240);
    }, 240);
  }

  // Expose globally
  window.goTo = goTo;

  // ── PAGE ENTER HOOKS ────────────────────────────────────────
  function onPageEnter(id) {
    if (id === 'about') animateSkillBars();
  }

  // ── SKILL BARS ──────────────────────────────────────────────
  // Each .skill-fill element uses data-width="N" (0–100).
  function animateSkillBars() {
    document.querySelectorAll('.skill-fill[data-width]').forEach(function (el) {
      el.style.width = el.dataset.width + '%';
    });
  }

  // ── LIVE DATE STAMP ─────────────────────────────────────────
  function setLiveDate() {
    const el = document.getElementById('live-date');
    if (!el) return;
    const d   = new Date();
    const y   = d.getFullYear();
    const m   = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    el.textContent = y + '-' + m + '-' + day;
  }

  // ── HASH ROUTING ────────────────────────────────────────────
  // Supports direct linking: yoursite.com/#projects
  function routeFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && PAGES.includes(hash) && hash !== 'home') {
      PAGES.forEach(function (id) {
        const el = document.getElementById('page-' + id);
        if (el) el.hidden = (id !== hash);
      });
      current = hash;
      onPageEnter(hash);
    }
  }

  // ── INIT ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    setLiveDate();
    routeFromHash();

    // Wire hamburger button
    if (hbtn) hbtn.addEventListener('click', toggleMenu);

    // Close menu on overlay background click
    if (menuOverlay) {
      menuOverlay.addEventListener('click', function (e) {
        if (e.target === menuOverlay) closeMenu();
      });
    }

    // Keyboard nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  });

})();
