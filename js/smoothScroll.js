const wrap = document.getElementById('fullpage');
const sections = Array.from(document.querySelectorAll('.section'));
const anchors = sections.map(s => s.id);
const last = sections.length - 1;
let current = 0;
let locked = false;

// Build the nav dots from the sections
const dotsBox = document.getElementById('dots');
sections.forEach((s, i) => {
  const b = document.createElement('button');
  b.title = s.id;
  b.addEventListener('click', () => goTo(i));
  dotsBox.appendChild(b);
});
const dots = Array.from(dotsBox.children);
const navLinks = Array.from(document.querySelectorAll('nav.top a'));

// Move the wrapper using REAL pixel heights (more reliable than vh on mobile)
function apply() {
  wrap.style.transform = `translate3d(0, ${-current * window.innerHeight}px, 0)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === current));
  navLinks.forEach((a, i) => a.classList.toggle('active', i === current));
  history.replaceState(null, '', '#' + anchors[current]); // update URL, no reload
}

// The core navigator. Returns true if we actually moved.
function goTo(i) {
  const target = Math.max(0, Math.min(last, i));
  if (target === current) return false;
  current = target;
  apply();
  return true;
}

// Lock input during the glide so one gesture = one section (the "tight" feel)
function navigate(dir) {
  if (locked) return;
  if (goTo(current + dir)) {
    locked = true;
    clearTimeout(navigate._t);
    navigate._t = setTimeout(() => { locked = false; }, parseInt(getComputedStyle(document.documentElement).getPropertyValue('--speed')));
  }
}
// Belt-and-suspenders: also release the lock when the transition truly ends
wrap.addEventListener('transitionend', e => { if (e.propertyName === 'transform') locked = false; });

// ── Inputs ──
window.addEventListener('wheel', e => {
  e.preventDefault();
  navigate(e.deltaY > 0 ? 1 : -1);
}, { passive: false });

document.addEventListener('keydown', e => {
  if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); navigate(1); }
  else if (['ArrowUp', 'PageUp'].includes(e.key))      { e.preventDefault(); navigate(-1); }
  else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
  else if (e.key === 'End')  { e.preventDefault(); goTo(last); }
});

let touchStartY = null;
window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchmove',  e => { e.preventDefault(); }, { passive: false });
window.addEventListener('touchend',   e => {
  if (touchStartY === null) return;
  const dy = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(dy) > 50) navigate(dy > 0 ? 1 : -1);
  touchStartY = null;
});

// Top-nav links + direct URL hash both route through here
navLinks.forEach((a, i) => a.addEventListener('click', e => { e.preventDefault(); goTo(i); }));
window.addEventListener('hashchange', () => {
  const i = anchors.indexOf(location.hash.slice(1));
  if (i >= 0) goTo(i);
});

// Keep positions correct when the window resizes (no animation on the correction)
window.addEventListener('resize', () => {
  wrap.style.transition = 'none';
  apply();
  requestAnimationFrame(() => { wrap.style.transition = ''; });
});

apply();
