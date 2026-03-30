/* ============================================================
   PORTFOLIO JS
   Menu toggle, page-top collapse, date stamp, skill bars,
   coord scramble.
   ============================================================ */

(function () {
  'use strict';

  // ── ELEMENTS ────────────────────────────────────────────────
  const hbtn        = document.getElementById('hbtn');
  const menuOverlay = document.getElementById('menu-overlay');

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

  // ── SKILL BARS ──────────────────────────────────────────────
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

  // ── COORD SCRAMBLE ──────────────────────────────────────────
  function scrambleCoords() {
    var CHARS = '0123456789!@#$%<>?|[]~±°×÷*^&';

    function randChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    document.querySelectorAll('[data-scramble]').forEach(function (el) {
      var original = el.textContent;
      // Keep everything before the first digit static; scramble the rest
      var prefixEnd = original.search(/\d/);
      if (prefixEnd === -1) prefixEnd = 0;
      var prefix = original.slice(0, prefixEnd);
      var value  = original.slice(prefixEnd);

      setInterval(function () {
        var out = prefix;
        for (var i = 0; i < value.length; i++) {
          out += value[i] === ' ' ? ' ' : randChar();
        }
        el.textContent = out;
      }, 80);
    });
  }

  // ── PAGE-TOP COLLAPSE ON SCROLL ─────────────────────────────
  function setupPageTopCollapse() {
    var pageTop = document.querySelector('.page-top');
    if (!pageTop) return;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 0;
      pageTop.classList.toggle('collapsed', scrolled);
      document.body.classList.toggle('page-scrolled', scrolled);
    }, { passive: true });
  }

  // ── INIT ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    setLiveDate();
    setupPageTopCollapse();
    scrambleCoords();

    // Animate skill bars if present on this page
    if (document.querySelectorAll('.skill-fill[data-width]').length) {
      setTimeout(animateSkillBars, 200);
    }

    if (hbtn) hbtn.addEventListener('click', toggleMenu);

    if (menuOverlay) {
      menuOverlay.addEventListener('click', function (e) {
        if (e.target === menuOverlay) closeMenu();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  });

})();
