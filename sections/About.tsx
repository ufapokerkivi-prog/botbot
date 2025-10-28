import Image from 'next/image';

export default function About() {
  const highlights = [
    'Лицензированные врачи-наркологи с опытом более 15 лет',
    'Современное оборудование и препараты',
    'Индивидуальный подход к каждому пациенту',
    'Полная анонимность и конфиденциальность',
    'Круглосуточная поддержка и консультации',
  ];

  return (
    <section id="about" className="bg-secondary" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-highlight">
          <div className="section-highlight__content">
            <div>
              <span className="section-intro__eyebrow">О нас</span>
              <h2 className="section-intro__title" id="about-heading" style={{ textAlign: 'left' }}>
                Почему выбирают нас
              </h2>
            </div>
            <p style={{ color: 'var(--color-text-light)' }}>
              Мы специализируемся на лечении алкогольной и наркотической зависимости уже более 15 лет. 
              Наши специалисты прошли сертификацию в ведущих центрах России и Европы.
            </p>
            <ul className="section-highlight__list" role="list">
              {highlights.map((item, index) => (
                <li className="section-highlight__item" key={index}>
                  <span aria-hidden="true">{index + 1}</span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <div>
              <a href="#contact" className="btn btn--primary">
                Записаться на прием
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', minHeight: '450px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Image
              src="/images/about-placeholder.jpg"
              alt="Команда врачей наркологической службы"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+HtfwAJBgPBN+H8+QAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </div>
    </section>
  );
}
