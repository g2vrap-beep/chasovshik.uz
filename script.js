/* ═══════════════════════════════════════════════════════
   CHASOVSHIK.UZ — Main Script v2
   Languages: RU / UZ / EN
   ═══════════════════════════════════════════════════════ */
'use strict';

let currentLang = 'ru';

/* ─── Screen Navigation ───────────────────────────── */
function goTo(targetId) {
  const current = document.querySelector('.screen.active');
  const target  = document.getElementById(targetId);
  if (!target || target === current) return;

  if (current) {
    current.style.transition = 'opacity 0.32s ease';
    current.style.opacity    = '0';
    current.style.pointerEvents = 'none';
    setTimeout(() => {
      current.classList.remove('active');
      current.style.cssText = '';
    }, 320);
  }

  setTimeout(() => {
    target.classList.add('active');
    target.style.opacity    = '0';
    target.style.transition = 'opacity 0.38s ease';
    void target.offsetWidth; // reflow
    target.style.opacity    = '1';
    setTimeout(() => { target.style.cssText = ''; }, 400);
  }, current ? 300 : 0);
}

/* ─── Language ────────────────────────────────────── */
function setLang(lang) {
  currentLang = lang;
  applyLanguage();
}

function applyLanguage() {
  const lang = currentLang;

  // Update translatable elements
  document.querySelectorAll('[data-ru]').forEach(el => {
    const text = el.dataset[lang] || el.dataset.ru;
    if (text) el.textContent = text;
  });

  // Update pill highlights
  ['ru','uz','en'].forEach(l => {
    const pill = document.getElementById('lp-' + l);
    if (pill) pill.classList.toggle('active', l === lang);
  });

  document.documentElement.lang = lang;
}

/* ─── Social Links ────────────────────────────────── */
function openInsta() {
  window.open('https://www.instagram.com/chasovshik.uz/', '_blank', 'noopener');
}
function openTelegram() {
  window.open('https://t.me/chasovshikuz', '_blank', 'noopener');
}

/* ─── Keyboard (ESC = back) ───────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const id = document.querySelector('.screen.active')?.id;
  if (id === 's-interior') goTo('s-entrance');
  else if (['s-services','s-contacts','s-catalog'].includes(id)) goTo('s-interior');
});

/* ─── Touch swipe right = back ──────────────────── */
(function() {
  let sx = 0, sy = 0;
  document.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive:true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * .7) return;
    if (dx > 0) {
      const id = document.querySelector('.screen.active')?.id;
      if (id === 's-interior') goTo('s-entrance');
      else if (['s-services','s-contacts','s-catalog'].includes(id)) goTo('s-interior');
    }
  }, { passive:true });
})();

/* ─── Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in on load
  const entrance = document.getElementById('s-entrance');
  if (entrance) {
    entrance.style.opacity    = '0';
    entrance.style.transition = 'opacity 1.1s ease';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      entrance.style.opacity = '1';
      setTimeout(() => { entrance.style.cssText = ''; }, 1200);
    }));
  }
  applyLanguage();
});
