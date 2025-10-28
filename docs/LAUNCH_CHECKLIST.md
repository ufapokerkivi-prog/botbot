# Launch Checklist

Этот чек-лист поможет убедиться, что проект готов к production-запуску.

## 🔧 Базовая настройка

- [ ] **Переменные окружения:** Создать `.env.local` и заполнить все необходимые переменные
- [ ] **Домен:** Обновить `NEXT_PUBLIC_SITE_URL` и `metadataBase` в `app/layout.tsx`
- [ ] **Контакты:** Изменить телефон, email и адрес на реальные
- [ ] **Координаты:** Обновить координаты клиники в `lib/structured-data.ts` и `components/ClinicMap.tsx`
- [ ] **Изображения:** Заменить все placeholder-изображения на реальные фотографии клиники

## 📝 Контент

- [ ] **Услуги:** Проверить актуальность услуг и цен в `sections/Services.tsx`
- [ ] **О нас:** Обновить информацию о клинике в `sections/About.tsx`
- [ ] **Отзывы:** Добавить реальные отзывы клиентов в `sections/ReviewsSection.tsx`
- [ ] **Часы работы:** Проверить расписание в `lib/structured-data.ts`

## 🔍 SEO

- [ ] **Google Search Console:** Добавить и верифицировать сайт
- [ ] **Yandex Webmaster:** Добавить и верифицировать сайт
- [ ] **Google My Business:** Создать или обновить профиль
- [ ] **Яндекс.Справочник:** Добавить организацию
- [ ] **Sitemap:** Убедиться, что `/sitemap.xml` доступен
- [ ] **Robots.txt:** Проверить `/robots.txt`
- [ ] **Meta-теги:** Обновить `google-site-verification` и `yandex-verification` в `app/layout.tsx`

## 🧪 Тестирование

- [ ] **Build:** Запустить `npm run build` без ошибок
- [ ] **Unit Tests:** Выполнить `npm test` - все тесты должны пройти
- [ ] **Lint:** Выполнить `npm run lint` - нет ошибок
- [ ] **Lighthouse Desktop:** Performance, Accessibility, Best Practices, SEO ≥90
- [ ] **Lighthouse Mobile:** Performance, Accessibility, Best Practices, SEO ≥90
- [ ] **Axe DevTools:** Проверить accessibility на ключевых страницах
- [ ] **Mobile Testing:** Протестировать на iPhone, Android устройствах
- [ ] **Browser Testing:** Chrome, Safari, Firefox, Edge

## 🔒 Безопасность

- [ ] **HTTPS:** SSL-сертификат установлен и работает
- [ ] **CSP Headers:** Content Security Policy настроен (через `next.config.js` или CDN)
- [ ] **CORS:** Настроить правильные CORS-заголовки для API форм
- [ ] **Rate Limiting:** Включить для endpoint-ов форм
- [ ] **Environment Variables:** Убедиться, что `.env.local` не коммитится в Git

## 📊 Аналитика

- [ ] **Google Analytics 4:** Подключить и проверить работу
- [ ] **Yandex Metrika:** Подключить и настроить цели
- [ ] **Goal Tracking:** Настроить отслеживание отправки форм
- [ ] **Call Tracking:** (опционально) Настроить динамические номера

## 🚀 Деплой

- [ ] **Staging:** Развернуть на staging-окружении и проверить
- [ ] **DNS:** Настроить DNS-записи для домена
- [ ] **CDN:** (рекомендуется) Настроить Cloudflare или аналог
- [ ] **Monitoring:** Подключить Sentry или аналогичный сервис мониторинга ошибок
- [ ] **Uptime Monitoring:** Настроить UptimeRobot или аналог
- [ ] **Backup:** Настроить автоматическое резервное копирование

## ✅ После запуска (первая неделя)

- [ ] **Core Web Vitals:** Проверить метрики в Google Search Console
- [ ] **Form Submissions:** Убедиться, что формы работают и заявки приходят
- [ ] **Analytics:** Проверить, что данные собираются корректно
- [ ] **Mobile Experience:** Мониторить поведение мобильных пользователей
- [ ] **404 Errors:** Проверить в Search Console на наличие битых ссылок
- [ ] **Speed:** Регулярная проверка PageSpeed Insights

## 📈 Регулярное обслуживание

- [ ] **Контент:** Обновлять отзывы, добавлять новости/статьи
- [ ] **Lighthouse:** Ежемесячная проверка оценок
- [ ] **Dependencies:** Обновлять npm-пакеты (`npm outdated`, `npm update`)
- [ ] **Security:** Проверять на уязвимости (`npm audit`)
- [ ] **Backup Testing:** Проверять возможность восстановления из бэкапа

---

**Примечание:** Этот чек-лист необходимо адаптировать под конкретные требования проекта.
