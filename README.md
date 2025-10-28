# Лендинг наркологической службы

Современный адаптивный лендинг для наркологической службы, построенный на Next.js с TypeScript.

## 🚀 Технологии

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Headless UI
- **Additional libs**: Swiper, React CountUp, React Input Mask
- **Code Quality**: ESLint, Prettier, Husky, lint-staged

## 🎨 Цветовая схема

- **Primary (Тиффани)**: `#00C8B3`
- **Surface**: `#F5F6F8`
- **Elevated**: `#FFFFFF`
- **Text**: `#2B2B2B`
- **Muted Text**: `#667085`

## 📦 Установка

1. Клонируйте репозиторий:

```bash
git clone <repository-url>
cd narcological-service-landing
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите dev-сервер:

```bash
npm run dev
```

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## 📜 Доступные команды

- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка production версии
- `npm run start` - запуск production сервера
- `npm run lint` - запуск линтинга
- `npm run format` - форматирование кода с помощью Prettier

## 📁 Структура проекта

```
.
├── src/
│   ├── app/                # App Router pages
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── Header.tsx      # Header with navigation
│   │   ├── MobileCTA.tsx   # Sticky mobile CTA
│   │   ├── layout/         # Layout components
│   │   └── providers/      # Context providers
│   ├── lib/                # Utility functions
│   └── styles/             # Additional styles
├── public/                 # Static assets
└── package.json
```

## ✨ Особенности

- ✅ Responsive дизайн (Desktop, Tablet, Mobile)
- ✅ TypeScript для type safety
- ✅ App Router (Next.js 13+)
- ✅ Google Fonts (Montserrat + Inter) с preload
- ✅ CSS custom properties для дизайн-системы
- ✅ Fluid typography и spacing system
- ✅ Sticky header с responsive навигацией
- ✅ Mobile hamburger drawer menu
- ✅ Sticky mobile CTA кнопка
- ✅ Pre-commit hooks (Husky + lint-staged)
- ✅ ESLint + Prettier для качества кода
- ✅ Tailwind CSS для стилизации

## 🎯 Навигация

Реализованные секции:

- **Услуги** (`#services`) - список медицинских услуг
- **Отзывы** (`#reviews`) - отзывы клиентов
- **Заявка** (`#request`) - форма обратной связи
- **Контакты** (`#contacts`) - контактная информация

## 🔧 Конфигурация

### Fonts

Шрифты настроены в `src/app/layout.tsx`:

- **Inter** - основной шрифт (400, 500, 600, 700)
- **Montserrat** - display шрифт для заголовков (600, 700, 800)

### Colors

CSS переменные определены в `src/app/globals.css`:

```css
:root {
  --color-primary: #00c8b3;
  --color-surface: #f5f6f8;
  --color-elevated: #ffffff;
  --color-text: #2b2b2b;
  --color-text-muted: #667085;
}
```

### Spacing & Typography

Fluid type scale и spacing system настроены через CSS custom properties.

## 🚧 Дальнейшее развитие

- [ ] Детальное наполнение секции "Услуги"
- [ ] Рабочая форма обратной связи с валидацией
- [ ] Интеграция Yandex Maps для контактов
- [ ] Слайдер отзывов (Swiper)
- [ ] Счетчики достижений (React CountUp)
- [ ] Маски для телефонных номеров (React Input Mask)
- [ ] Модальные окна с информацией (Headless UI)
- [ ] Анимации при скролле (Framer Motion)
- [ ] SEO оптимизация
- [ ] Интеграция с CRM

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 👨‍💻 Разработка

При коммите автоматически запускаются:

1. ESLint проверка и автофикс
2. Prettier форматирование

Это настроено через Husky pre-commit hooks.
