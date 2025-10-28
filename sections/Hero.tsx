import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-heading">
      <div className="hero__content">
        <div className="hero__badge" role="status">
          <span aria-hidden="true">✓</span>
          <span>Работаем круглосуточно</span>
        </div>
        <h2 id="hero-heading" style={{ marginBottom: '1rem', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          Профессиональная помощь при алкогольной и наркотической зависимости
        </h2>
        <p style={{ fontSize: '1.125rem', color: 'var(--color-text-light)' }}>
          Анонимно, безопасно и эффективно. Опытные врачи-наркологи готовы помочь вам 24/7. 
          Выезд на дом в течение часа.
        </p>
        <div className="hero__buttons">
          <a href="#contact" className="btn btn--primary">
            Вызвать врача
          </a>
          <a href="tel:+78001234567" className="btn btn--ghost">
            8 800 123-45-67
          </a>
        </div>
        <div className="hero__bullets">
          <div className="hero__bullet">
            <div className="hero__bullet-title">Более 15 лет опыта</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
              Квалифицированные специалисты
            </div>
          </div>
          <div className="hero__bullet">
            <div className="hero__bullet-title">100% анонимность</div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
              Полная конфиденциальность
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'relative', minHeight: '400px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <Image
          src="/images/hero-placeholder.jpg"
          alt="Профессиональная наркологическая помощь"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P7jfwAJSQPB9HB8xQAAAABJRU5ErkJggg=="
        />
      </div>
    </section>
  );
}
