/* ═══════════════════════════════════════════════════════
   CHASOVSHIK.UZ — Каталог часов
   ═══════════════════════════════════════════════════════

   КАК ДОБАВИТЬ НОВЫЕ ЧАСЫ:
   1. Скопируй один блок { ... } ниже
   2. Вставь его перед последней строкой ]
   3. Заполни своими данными
   4. Загрузи фото в папку images/
   5. Сохрани файл и загрузи на сайт

   КАК ОТМЕТИТЬ ЧАСЫ КАК "ПРОДАНО":
   Поменяй  available: true  →  available: false

   КАК УДАЛИТЬ ЧАСЫ:
   Удали весь блок от { до } включительно (не забудь про запятую)

   ═══════════════════════════════════════════════════════ */

const WATCHES = [

  // ─── Часы 1 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 1.jpg',       // путь к фото (папка images/)
    brand: 'Tsar Bomba',                  // бренд
    ref: 'TB8204Q',                       // артикул / ссылка
    available: true,                      // true = В наличии, false = Продано
    name: {
      ru: 'Elemental · Сталь / Голубой',
      en: 'Elemental · Steel / Blue',
      uz: "Elemental · Po'lat / Ko'k"
    },
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

  // ─── Часы 2 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 2.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    available: true,
    name: {
      ru: 'Elemental · Rose Gold / Синий',
      en: 'Elemental · Rose Gold / Blue',
      uz: "Elemental · Rose Gold / Ko'k"
    },
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

  // ─── Часы 3 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 3.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    available: true,
    name: {
      ru: 'Elemental · Чёрный / Золото',
      en: 'Elemental · Black / Gold',
      uz: 'Elemental · Qora / Oltin'
    },
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

  // ─── Часы 4 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 4.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    available: true,
    name: {
      ru: 'Elemental · Красный / Серебро',
      en: 'Elemental · Red / Silver',
      uz: 'Elemental · Qizil / Kumush'
    },
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

  // ─── Часы 5 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 5.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    available: true,
    name: {
      ru: 'Elemental · Золото / Коричневый',
      en: 'Elemental · Gold / Brown',
      uz: 'Elemental · Oltin / Jigarrang'
    },
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

  // ─── Часы 6 ───────────────────────────────────────────
  {
    img: 'images/Tsar Bomba 6.jpg',
    brand: 'Tsar Bomba',
    ref: 'TB8204Q',
    available: true,
    name: {
      ru: 'Elemental · Сталь / Белый',
      en: 'Elemental · Steel / White',
      uz: "Elemental · Po'lat / Oq"
    },
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

  // ─── ДОБАВЛЯЙ НОВЫЕ ЧАСЫ ЗДЕСЬ ────────────────────────
  // Скопируй блок выше и вставь сюда через запятую:
  // ,
  // {
  //   img: 'images/НовыеЧасы.jpg',
  //   brand: 'Бренд',
  //   ref: 'Артикул',
  //   available: true,
  //   name: { ru: '...', en: '...', uz: '...' },
  //   specs: [
  //     { icon: '⚙️', ru: '...', en: '...', uz: '...' },
  //   ]
  // }

];
