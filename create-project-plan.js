const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat } = require('docx');
const fs = require('fs');

// Color palette - Terra Cotta Afterglow (Warm premium feel)
const colors = {
  primary: "26211F",
  bodyText: "3D3735",
  secondary: "6B6361",
  accent: "C19A6B",
  tableBg: "FDFCFB",
  headerBg: "F5F0EB"
};

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "D4C4B0" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Times New Roman", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 56, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: colors.primary, font: "Times New Roman" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, color: colors.secondary, font: "Times New Roman" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, color: colors.bodyText, font: "Times New Roman" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } }
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-4",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-5",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // Cover Page Section
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        new Paragraph({ spacing: { before: 6000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ПРОЕКТНЫЙ ДОКУМЕНТ", size: 28, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "САЙТ ЧАСОВЩИКА", size: 72, bold: true, color: colors.primary })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "CHASOVSHIK", size: 48, color: colors.accent })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Сервис центр швейцарских часов", size: 28, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Техническое задание и план разработки", size: 24, color: colors.bodyText })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // Main Content Section
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "CHASOVSHIK \u2014 Проектный документ", color: colors.secondary, size: 20 })]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ 
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "\u2014 ", color: colors.secondary }), 
                     new TextRun({ children: [PageNumber.CURRENT], color: colors.secondary }), 
                     new TextRun({ text: " \u2014", color: colors.secondary })]
        })] })
      },
      children: [
        // Section 1: Introduction
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Введение и концепция проекта")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Проект представляет собой разработку премиального веб-сайта для часовой мастерской \u201cCHASOVSHIK\u201d \u2014 сервисного центра по ремонту и обслуживанию швейцарских часов. Сайт должен отражать философию бренда: мастерство, традиции, премиальное качество и индивидуальный подход к каждому клиенту. Визуальный стиль вдохновлён реальным интерьером мастерской с элементами индустриального дизайна, тёмными стенами, светлыми витринами и акцентной подсветкой.", color: colors.bodyText })]
        }),

        // Section 2: Target Audience
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Целевая аудитория")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Основная целевая аудитория проекта включает владельцев швейцарских часов, ценителей часового искусства, коллекционеров антикварных часов и клиентов, ищущих профессиональный ремонт или реставрацию. Важно создать атмосферу доверия и экспертности через визуальный дизайн и структуру контента.", color: colors.bodyText })]
        }),

        // Section 3: Structure
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Структура сайта")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Сайт будет состоять из следующих основных разделов, каждый из которых выполняет свою функциональную роль:", color: colors.bodyText })]
        }),
        
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Главная страница (Landing Page)", bold: true, color: colors.bodyText }), new TextRun({ text: " \u2014 визуальная презентация мастерской, ключевые услуги, слайдер с фотографиями интерьера", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Услуги", bold: true, color: colors.bodyText }), new TextRun({ text: " \u2014 детальное описание всех сервисов: ремонт, реставрация, диагностика, кастомизация", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "О мастерской", bold: true, color: colors.bodyText }), new TextRun({ text: " \u2014 история бренда, команда мастеров, сертификаты, философия качества", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Портфолио/Галерея", bold: true, color: colors.bodyText }), new TextRun({ text: " \u2014 фотографии выполненных работ, примеры реставрации до и после", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-1", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Контакты", bold: true, color: colors.bodyText }), new TextRun({ text: " \u2014 адрес, часы работы, форма обратной связи, карта проезда", color: colors.bodyText })] }),

        // Section 4: Design System
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Дизайн-система")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Цветовая палитра")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Цветовая схема построена на контрасте тёмных и светлых тонов с золотыми акцентами, что создаёт премиальное ощущение и передаёт атмосферу мастерской:", color: colors.bodyText })]
        }),

        // Color table
        new Table({
          columnWidths: [2340, 2340, 4680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Цвет", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HEX-код", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Применение", bold: true, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Тёмно-серый/графит", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#1A1A1A, #2D2D2D", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Фон шапки, футера, секций", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Золотой/бронзовый", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#C19A6B, #B8860B", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Логотип, акценты, кнопки, иконки", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Белый/светло-серый", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#FFFFFF, #F5F5F5", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Фон контента, текст, витрины", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Тёмно-синий", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#1A2A4A", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Акцентные элементы,hover-эффекты", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Типографика")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Шрифтовая пара создаёт баланс между классической элегантностью и современной читаемостью:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Заголовки: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Playfair Display \u2014 элегантный serif-шрифт с классическим характером", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Основной текст: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Montserrat или Open Sans \u2014 чистый sans-serif для оптимальной читаемости", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Акценты: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Курсивное начертание для выделения ключевых фраз и цитат", color: colors.bodyText })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.3 Стиль дизайна")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Общий визуальный стиль можно охарактеризовать как \u201cЛюксовая классика с индустриальными акцентами\u201d. Ключевые принципы:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Минимализм и фокус на контенте \u2014 ничего лишнего, внимание на часах и услугах", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Индустриальные элементы \u2014 видимые текстуры, тёмные поверхности, акцентная подсветка", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Элегантность деталей \u2014 золотые акценты, качественная типографика, плавные анимации", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Атмосфера мастерской \u2014 фотографии интерьера, рабочих процессов, инструментов", color: colors.bodyText })] }),

        // Section 5: Technical Stack
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Технический стек")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Для реализации проекта будет использован современный технологический стек, обеспечивающий высокую производительность, SEO-оптимизацию и удобство поддержки:", color: colors.bodyText })]
        }),

        new Table({
          columnWidths: [3120, 6240],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Компонент", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Технология", bold: true, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Фреймворк", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Next.js 15 (App Router)", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Язык", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "TypeScript", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Стилизация", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Tailwind CSS 4 + shadcn/ui", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Анимации", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Framer Motion / CSS Transitions", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Иконки", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Lucide Icons", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Шрифты", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Google Fonts (Playfair Display, Montserrat)", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 6: Page Layouts
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. Макеты страниц")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.1 Шапка (Header)")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Шапка сайта является ключевым навигационным элементом и должна быть зафиксирована при прокрутке. Структура шапки:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Логотип слева: ", bold: true, color: colors.bodyText }), new TextRun({ text: "\u201cCHASOVSHIK\u201d + подзаголовок \u201cСервис центр швейцарских часов\u201d", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Навигация по центру: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Услуги, О нас, Портфолио, Контакты", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "CTA-кнопка справа: ", bold: true, color: colors.bodyText }), new TextRun({ text: "\u201cЗаказать звонок\u201d или \u201cЗаписаться на ремонт\u201d", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Фон: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Тёмно-серый/графитовый с золотыми акцентами", color: colors.bodyText })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.2 Главный экран (Hero Section)")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Главный экран \u2014 это первое впечатление пользователя, он должен быть визуально впечатляющим и сразу передавать атмосферу мастерской:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Полноэкранный слайдер с фотографиями интерьера мастерской", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Центрированный заголовок: \u201cРемонт швейцарских часов\u201d", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Подзаголовок с описанием ключевых преимуществ", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Кнопка призыва к действию: \u201cОставить заявку\u201d", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Тёмный оверлей для улучшения читаемости текста", color: colors.bodyText })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6.3 Секция услуг")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Блок услуг представляет ключевые сервисы мастерской в виде карточек с иконками:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Ремонт механических часов", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Реставрация антикварных часов", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Диагностика и оценка", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Кастомизация и персонализация", color: colors.bodyText })] }),

        // Section 7: Functional Requirements
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Функциональные требования")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.1 Обязательные функции")] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Адаптивный дизайн для всех устройств (desktop, tablet, mobile)", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Форма обратной связи с валидацией", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Интерактивная карта проезда (Google Maps / Yandex Maps)", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Галерея с возможностью увеличения изображений", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-2", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Плавные анимации при прокрутке и наведении", color: colors.bodyText })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7.2 SEO-оптимизация")] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Мета-теги для каждой страницы", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Структурированные данные (Schema.org)", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Оптимизация скорости загрузки", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "numbered-list-3", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Семантическая HTML-разметка", color: colors.bodyText })] }),

        // Section 8: Development Plan
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. План разработки")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Разработка будет вестись поэтапно с возможностью согласования каждого этапа:", color: colors.bodyText })]
        }),

        new Table({
          columnWidths: [1560, 3900, 3900],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Этап", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Задачи", bold: true, size: 22 })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                  shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                  children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Результат", bold: true, size: 22 })] })] })
              ]
            }),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Настройка проекта, дизайн-система", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Рабочее окружение, базовые стили", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Шапка, футер, навигация", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Общие компоненты", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Главная страница", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Hero, секции услуг, отзывы", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Внутренние страницы", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Услуги, О нас, Портфолио", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Страница контактов", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Форма, карта, контакты", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "6", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Анимации, оптимизация, тестирование", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "Финальная версия сайта", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 9: Images and Content
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("9. Контент и изображения")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Для полноценной работы сайта потребуется следующий контент от заказчика:", color: colors.bodyText })]
        }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Текстовый контент:")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Описание компании и философия бренда", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Подробное описание каждой услуги", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "История мастерской и информация о мастерах", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Контактная информация и часы работы", color: colors.bodyText })] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Визуальный контент:")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Фотографии интерьера мастерской (высокого качества)", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Фотографии процесса работы мастеров", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Изображения выполненных работ (до/после)", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Логотип в векторном формате (SVG/AI)", color: colors.bodyText })] }),

        // Conclusion
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("10. Заключение")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Данный документ представляет собой полное техническое задание на разработку премиального веб-сайта для часовой мастерской \u201cCHASOVSHIK\u201d. После согласования всех пунктов мы приступим к поэтапной реализации проекта. Готовый сайт будет отражать премиальность бренда, обеспечивать удобство навигации для клиентов и эффективно презентовать услуги мастерской.", color: colors.bodyText })]
        }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Дизайн вдохновлён реальным интерьером мастерской с индустриальными элементами, тёмными поверхностями и золотыми акцентами, что создаёт атмосферу экспертности и доверия.", color: colors.bodyText })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/CHASOVSHIK_Project_Plan.docx", buffer);
  console.log("Document saved successfully!");
});
