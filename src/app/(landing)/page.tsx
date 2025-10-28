export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="flex min-h-[calc(100vh-80px)] items-center bg-surface px-4 py-20 lg:px-8"
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
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-display text-base font-semibold text-white transition-colors hover:opacity-90"
              >
                Оставить заявку
              </a>
              <a
                href="tel:+70000000000"
                className="inline-flex items-center justify-center rounded-md border-2 border-primary px-6 py-3 font-display text-base font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
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
                className="rounded-lg bg-surface p-6 shadow-soft transition-shadow hover:shadow-medium"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <span className="text-2xl text-primary">💊</span>
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold text-text">Услуга {item}</h3>
                <p className="text-muted">Описание услуги будет добавлено позже</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-surface px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Отзывы
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-lg bg-elevated p-6 shadow-soft">
                <p className="mb-4 text-muted">Отзыв клиента будет добавлен позже</p>
                <div className="font-semibold text-text">Клиент {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-center font-display text-3xl font-bold text-text md:text-4xl">
            Оставить заявку
          </h2>
          <p className="mb-8 text-center text-muted">Форма заявки будет добавлена позже</p>
          <div className="rounded-lg bg-surface p-8 shadow-soft">
            <p className="text-center text-muted">Форма заявки</p>
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
