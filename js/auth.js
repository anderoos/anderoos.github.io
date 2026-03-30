/* ============================================================
   AUTH — client-side session password gate
   Hash: SHA-256 of the access passphrase
   ============================================================ */

(function () {
  'use strict';

  var HASH = '39114ed2f01f9eabc26d409a5d429cc9937449257c457d0ab37df1daa5280633';
  var SESSION_KEY = 'portfolio_auth';

  async function sha256(str) {
    var buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(str)
    );
    return Array.from(new Uint8Array(buf))
      .map(function (b) { return b.toString(16).padStart(2, '0'); })
      .join('');
  }

  function buildOverlay() {
    var overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.innerHTML = [
      '<div class="auth-box">',
      '  <div class="auth-eyebrow">// RESTRICTED ACCESS</div>',
      '  <div class="auth-title">CLEARANCE REQUIRED</div>',
      '  <div class="auth-sub">Enter access code to proceed</div>',
      '  <form id="auth-form" autocomplete="off">',
      '    <input id="auth-input" type="password" placeholder="ACCESS CODE" spellcheck="false" autocomplete="off" />',
      '    <button type="submit">AUTHENTICATE</button>',
      '  </form>',
      '  <div id="auth-error" class="auth-error"></div>',
      '</div>'
    ].join('');
    return overlay;
  }

  function gate() {
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;

    document.body.style.overflow = 'hidden';
    var overlay = buildOverlay();
    document.body.appendChild(overlay);

    var form  = document.getElementById('auth-form');
    var input = document.getElementById('auth-input');
    var err   = document.getElementById('auth-error');

    // Focus after a tick so the scramble animation doesn't steal it
    setTimeout(function () { input.focus(); }, 80);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var digest = await sha256(input.value);
      if (digest === HASH) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.classList.add('auth-fade-out');
        overlay.addEventListener('animationend', function () {
          overlay.remove();
          document.body.style.overflow = '';
        });
      } else {
        err.textContent = 'ACCESS DENIED — invalid code';
        input.value = '';
        input.focus();
        overlay.querySelector('.auth-box').classList.add('auth-shake');
        overlay.querySelector('.auth-box').addEventListener('animationend', function () {
          overlay.querySelector('.auth-box').classList.remove('auth-shake');
        }, { once: true });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gate);
  } else {
    gate();
  }
})();
