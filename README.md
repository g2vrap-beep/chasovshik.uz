# CHASOVSHIK.UZ — Сайт часовой мастерской

Профессиональный ремонт часов в Ташкенте. 12 лет опыта. 2 филиала.

---

## 📁 Структура файлов

```
chasovshik-uz/
├── index.html          ← Главная страница (единственная)
├── style.css           ← Все стили
├── script.js           ← Переключение экранов, языки
├── sitemap.xml         ← Для Google/Яндекс
├── robots.txt          ← Для поисковиков
└── images/
    ├── entrance.jpg    ← Экран 1 — вход
    ├── interior.jpg    ← Экран 2 — интерьер
    ├── services.jpg    ← Экран 3 — услуги
    ├── shop1.jpg       ← Экран 5 — каталог фон
    ├── plastic_visitka.png  ← Экран 4 — контакты фон
    ├── Tsar Bomba 1-6.jpg   ← Часы в каталоге
    └── ...
```

---

## 🚀 Деплой на GitHub + Netlify (бесплатно)

### ШАГ 1 — Создать репозиторий на GitHub

1. Зайди на **github.com** → войди в аккаунт
2. Нажми кнопку **"New"** (зелёная, слева)
3. Название репозитория: `chasovshik-uz`
4. Поставь галочку **"Public"**
5. Нажми **"Create repository"**

### ШАГ 2 — Загрузить файлы на GitHub

Открой терминал (CMD) в папке `chasovshik-uz` и выполни:

```bash
git init
git add .
git commit -m "Initial commit — CHASOVSHIK.UZ"
git branch -M main
git remote add origin https://github.com/ТВОЙ_НИК/chasovshik-uz.git
git push -u origin main
```

> Замени `ТВОЙ_НИК` на своё имя пользователя GitHub

### ШАГ 3 — Подключить Netlify

1. Зайди на **netlify.com** → войди через GitHub аккаунт
2. Нажми **"Add new site"** → **"Import an existing project"**
3. Выбери **GitHub** → найди репозиторий `chasovshik-uz`
4. Настройки оставь по умолчанию → нажми **"Deploy site"**
5. Через 30 секунд сайт будет доступен по адресу типа `random-name.netlify.app`

### ШАГ 4 — Подключить домен chasovshik.uz

1. В Netlify: **Domain settings** → **"Add custom domain"**
2. Введи `chasovshik.uz` → нажми **Verify**
3. Netlify покажет два NS-сервера (типа `dns1.p01.nsone.net`)
4. Зайди к своему регистратору домена (.uz)
5. Замени NS-серверы на те, что дал Netlify
6. Подождать 24–48 часов — домен заработает с HTTPS автоматически

---

## 🔄 Обновление сайта (когда захочешь что-то изменить)

После любых правок просто выполни в терминале:

```bash
git add .
git commit -m "Обновление каталога"
git push
```

Netlify сам перезапустит сайт через 30 секунд. Никаких кнопок жать не надо.

---

## 📊 Аналитика (добавить после деплоя)

### Яндекс Метрика:
1. Зайди на **metrika.yandex.ru**
2. Создай счётчик → получи код (8 цифр)
3. Вставь в `index.html` перед `</head>`:
```html
<!-- Yandex.Metrika -->
<script type="text/javascript">
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
   ym(XXXXXXXX, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });
</script>
<!-- /Yandex.Metrika -->
```
> Замени `XXXXXXXX` на свой ID счётчика

---

## 📞 Контакты

- **Instagram:** [@chasovshik.uz](https://www.instagram.com/chasovshik.uz)
- **Telegram:** [t.me/chasovshikuz](https://t.me/chasovshikuz)
- **Телефон:** +998 95 838-99-99 / +998 95 436-99-99
