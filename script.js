/* ═══════════════════════════════════════════════════════
   CHASOVSHIK.UZ — Main Script v3
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

/* ─── Catalog Auto-Generation ─────────────────────── */
function buildCatalog() {
  const grid = document.getElementById('catalog-grid');
  if (!grid || typeof WATCHES === 'undefined') return;

  const lang = currentLang;
  let html = '';

  WATCHES.forEach((w, idx) => {
    const available = w.available !== false;
    const statusClass = available ? 'status-avail' : 'status-sold';
    const statusRu = available ? 'В наличии' : 'Продано';
    const statusEn = available ? 'In stock' : 'Sold';
    const statusUz = available ? 'Mavjud' : 'Sotilgan';

    html += `
      <div class="watch-card watch-clickable${!available ? ' watch-sold' : ''}" onclick="openWatch(${idx})">
        <div class="watch-img-box"><img src="${w.img}" alt="${w.brand} ${w.name.ru}" loading="lazy"></div>
        <div class="watch-info">
          <div class="watch-brand"
            data-ru="${w.brand}"
            data-uz="${w.brand}"
            data-en="${w.brand}">${w.brand}</div>
          <div class="watch-model"
            data-ru="${w.name.ru}"
            data-uz="${w.name.uz}"
            data-en="${w.name.en}">${w.name[lang] || w.name.ru}</div>
          <div class="watch-status ${statusClass}"
            data-ru="${statusRu}"
            data-uz="${statusUz}"
            data-en="${statusEn}">${available ? statusRu : statusRu}</div>
        </div>
        <div class="watch-zoom-hint">🔍</div>
        ${!available ? '<div class="watch-sold-badge" data-ru="ПРОДАНО" data-uz="SOTILDI" data-en="SOLD">ПРОДАНО</div>' : ''}
      </div>`;
  });

  // CTA card
  html += `
    <div class="watch-card watch-cta" onclick="openTelegram()">
      <div class="watch-cta-icon">💬</div>
      <div class="watch-cta-text"
        data-ru="Узнать цену или уточнить наличие"
        data-uz="Narx yoki mavjudlikni aniqlash"
        data-en="Ask for price or availability">
        Узнать цену или уточнить наличие
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center;margin-top:.3rem">
        <button class="mini-btn" onclick="event.stopPropagation();openInsta()">📸 Instagram</button>
        <button class="mini-btn" onclick="event.stopPropagation();openTelegram()">✈️ Telegram</button>
      </div>
    </div>`;

  grid.innerHTML = html;
}

