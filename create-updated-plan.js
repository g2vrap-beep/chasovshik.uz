const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType, 
        ShadingType, VerticalAlign, PageNumber, PageBreak, LevelFormat, ImageRun } = require('docx');
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
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // Cover Page
    {
      properties: { page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } } },
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
          children: [new TextRun({ text: "CHASOVSHIK.UZ", size: 48, color: colors.accent })]
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Дархан \u2014 часовой сервис центр", size: 28, italics: true, color: colors.secondary })]
        }),
        new Paragraph({ spacing: { before: 4000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Интерактивный сайт с виртуальным входом в магазин", size: 24, color: colors.bodyText })]
        }),
        new Paragraph({ children: [new PageBreak()] })
      ]
    },
    // Main Content
    {
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: {
        default: new Header({ children: [new Paragraph({ 
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "CHASOVSHIK.UZ \u2014 Проектный документ", color: colors.secondary, size: 20 })]
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
        // Section 1: Company Info
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("1. Информация о компании")] }),
        
        new Table({
          columnWidths: [3120, 6240],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Параметр", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Значение", bold: true, size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Название", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "CHASOVSHIK.UZ / Дархан часовой сервис центр", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Год основания", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "2013", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Опыт", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "10+ лет в часовом деле", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Локация", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "ТЦ NEXT, 1 этаж, Ташкент", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Рейтинг", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                children: [new Paragraph({ children: [new TextRun({ text: "\u2B50 5.0 (12 отзывов на Яндекс Картах)", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 2: Concept
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("2. Концепция сайта \u2014 Виртуальный вход")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Сайт представляет собой интерактивный виртуальный тур по магазину. Посетитель \u201cвходит\u201d в магазин через анимированную дверь и оказывается внутри, где может осмотреть витрины с часами и получить информацию об услугах и контактах.", color: colors.bodyText })]
        }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.1 Экран 1: Вход в магазин")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Первый экран показывает вход в магазин с закрытой стеклянной дверью. Посетитель видит:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Иллюстрацию входа в магазин с тёмными деревянными панелями", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Стеклянную дверь с золотой рамой", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Тёплое освещение, видимое через стекло", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Кнопку \u201c\u0412\u041E\u0419\u0422\u0418\u201d на двери", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Логотип CHASOVSHIK над входом", color: colors.bodyText })] }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2.2 Экран 2: Внутри магазина")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "После нажатия кнопки \u201cВойти\u201d происходит анимация открытия двери, и пользователь видит интерьер:", color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Витрины с часами вдоль правой стены", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Рабочий стол мастера слева", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Стол/прилавок с информацией: контакты, услуги, запись", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Хрустальная люстра и тёплое освещение", color: colors.bodyText })] }),

        // Section 3: Services
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("3. Услуги компании")] }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "На сайте будет представлена информация о следующих услугах:", color: colors.bodyText })]
        }),

        new Table({
          columnWidths: [4680, 4680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Основные услуги", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Дополнительные услуги", bold: true, size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Ремонт швейцарских часов", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Экспресс ремонт", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Замена батареи", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Замена стекла", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Замена ремешка", size: 22 })] })
                ] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                children: [
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Вытачивание стекол", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Шитьё ремешков под заказ", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Полировка металлов (Au, Ag, Pt)", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Работа с антиквариатом", size: 22 })] }),
                  new Paragraph({ children: [new TextRun({ text: "\u2022 Заказ запчастей из Швейцарии", size: 22 })] })
                ] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 4: Visual Style
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("4. Визуальный стиль")] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.1 Цветовая палитра")] }),
        new Table({
          columnWidths: [2340, 2340, 4680],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Цвет", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "HEX", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Применение", bold: true, size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Тёмный шоколад", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#3D2B1F", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Фон, панели, дерево", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Золотой", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#C19A6B", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Акценты, рамы, логотип", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Кремовый", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#F5F0E6", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Текст, светлые элементы", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Мраморный", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "#E8E4DE", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Фон секций, акценты", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 200 } }),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4.2 Типографика")] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Заголовки: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Playfair Display \u2014 элегантный serif", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "Основной текст: ", bold: true, color: colors.bodyText }), new TextRun({ text: "Montserrat \u2014 современный sans-serif", color: colors.bodyText })] }),

        // Section 5: Technical
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("5. Технический стек")] }),
        new Table({
          columnWidths: [3120, 6240],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Компонент", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 6240, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Технология", bold: true, size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Фреймворк", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Next.js 15 (App Router)", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Язык", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "TypeScript", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Стилизация", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Tailwind CSS 4 + shadcn/ui", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Анимации", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Framer Motion", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Иллюстрации", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "AI-генерация (согласовано с клиентом)", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 6: Development Plan
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("6. План разработки")] }),
        new Table({
          columnWidths: [1560, 3900, 3900],
          margins: { top: 100, bottom: 100, left: 180, right: 180 },
          rows: [
            new TableRow({ tableHeader: true, children: [
              new TableCell({ borders: cellBorders, width: { size: 1560, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Этап", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Задачи", bold: true, size: 22 })] })] }),
              new TableCell({ borders: cellBorders, width: { size: 3900, type: WidthType.DXA },
                shading: { fill: colors.headerBg, type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Результат", bold: true, size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Настройка проекта, генерация иллюстраций", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Рабочее окружение, изображения", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Экран входа с кнопкой \u201cВойти\u201d", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Интерактивный первый экран", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Анимация открытия двери", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Плавный переход между экранами", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Интерьер магазина: витрины, стол", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Второй экран с контентом", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "5", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Интерактивные элементы: часы, контакты", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Hover-эффекты, модальные окна", size: 22 })] })] })
            ]}),
            new TableRow({ children: [
              new TableCell({ borders: cellBorders, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "6", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Адаптивность, оптимизация, тестирование", size: 22 })] })] }),
              new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: "Готовый сайт", size: 22 })] })] })
            ]})
          ]
        }),
        new Paragraph({ spacing: { after: 300 } }),

        // Section 7: Illustrations
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("7. Сгенерированные иллюстрации")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Для реализации концепции созданы две основные иллюстрации в едином стиле. Изображения отражают атмосферу реального интерьера мастерской с премиальным оформлением.", color: colors.bodyText })]
        }),
        new Paragraph({
          spacing: { after: 150, line: 312 },
          children: [new TextRun({ text: "Файлы иллюстраций:", bold: true, color: colors.bodyText })]
        }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "entrance_concept.png \u2014 вход в магазин с дверью", color: colors.bodyText })] }),
        new Paragraph({ numbering: { reference: "bullet-list", level: 0 }, spacing: { line: 312 },
          children: [new TextRun({ text: "interior_concept.png \u2014 интерьер с витринами", color: colors.bodyText })] }),

        // Conclusion
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("8. Заключение")] }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "Данный документ представляет обновлённый план разработки интерактивного сайта для часовой мастерской CHASOVSHIK.UZ. Уникальная концепция \u201cвиртуального входа\u201d создаёт запоминающийся пользовательский опыт и подчёркивает премиальность бренда.", color: colors.bodyText })]
        }),
        new Paragraph({
          spacing: { after: 200, line: 312 },
          children: [new TextRun({ text: "После согласования документа можно приступать к поэтапной реализации проекта.", color: colors.bodyText })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/home/z/my-project/download/CHASOVSHIK_Updated_Plan.docx", buffer);
  console.log("Document saved successfully!");
});
