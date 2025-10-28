import dynamic from 'next/dynamic';
import { generateStructuredData } from '@/lib/structured-data';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import About from '@/sections/About';
import Countdown from '@/sections/Countdown';
import ContactForm from '@/sections/ContactForm';
import CTASection from '@/sections/CTASection';

const ReviewsSection = dynamic(() => import('@/sections/ReviewsSection'), {
  loading: () => <div style={{ height: '400px' }} />,
});

const MapSection = dynamic(() => import('@/sections/MapSection'), {
  loading: () => <div style={{ height: '400px' }} />,
  ssr: false,
});

export default function HomePage() {
  const jsonLd = generateStructuredData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a href="#main-content" className="skip-link">
        Перейти к основному содержанию
      </a>
      <header className="header" role="banner">
        <div className="container">
          <div className="header__inner">
            <div className="logo">
              <h1 className="visually-hidden">Наркологическая служба</h1>
              <a href="/" aria-label="На главную">
                <strong>Наркологическая служба</strong>
              </a>
            </div>
            <nav className="nav" role="navigation" aria-label="Основная навигация">
              <ul className="nav__list">
                <li><a href="#services" className="nav__link">Услуги</a></li>
                <li><a href="#about" className="nav__link">О нас</a></li>
                <li><a href="#reviews" className="nav__link">Отзывы</a></li>
                <li><a href="#contact" className="nav__link">Контакты</a></li>
              </ul>
            </nav>
            <a href="tel:+78001234567" className="btn btn--primary" aria-label="Позвонить по телефону 8 800 123-45-67">
              8 800 123-45-67
            </a>
          </div>
        </div>
      </header>
      <main id="main-content" role="main">
        <Hero />
        <Services />
        <About />
        <Countdown />
        <ReviewsSection />
        <CTASection />
        <ContactForm />
        <MapSection />
      </main>
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__columns">
            <div>
              <h3>Наркологическая служба</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Профессиональная помощь 24/7</p>
            </div>
            <div>
              <h4>Контакты</h4>
              <address style={{ fontStyle: 'normal' }}>
                <p><a href="tel:+78001234567">8 800 123-45-67</a></p>
                <p><a href="mailto:info@narcology.example">info@narcology.example</a></p>
                <p>г. Москва, ул. Примерная, 123</p>
              </address>
            </div>
            <div>
              <h4>Часы работы</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)' }}>Круглосуточно, без выходных</p>
            </div>
          </div>
          <div className="footer__bottom">
            <p>&copy; {new Date().getFullYear()} Наркологическая служба. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
