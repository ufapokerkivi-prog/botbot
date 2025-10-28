const services = [
  {
    icon: '🩺',
    title: 'Выезд нарколога на дом',
    description: 'Прибудем в течение часа. Медикаментозное лечение, детоксикация, психологическая поддержка.',
  },
  {
    icon: '💊',
    title: 'Кодирование от алкоголизма',
    description: 'Подбор индивидуальной программы кодирования: медикаментозное, лазерное, психотерапевтическое.',
  },
  {
    icon: '🛡️',
    title: 'Реабилитация и сопровождение',
    description: 'Индивидуальные и групповые программы, поддержка семьи, социальная адаптация после курса лечения.',
  },
  {
    icon: '⚕️',
    title: 'Вывод из запоя',
    description: 'Безопасное восстановление организма, капельницы, восстановительная терапия, круглосуточный контроль.',
  },
];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-intro__eyebrow">Наши услуги</span>
          <h2 className="section-intro__title" id="services-heading">
            Комплексная медицинская помощь 24/7
          </h2>
          <p className="section-intro__description">
            Работаем по международным стандартам и гарантируем конфиденциальность на всех этапах лечения.
          </p>
        </div>
        <div className="services-grid" role="list">
          {services.map((service) => (
            <article className="service-card" key={service.title} role="listitem" aria-label={service.title}>
              <div className="service-card__icon" aria-hidden="true">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <a href="#contact" className="btn btn--ghost" aria-label={`Уточнить стоимость услуги: ${service.title}`}>
                Уточнить стоимость
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
