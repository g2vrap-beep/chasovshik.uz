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

/* ─── Watch Data ──────────────────────────────────── */
const WATCHES = [
  {
    img: 'images/Tsar Bomba 1.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Сталь / Голубой', en: 'Elemental · Steel / Blue', uz: "Elemental · Po'lat / Ko'k" },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Нержавеющая сталь, Tonneau-форма', en: 'Case: Stainless steel, Tonneau shape', uz: "Korpus: Zanglamaydigan po'lat, Tonneau" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  },
  {
    img: 'images/Tsar Bomba 2.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Rose Gold / Синий', en: 'Elemental · Rose Gold / Blue', uz: "Elemental · Rose Gold / Ko'k" },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Rose Gold IP, Tonneau-форма', en: 'Case: Rose Gold IP coating, Tonneau shape', uz: "Korpus: Rose Gold IP, Tonneau shakl" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  },
  {
    img: 'images/Tsar Bomba 3.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Чёрный / Золото', en: 'Elemental · Black / Gold', uz: 'Elemental · Qora / Oltin' },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Чёрное PVD покрытие, Tonneau-форма', en: 'Case: Black PVD coating, Tonneau shape', uz: "Korpus: Qora PVD qoplama, Tonneau shakl" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  },
  {
    img: 'images/Tsar Bomba 4.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Красный / Серебро', en: 'Elemental · Red / Silver', uz: 'Elemental · Qizil / Kumush' },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Нержавеющая сталь, Tonneau-форма', en: 'Case: Stainless steel, Tonneau shape', uz: "Korpus: Zanglamaydigan po'lat, Tonneau" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  },
  {
    img: 'images/Tsar Bomba 5.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Золото / Коричневый', en: 'Elemental · Gold / Brown', uz: 'Elemental · Oltin / Jigarrang' },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Gold IP покрытие, Tonneau-форма', en: 'Case: Gold IP coating, Tonneau shape', uz: "Korpus: Oltin IP qoplama, Tonneau shakl" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  },
  {
    img: 'images/Tsar Bomba 6.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    name: { ru: 'Elemental · Сталь / Белый', en: 'Elemental · Steel / White', uz: "Elemental · Po'lat / Oq" },
    specs: [
      { icon: '⚙️', ru: 'Механизм: Японский кварц (Miyota)', en: 'Movement: Japanese quartz (Miyota)', uz: 'Mexanizm: Yapon kvarts (Miyota)' },
      { icon: '💎', ru: 'Стекло: Сапфировое (устойчиво к царапинам)', en: 'Crystal: Sapphire (scratch resistant)', uz: "Oyna: Safir (tirnalishga chidamli)" },
      { icon: '💦', ru: 'Водозащита: 5ATM / 50 метров', en: 'Waterproof: 5ATM / 50m', uz: "Suv o'tkazmasligi: 5ATM / 50 m" },
      { icon: '🔲', ru: 'Корпус: Нержавеющая сталь, Tonneau-форма', en: 'Case: Stainless steel, Tonneau shape', uz: "Korpus: Zanglamaydigan po'lat, Tonneau" },
      { icon: '🌙', ru: 'Подсветка: Super Luminous А-класс', en: 'Luminous: A-Level Super Luminous', uz: 'Yorqinlik: A-darajali Super Luminous' },
      { icon: '📏', ru: 'Ремешок: Силикон 21мм, влагостойкий', en: 'Strap: Silicone 21mm, moisture resistant', uz: "Tasma: Silikon 21mm, namliqqa chidamli" },
      { icon: '🛡️', ru: 'Гарантия: 2 года', en: 'Warranty: 2 years', uz: 'Kafolat: 2 yil' }
    ]
  }
];

/* ─── Watch Modal ─────────────────────────────────── */
function openWatch(idx) {
  const w = WATCHES[idx];
  if (!w) return;
  const lang = currentLang;

  const modal = document.getElementById('watch-modal');

  document.getElementById('wm-img').src = w.img;
  document.getElementById('wm-img').alt = w.brand + ' ' + w.name.ru;
  document.getElementById('wm-brand').textContent = w.brand;

  const wmRef = document.getElementById('wm-ref');
  if (wmRef) wmRef.textContent = w.ref;

  const wmModel = document.getElementById('wm-model');
  wmModel.dataset.ru = w.name.ru;
  wmModel.dataset.en = w.name.en;
  wmModel.dataset.uz = w.name.uz;
  wmModel.textContent = w.name[lang] || w.name.ru;

  // Render specs
  const specsList = document.getElementById('wm-specs');
  if (specsList) {
    specsList.innerHTML = w.specs.map(s =>
      `<li><span class="spec-icon">${s.icon}</span><span class="spec-text">${s[lang] || s.ru}</span></li>`
    ).join('');
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeWatch(e) {
  if (e && e.target !== document.getElementById('watch-modal')) return;
  const modal = document.getElementById('watch-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Keyboard (ESC = back) ───────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') {
    return;
  }
  // Close modal first if open
  const modal = document.getElementById('watch-modal');
  if (modal && modal.classList.contains('open')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    return;
  }
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
