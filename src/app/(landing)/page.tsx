export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="gradient-tiffany-strong flex min-h-[calc(100vh-80px)] items-center px-4 py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-display text-4xl font-bold text-text md:text-5xl lg:text-6xl">
              Наркологическая служба
            </h1>
            <p className="mb-8 text-lg text-muted md:text-xl">
              Профессиональная медицинская помощь. Выведение из запоя, кодирование, реабилитация.
              Анонимно. Круглосуточно.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#request"
                className="animate-pulse-soft inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
              >
                Оставить заявку
              </a>
              <a
                href="tel:+70000000000"
                className="inline-flex items-center justify-center rounded-md border-2 border-primary bg-transparent px-6 py-3 font-display text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary-sm"
              >
                Позвонить сейчас
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Услуги
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group rounded-2xl bg-elevated p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover-glow-tiffany"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                  <span className="text-2xl">💊</span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">Услуга {item}</h3>
                <p className="text-muted">
                  Описание услуги будет добавлено позже. Квалифицированная помощь специалистов, ориентированная на пациента.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="help" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="gradient-tiffany rounded-3xl p-12 text-center shadow-soft md:p-16">
            <h2 className="mb-4 font-display text-3xl font-bold text-text md:text-4xl">
              Круглосуточная помощь и поддержка
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg text-muted">
              Наши специалисты выезжают на дом в течение 45 минут, проводят детоксикацию и поддерживают пациента на каждом этапе пути к выздоровлению. Мы работаем анонимно и с заботой.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+70000000000"
                className="animate-pulse-soft inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95"
              >
                Срочный выезд врача
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-4 font-display text-base font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary-sm"
              >
                Узнать об услугах
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Отзывы
          </h2>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {["Все", "Алкоголь", "Зависимость", "Реабилитация"].map((filter, index) => (
              <button
                key={filter}
                type="button"
                aria-pressed={index === 0}
                className={`rounded-full border border-primary-200 px-5 py-2 text-sm font-semibold transition-all ${index === 0 ? "bg-primary text-white shadow-primary-sm" : "bg-transparent text-primary hover:bg-primary-100"}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-2xl bg-elevated p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-primary-lg">
                <p className="mb-4 text-muted">
                  Отзыв клиента будет добавлен позже. Мы работаем только с сертифицированными специалистами и
                  сопровождаем пациента до полного восстановления.
                </p>
                <div className="font-semibold text-text">Клиент {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="gradient-tiffany px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Оставить заявку
          </h2>
          <p className="mb-8 text-center text-muted">
            Оставьте заявку, и наши специалисты свяжутся с вами в течение 5 минут
          </p>
          <div className="rounded-2xl bg-elevated p-8 shadow-medium">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <input
                type="tel"
                placeholder="Телефон"
                className="w-full rounded-lg border border-border px-4 py-3 text-text transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <button className="animate-pulse-soft w-full rounded-lg bg-primary px-6 py-4 font-display text-base font-semibold text-white shadow-primary-md transition-all hover:shadow-primary-lg hover:opacity-95">
                Отправить заявку
              </button>
              <p className="text-center text-xs text-muted">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Контакты
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">Телефон</h3>
                <a href="tel:+70000000000" className="text-muted hover:text-primary">
                  +7 (000) 000-00-00
                </a>
              </div>
              <div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">Email</h3>
                <a href="mailto:info@example.com" className="text-muted hover:text-primary">
                  info@example.com
                </a>
              </div>
              <div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">Адрес</h3>
                <p className="text-muted">Адрес будет добавлен позже</p>
              </div>
            </div>
            <div className="flex min-h-[300px] items-center justify-center rounded-lg bg-elevated shadow-soft">
              <p className="text-muted">Карта будет добавлена позже</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