/* ─── Watch Modal ─────────────────────────────────── */
function openWatch(idx) {
  const w = WATCHES[idx];
  if (!w) return;
  const lang = currentLang;
  const available = w.available !== false;

  const modal = document.getElementById('watch-modal');

  const imgEl = document.getElementById('wm-img');
  imgEl.src = w.img;
  imgEl.alt = w.brand + ' ' + w.name.ru;

  // Make image clickable for lightbox
  const imgWrap = document.getElementById('wm-img-wrap');
  imgWrap.onclick = function(e) {
    e.stopPropagation();
    openLightbox(w.img, w.brand + ' ' + (w.name[lang] || w.name.ru));
  };
  imgWrap.style.cursor = 'zoom-in';

  document.getElementById('wm-brand').textContent = w.brand;

  const wmRef = document.getElementById('wm-ref');
  if (wmRef) wmRef.textContent = w.ref;

  const wmModel = document.getElementById('wm-model');
  wmModel.dataset.ru = w.name.ru;
  wmModel.dataset.en = w.name.en;
  wmModel.dataset.uz = w.name.uz;
  wmModel.textContent = w.name[lang] || w.name.ru;

  // Status
  const statusDot = document.getElementById('wm-status-dot');
  const statusText = document.getElementById('wm-status-text');
  if (available) {
    statusDot.style.background = '#7EC880';
    statusDot.style.boxShadow  = '0 0 6px #7EC880';
    statusDot.style.animation  = 'blink-dot 2s ease-in-out infinite';
    statusText.dataset.ru = 'В наличии';
    statusText.dataset.uz = 'Mavjud';
    statusText.dataset.en = 'In stock';
    statusText.style.color = '#7EC880';
  } else {
    statusDot.style.background = '#E07070';
    statusDot.style.boxShadow  = '0 0 6px #E07070';
    statusDot.style.animation  = 'none';
    statusText.dataset.ru = 'Продано';
    statusText.dataset.uz = 'Sotilgan';
    statusText.dataset.en = 'Sold';
    statusText.style.color = '#E07070';
  }
  statusText.textContent = statusText.dataset[lang] || statusText.dataset.ru;

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

/* ─── Photo Lightbox ──────────────────────────────── */
function openLightbox(src, alt) {
  const lb   = document.getElementById('photo-lightbox');
  const img  = document.getElementById('lightbox-img');
  img.src    = src;
  img.alt    = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('photo-lightbox');
  lb.classList.remove('open');
  // Don't restore overflow if watch modal is still open
  if (!document.getElementById('watch-modal').classList.contains('open')) {
    document.body.style.overflow = '';
  }
}

/* ─── Battery Price List ──────────────────────────── */
const BATTERY_DATA = {
  renata: {
    brand: 'RENATA SWISS',
    flag: '🇨🇭',
    warranty: '1 год гарантии',
    utp: true,
    items: [
      { model: '315',  price: 200000 },
      { model: '317',  price: 200000 },
      { model: '319',  price: 200000 },
      { model: '321',  price: 150000 },
      { model: '329',  price: 200000 },
      { model: '337',  price: 200000 },
      { model: '335',  price: 200000 },
      { model: '339',  price: 250000 },
      { model: '341',  price: 200000 },
      { model: '344',  price: 200000 },
      { model: '346',  price: 150000 },
      { model: '357',  price: 170000 },
      { model: '362',  price: 100000 },
      { model: '364',  price: 100000 },
      { model: '370',  price: 150000 },
      { model: '371',  price: 150000 },
      { model: '373',  price: 150000 },
      { model: '377',  price: 100000 },
      { model: '379',  price: 150000 },
      { model: '380',  price: 200000 },
      { model: '381',  price: 200000 },
      { model: '384',  price: 200000 },
      { model: '386',  price: 200000 },
      { model: '389',  price: 200000 },
      { model: '390',  price: 180000 },
      { model: '391',  price: 180000 },
      { model: '392',  price: 150000 },
      { model: '393',  price: 200000 },
      { model: '394',  price: 200000 },
      { model: '395',  price: 150000 },
      { model: '396',  price: 150000 },
      { model: '397',  price: 180000 },
      { model: '399',  price: 180000 },
      { model: '1216', price: 150000 },
      { model: '1220', price: 180000 },
      { model: '1225', price: 180000 },
      { model: '1616', price: 160000 },
      { model: '1620', price: 180000 },
      { model: '1632', price: 180000 },
      { model: '2016', price: 100000 },
      { model: '2025', price: 100000 },
      { model: '2032', price: 100000 },
      { model: '2320', price: 180000 },
      { model: '2325', price: 200000 },
      { model: '2430', price: 200000 },
      { model: '2450', price: 200000 },
      { model: '2477', price: 200000 }
    ]
  },
  others: [
    {
      brand: 'PHILIPS',
      items: [
        { model: '2025',     price: 50000 },
        { model: '2032',     price: 50000 },
        { model: 'AAA',      price: 50000 },
        { model: 'AA',       price: 50000 },
        { model: 'LR27',     price: 50000 }
      ]
    },
    {
      brand: 'VARTA',
      items: [
        { model: '1216',     price: 50000 },
        { model: '1220',     price: 50000 },
        { model: '1225',     price: 50000 },
        { model: '1620',     price: 50000 },
        { model: '1632',     price: 50000 },
        { model: '2016',     price: 50000 },
        { model: '2320',     price: 50000 },
        { model: '2354',     price: 50000 },
        { model: '2430',     price: 50000 },
        { model: 'LR1/LADY', price: 50000 }
      ]
    },
    {
      brand: 'MAXELL',
      items: [
        { model: '1616', price: 50000 },
        { model: '1620', price: 50000 }
      ]
    },
    {
      brand: 'PANASONIC',
      items: [
        { model: '2412', price: 50000 }
      ]
    },
    {
      brand: 'KODAK',
      items: [
        { model: '2016', price: 50000 }
      ]
    },
    {
      brand: 'SONY',
      items: [
        { model: '1616', price: 50000 },
        { model: '1632', price: 50000 },
        { model: '2430', price: 50000 }
      ]
    }
  ]
};

function formatPrice(num) {
  return num.toLocaleString('ru-RU') + ' сум';
}

function openBatteryPrices() {
  const body = document.getElementById('battery-modal-body');

  let html = '';

  // ── RENATA SWISS — УТП блок ──
  const r = BATTERY_DATA.renata;
  html += `
    <div class="bm-utp-block">
      <div class="bm-utp-flag">${r.flag}</div>
      <div class="bm-utp-title">RENATA SWISS — Швейцарские батарейки</div>
      <div class="bm-utp-desc">
        Производство: <strong>Швейцария</strong> (завод Renata AG, основан в 1952 г.)<br>
        Технология: <strong>Оксид серебра (SR)</strong> — самая долгосрочная и стабильная для часов<br>
        Срок службы: <strong>до 2–3 лет</strong>, стабильное напряжение весь срок работы<br>
        Защищают механизм: без скачков напряжения<br>
        <span class="bm-utp-warranty">✅ Гарантия 1 год от CHASOVSHIK.UZ</span>
      </div>
    </div>`;

  html += `<div class="bm-section-title">🇨🇭 RENATA SWISS — полный прайс</div>`;
  html += `<div class="bm-grid">`;
  r.items.forEach(item => {
    html += `
      <div class="bm-row">
        <span class="bm-brand-tag">Renata</span>
        <span class="bm-model">${item.model}</span>
        <span class="bm-price gold">${formatPrice(item.price)}</span>
      </div>`;
  });
  html += `</div>`;

  html += `<div class="bm-divider"></div>`;
  html += `<div class="bm-section-title">⚡ Другие бренды</div>`;

  BATTERY_DATA.others.forEach(group => {
    html += `<div class="bm-brand-header">${group.brand}</div>`;
    html += `<div class="bm-grid">`;
    group.items.forEach(item => {
      html += `
        <div class="bm-row">
          <span class="bm-brand-tag dim">${group.brand}</span>
          <span class="bm-model">${item.model}</span>
          <span class="bm-price">${formatPrice(item.price)}</span>
        </div>`;
    });
    html += `</div>`;
  });

  html += `
    <div class="bm-footer">
      <div class="bm-footer-note">⚠️ Цены актуальны на момент посещения. Уточняйте при необходимости.</div>
      <div style="display:flex;gap:.65rem;justify-content:center;margin-top:.8rem;flex-wrap:wrap;">
        <button class="wm-btn wm-btn-tg" onclick="openTelegram()">✈️ Telegram</button>
        <button class="wm-btn wm-btn-ig" onclick="openInsta()">📸 Instagram</button>
      </div>
    </div>`;

  body.innerHTML = html;

  const modal = document.getElementById('battery-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ─── Service Price List ──────────────────────────── */
const SERVICE_DATA = [
  {
    id: 'install',
    icon: '🔩',
    name: { ru: 'Установка цифер или стрелок', en: 'Dial/Hands Installation', uz: "Raqamlar yoki millar o'rnatish" },
    copy:     'от 100 000',
    original: 'от 200 000',
    warranty: 0,
    groups: ['all']
  },
  {
    id: 'ultrasound',
    icon: '🔬',
    name: { ru: 'Химическая чистка ультразвуком', en: 'Ultrasonic Cleaning', uz: "Ultratovush bilan kimyoviy tozalash" },
    copy:     'от 150 000',
    original: 'от 300 000',
    warranty: 0,
    groups: ['all']
  },
  {
    id: 'manufacture',
    icon: '⌚',
    name: { ru: 'Ремонт мануфактуры', en: 'Manufacture Repair', uz: "Manufaktura ta'mirlash" },
    copy:     'от 800 000',
    original: 'от 2 500 000',
    warranty: 180,
    groups: ['repair', 'all']
  },
  {
    id: 'glass',
    icon: '💎',
    name: { ru: 'Замена / полировка стекол', en: 'Crystal Replacement / Polishing', uz: "Oyna almashtirish / sayqallash" },
    copy:     'от 150 000',
    original: 'от 250 000',
    warranty: 0,
    groups: ['glass', 'all']
  },
  {
    id: 'battery',
    icon: '🔋',
    name: { ru: 'Замена элементов питания', en: 'Battery Replacement', uz: "Batareyka almashtirish" },
    copy:     'от 100 000',
    original: 'от 100 000',
    warranty: 365,
    groups: ['all']
  },
  {
    id: 'strap',
    icon: '📎',
    name: { ru: 'Замена ремешков и браслетов', en: 'Strap / Bracelet Replacement', uz: "Tasmalar va bilaguzuklarni almashtirish" },
    copy:     'от 250 000',
    original: 'от 400 000',
    warranty: 0,
    groups: ['strap', 'all']
  },
  {
    id: 'rhodium',
    icon: '✨',
    name: { ru: 'Родирование корпусов и браслетов', en: 'Rhodium Plating', uz: "Korpus va bilaguzuklarni rodiyalash" },
    copy:     'от 800 000',
    original: 'от 1 100 000',
    warranty: 0,
    groups: ['polish', 'all']
  },
  {
    id: 'quartz',
    icon: '⚡',
    name: { ru: 'Ремонт кварцевых часов', en: 'Quartz Watch Repair', uz: "Kvarts soatlarni ta'mirlash" },
    copy:     'от 400 000',
    original: 'от 1 000 000',
    warranty: 180,
    groups: ['repair', 'all']
  },
  {
    id: 'mechanical',
    icon: '🌀',
    name: { ru: 'Ремонт механических часов', en: 'Mechanical Watch Repair', uz: "Mexanik soatlarni ta'mirlash" },
    copy:     'от 600 000',
    original: 'от 1 300 000',
    warranty: 180,
    groups: ['repair', 'all']
  },
  {
    id: 'bracelet',
    icon: '🔗',
    name: { ru: 'Ремонт браслетов и застежек', en: 'Bracelet / Clasp Repair', uz: "Bilaguzuk va qulflarni ta'mirlash" },
    copy:     'от 100 000',
    original: 'от 300 000',
    warranty: 0,
    groups: ['repair', 'all']
  },
  {
    id: 'resize',
    icon: '📐',
    name: { ru: 'Регулировка размера браслета', en: 'Bracelet Size Adjustment', uz: "Bilaguzuk o'lchamini sozlash" },
    copy:     'от 50 000',
    original: 'от 100 000',
    warranty: 0,
    groups: ['strap', 'repair', 'all']
  },
  {
    id: 'repassage',
    icon: '⚙️',
    name: { ru: 'Репассаж механизма', en: 'Movement Overhaul', uz: "Mexanizmni repasaj qilish" },
    copy:     'от 600 000',
    original: 'от 1 500 000',
    warranty: 180,
    groups: ['repassage', 'all']
  },
  {
    id: 'polishing',
    icon: '🌟',
    name: { ru: 'Полировка корпусов часов', en: 'Watch Case Polishing', uz: "Soat korpusini sayqallash" },
    copy:     'от 600 000',
    original: 'от 1 300 000',
    warranty: 0,
    groups: ['polish', 'all']
  }
];

function openServicePrices(group) {
  const lang = currentLang;
  const body = document.getElementById('service-modal-body');

  const filtered = (group === 'all')
    ? SERVICE_DATA
    : SERVICE_DATA.filter(s => s.groups.includes(group));

  let html = `
    <div class="sm-note">
      <span data-ru="Цены действительны в сервисном центре CHASOVSHIK.UZ (оба филиала)"
            data-uz="Narxlar CHASOVSHIK.UZ servis markazida amal qiladi"
            data-en="Prices valid at CHASOVSHIK.UZ service center (both branches)">
        Цены действительны в сервисном центре CHASOVSHIK.UZ (оба филиала)
      </span>
    </div>
    <div class="sm-table-wrap">
      <table class="sm-table">
        <thead>
          <tr>
            <th data-ru="Услуга" data-uz="Xizmat" data-en="Service">Услуга</th>
            <th data-ru="Копия" data-uz="Nusxa" data-en="Copy">Копия</th>
            <th data-ru="Оригинал" data-uz="Original" data-en="Original">Оригинал</th>
            <th data-ru="Гарантия" data-uz="Kafolat" data-en="Warranty">Гарантия</th>
          </tr>
        </thead>
        <tbody>`;

  filtered.forEach(svc => {
    const name = svc.name[lang] || svc.name.ru;
    const warranty = svc.warranty === 0
      ? '—'
      : (svc.warranty === 365
          ? (lang === 'ru' ? '1 год' : lang === 'en' ? '1 year' : '1 yil')
          : svc.warranty + (lang === 'ru' ? ' дней' : lang === 'en' ? ' days' : ' kun'));

    const warrantyCls = svc.warranty > 0 ? 'sm-warranty-yes' : 'sm-warranty-no';

    html += `
          <tr>
            <td><span class="sm-svc-icon">${svc.icon}</span>${name}</td>
            <td class="sm-price">${svc.copy}</td>
            <td class="sm-price sm-price-orig">${svc.original}</td>
            <td class="${warrantyCls}">${warranty}</td>
          </tr>`;
  });

  html += `
        </tbody>
      </table>
    </div>
    <div class="sm-footer">
      <div class="sm-footer-note">* Итоговая стоимость определяется после диагностики часов</div>
      <div style="display:flex;gap:.65rem;justify-content:center;margin-top:.8rem;flex-wrap:wrap;">
        <button class="wm-btn wm-btn-tg" onclick="openTelegram()">✈️ Telegram</button>
        <button class="wm-btn wm-btn-ig" onclick="openInsta()">📸 Instagram</button>
      </div>
    </div>`;

  body.innerHTML = html;

  // Apply language to new elements
  body.querySelectorAll('[data-ru]').forEach(el => {
    const text = el.dataset[lang] || el.dataset.ru;
    if (text) el.textContent = text;
  });

  const modal = document.getElementById('service-modal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ─── Price Modal Close ───────────────────────────── */
function closePriceModal(modalId, e) {
  const modal = document.getElementById(modalId);
  if (e && e.target !== modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Keyboard (ESC = back/close) ────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;

  // Close lightbox first
  const lb = document.getElementById('photo-lightbox');
  if (lb && lb.classList.contains('open')) {
    closeLightbox();
    return;
  }

  // Close battery modal
  const bm = document.getElementById('battery-modal');
  if (bm && bm.classList.contains('open')) {
    bm.classList.remove('open');
    document.body.style.overflow = '';
    return;
  }

  // Close service modal
  const sm = document.getElementById('service-modal');
  if (sm && sm.classList.contains('open')) {
    sm.classList.remove('open');
    document.body.style.overflow = '';
    return;
  }

  // Close watch modal
  const modal = document.getElementById('watch-modal');
  if (modal && modal.classList.contains('open')) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    return;
  }

  // Navigate back
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
  // Build catalog from watches.js
  buildCatalog();

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
