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

  // ── CONFIG-DRIVEN DOM ────────────────────────────────────────
  function applyConfig() {
    if (typeof SITE_CONFIG === 'undefined') return;
    var c = SITE_CONFIG;
    var map = {
      'cfg-ping':           c.ping + 'ms',
      'cfg-location':       c.locationFull,
      'cfg-role':           c.role,
      'cfg-nav-badge':       c.navBadgeStatus,
      'cfg-eyebrow':        c.eyeBrow,
      'cfg-status':         '● ' + c.status,
      'cfg-readout-status': 'STATUS: ' + c.status,
      'cfg-readout-role':   'ROLE: ' + c.roleShort,
      'cfg-tagline':         c.heroTagline,
      'cfg-bio':             c.heroBio,
      'cfg-years-exp':       c.yearsExperience,
      'cfg-years-exp-full':  c.yearsExperience + ' YEARS EXP',
      'cfg-cloud':           c.primaryCloudPlatform,
      'cfg-availability':    c.availability,
      'cfg-availability_l2': c.availability_l2,
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = map[id];
    });

    // Kill feed — built from array
    var kf = document.getElementById('cfg-kill-feed');
    if (kf && Array.isArray(c.killFeed)) {
      kf.innerHTML = c.killFeed.map(function (row) {
        return '<div class="kf-row' + (row.alt ? ' alt' : '') + '">' +
               '<span class="kf-key">' + row.key + '</span>' +
               '&nbsp;›&nbsp;' + row.value +
               '</div>';
      }).join('');
    }
  }

  // ── PAGE-TOP COLLAPSE ON SCROLL ─────────────────────────────
  function setupPageTopCollapse() {
    var pageTop = document.querySelector('.page-top');
    if (!pageTop) return;

    var expandedH  = pageTop.offsetHeight;
    var collapsedH = 72;
    var delta      = expandedH - collapsedH;
    var collapsed  = false;

    window.addEventListener('scroll', function () {
      var y      = window.scrollY;
      var shrink = Math.min(y, delta);

      // Translate the page-top upward — purely visual, zero layout cost.
      // The nav (z-index 600) clips whatever rises above it, so only the
      // bottom (expandedH - shrink) px of the hero remains visible.
      // The page-body never moves in the layout, so it scrolls at 1:1 speed.
      pageTop.style.transform = 'translateY(-' + shrink + 'px)';

      if (!collapsed && shrink >= delta) {
        collapsed = true;
        pageTop.classList.add('collapsed');
        document.body.classList.add('page-scrolled');
      } else if (collapsed && shrink < delta) {
        collapsed = false;
        pageTop.classList.remove('collapsed');
        document.body.classList.remove('page-scrolled');
      }
    }, { passive: true });
  }

  // ── INIT ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    applyConfig();
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
