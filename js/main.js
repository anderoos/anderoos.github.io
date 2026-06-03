(function () {
    'use strict';

    // ── SKILL BARS ──────────────────────────────────────────────
    function animateSkillBars() {
        document.querySelectorAll('.skill-fill[data-width]').forEach(function (el) {
            el.style.width = el.dataset.width + '%';
        });
    }

    // ── LIVE DATE STAMP ─────────────────────────────────────────
    function setLiveDate() {
        var el = document.getElementById('live-date');
        if (!el) return;
        var d   = new Date();
        var y   = d.getFullYear();
        var m   = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        el.textContent = y + '/' + m + '/' + day;
    }

    // ── CONFIG-DRIVEN DOM ────────────────────────────────────────
    function applyConfig() {
        if (typeof SITE_CONFIG === 'undefined') return;
        var c = SITE_CONFIG;
        var map = {
            'cfg-ping':            c.ping,
            'cfg-location':        c.locationFull,
            'cfg-role':            c.role,
            'cfg-nav-badge':       c.navBadgeStatus,
            'cfg-eyebrow':         c.eyeBrow,
            'cfg-status':          '● ' + c.status,
            'cfg-readout-status':  'STATUS: ' + c.status,
            'cfg-readout-role':    'ROLE: ' + c.roleShort,
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
    }

    // ── PROJECT FILTER ───────────────────────────────────────────
    function initProjectFilter() {
        var filters = document.querySelectorAll('.proj-cat[data-cat]');
        var cards   = document.querySelectorAll('.project-card[data-cat]');
        if (!filters.length || !cards.length) return;

        filters.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filters.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                var cat = btn.dataset.cat;
                cards.forEach(function (card) {
                    var match = cat === 'all' || card.dataset.cat === cat;
                    card.classList.toggle('hidden', !match);
                });
            });
        });
    }

    // ── INIT ────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        applyConfig();
        setLiveDate();
        initProjectFilter();

        if (document.querySelectorAll('.skill-fill[data-width]').length) {
            setTimeout(animateSkillBars, 200);
        }
    });

}());
