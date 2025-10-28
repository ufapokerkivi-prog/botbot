import CTAStressModal from '@/components/CTAStressModal';

export default function CTASection() {
  return (
    <section aria-labelledby="cta-heading">
      <div className="container">
        <div className="cta-card">
          <div>
            <h2 id="cta-heading">Не откладывайте на завтра — помощь доступна уже сейчас</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
              Мы понимаем, как важно своевременно начать лечение. Оставьте заявку, и мы подберем оптимальное решение для вас.
            </p>
          </div>
          <div className="cta-card__actions">
            <a href="#contact" className="btn btn--ghost" style={{ color: '#fff' }}>
              Получить консультацию
            </a>
            <CTAStressModal />
          </div>
        </div>
      </div>
    </section>
  );
}
