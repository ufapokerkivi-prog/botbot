import { initFormValidation } from './js/forms.js';
import { initAnalytics, trackEvent } from './js/analytics.js';
import { initInactivityTimer } from './js/inactivity-timer.js';
import { initPopup } from './js/popup.js';
import { initParallax } from './js/parallax.js';
import { initStickyButton } from './js/sticky-button.js';
import { initYandexMap } from './js/yandex-map.js';
import { initScrollAnimations } from './js/scroll-animations.js';
import { mockApiRequest } from './js/mock-api.js';
import { initHelpModal } from './js/modal.js';
import { initReviewsSlider } from './js/reviews-slider.js';
import { initServicesCarousel } from './js/services-carousel.js';
import { initAlcoholStatsCountup } from './js/alcohol-stats.js';

let helpModalControls = null;

document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('root');
    
    const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    root.innerHTML = `
        <header class="header">
            <div class="container">
                <nav class="nav">
                    <div class="logo">
                        <span class="logo-text">Наркологическая служба</span>
                    </div>
                    <a href="tel:+78005001234" class="header-phone">+7 (800) 500-12-34</a>
                </nav>
            </div>
        </header>
        
        <main class="main">
            <section class="hero-section">
                <div class="container hero-container">
                    <div class="hero-content">
                        <h1>Профессиональная наркологическая помощь 24/7</h1>
                        <p class="hero-subtitle">Анонимно. Конфиденциально. Быстро. Выезд на дом за 30 минут.</p>
                        
                        <div class="hero-trust-badges">
                            <div class="trust-badge">
                                <span class="trust-badge-icon">✓</span>
                                <span>Лицензия Минздрава</span>
                            </div>
                            <div class="trust-badge">
                                <span class="trust-badge-icon">✓</span>
                                <span>Опыт более 10 лет</span>
                            </div>
                            <div class="trust-badge">
                                <span class="trust-badge-icon">✓</span>
                                <span>100% анонимность</span>
                            </div>
                        </div>
                        
                        <div class="hero-cta-buttons">
                            <a href="tel:+78005001234" class="btn btn-hero-primary" aria-label="Позвонить прямо сейчас">
                                Позвонить прямо сейчас
                            </a>
                            <a href="#cta-form" class="btn btn-hero-secondary" aria-label="Оставить заявку">
                                Оставить заявку
                            </a>
                        </div>
                    </div>
                    
                    <div class="hero-image-wrapper">
                        <div class="hero-doctor-image">
                            <img src="/assets/images/hero-doctor.svg" alt="Профессиональный врач-нарколог с медицинским оборудованием" class="hero-doctor-svg" loading="eager" />
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="services" class="services-section py-xl">
                <div class="container">
                    <h2 class="text-center mb-xl">Наши услуги</h2>
                    
                    <div class="services-grid">
                        <div class="service-card">
                            <div class="service-icon">💊</div>
                            <h3>Вывод из запоя</h3>
                            <p class="service-description">Профессиональная детоксикация организма с выездом на дом. Капельница, медикаментозная поддержка.</p>
                            <div class="service-price">
                                от 4 500 ₽
                                <div class="service-price-label">Выезд врача</div>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">🏥</div>
                            <h3>Лечение похмелья</h3>
                            <p class="service-description">Быстрое снятие симптомов похмельного синдрома. Восстановление организма за 1-2 часа.</p>
                            <div class="service-price">
                                от 3 500 ₽
                                <div class="service-price-label">Капельница на дому</div>
                            </div>
                        </div>
                        
                        <div class="service-card">
                            <div class="service-icon">🛡️</div>
                            <h3>Кодирование</h3>
                            <p class="service-description">Современные методы кодирования от алкоголизма. Медикаментозное и психотерапевтическое воздействие.</p>
                            <div class="service-price">
                                от 5 500 ₽
                                <div class="service-price-label">Консультация + процедура</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="services-swiper swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="service-card">
                                    <div class="service-icon">💊</div>
                                    <h3>Вывод из запоя</h3>
                                    <p class="service-description">Профессиональная детоксикация организма с выездом на дом. Капельница, медикаментозная поддержка.</p>
                                    <div class="service-price">
                                        от 4 500 ₽
                                        <div class="service-price-label">Выезд врача</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="swiper-slide">
                                <div class="service-card">
                                    <div class="service-icon">🏥</div>
                                    <h3>Лечение похмелья</h3>
                                    <p class="service-description">Быстрое снятие симптомов похмельного синдрома. Восстановление организма за 1-2 часа.</p>
                                    <div class="service-price">
                                        от 3 500 ₽
                                        <div class="service-price-label">Капельница на дому</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="swiper-slide">
                                <div class="service-card">
                                    <div class="service-icon">🛡️</div>
                                    <h3>Кодирование</h3>
                                    <p class="service-description">Современные методы кодирования от алкоголизма. Медикаментозное и психотерапевтическое воздействие.</p>
                                    <div class="service-price">
                                        от 5 500 ₽
                                        <div class="service-price-label">Консультация + процедура</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="services-pagination swiper-pagination"></div>
                    </div>
                </div>
            </section>
            
            <section class="alcohol-danger-section py-xl" data-alcohol-danger>
                <div class="alcohol-danger-overlay"></div>
                <div class="container alcohol-danger-content">
                    <div class="alcohol-danger-header">
                        <span class="section-eyebrow section-eyebrow--light">Почему важно действовать сегодня</span>
                        <h2>Алкоголь разрушает организм быстрее, чем кажется</h2>
                        <p>Практика показывает: чем раньше начинается лечение, тем меньше последствий для здоровья и психики. Наши врачи помогают остановить разрушительные процессы ещё до госпитализации.</p>
                    </div>
                    
                    <div class="alcohol-stats-grid">
                        <div class="alcohol-stat-card">
                            <div class="stat-number" data-countup-target="68" data-countup-suffix="%">0</div>
                            <div class="stat-label">пациентов сталкиваются с осложнениями печени уже через 3 года злоупотребления</div>
                        </div>
                        
                        <div class="alcohol-stat-card">
                            <div class="stat-number" data-countup-target="4" data-countup-suffix=" из 5">0</div>
                            <div class="stat-label">возвращаются в запой без профессиональной поддержки</div>
                        </div>
                        
                        <div class="alcohol-stat-card">
                            <div class="stat-number" data-countup-target="2300" data-countup-suffix="+">0</div>
                            <div class="stat-label">кризисов сняла наша выездная служба за прошлый год</div>
                        </div>
                    </div>
                    
                    <a href="#cta-form" class="btn btn-accent alcohol-danger-cta">Получить план детоксикации</a>
                    
                    <div class="alcohol-video-container" data-video-src="https://www.youtube.com/embed/4-5MQf-0X6s" data-video-title="Как алкоголь влияет на организм">
                        <button type="button" class="alcohol-video-placeholder" aria-label="Смотреть видео о последствиях алкоголя">
                            <span class="play-icon" aria-hidden="true">▶</span>
                            <span class="play-text">Смотреть видео с доктором</span>
                        </button>
                        <p class="alcohol-video-note">Видео откроется во встроенном плеере с субтитрами.</p>
                    </div>
                </div>
            </section>
            
            <section id="cta-form" class="cta-form-section py-xl">
                <div class="container">
                    <div class="cta-gradient-card">
                        <h2 class="text-center">Получите бесплатную консультацию</h2>
                        <p class="text-center text-light mb-lg">Оставьте заявку и наш специалист свяжется с вами в течение 5 минут</p>
                        <div class="countdown-timer" id="inactivityCountdown" aria-live="polite"></div>
                        <form id="ctaForm" class="cta-form" novalidate>
                            <input type="hidden" name="utm_source" id="utm_source">
                            <input type="hidden" name="utm_medium" id="utm_medium">
                            <input type="hidden" name="utm_campaign" id="utm_campaign">
                            <input type="hidden" name="utm_content" id="utm_content">
                            <input type="hidden" name="utm_term" id="utm_term">
                            
                            <div class="form-group">
                                <label for="name">Ваше имя *</label>
                                <input type="text" id="name" name="name" class="form-input" placeholder="Иван" required>
                                <span class="form-error" data-error-for="name"></span>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Телефон *</label>
                                <input type="tel" id="phone" name="phone" class="form-input" placeholder="+7 (___) ___-__-__" required>
                                <span class="form-error" data-error-for="phone"></span>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-vibrate" id="ctaSubmit">
                                <span class="btn-text">Отправить заявку</span>
                            </button>
                            
                            <p class="form-disclaimer text-small text-center">
                                Нажимая кнопку, вы соглашаетесь с <a href="#privacy">политикой конфиденциальности</a>
                            </p>
                        </form>
                    </div>
                </div>
            </section>
            
            <section id="how-we-work" class="process-section py-xl bg-secondary">
                <div class="container">
                    <h2 class="text-center mb-xl">Как мы работаем</h2>
                    <div class="process-timeline">
                        <div class="process-line" id="processLine"></div>
                        <div class="process-steps">
                            <div class="process-step" data-step="1">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h3>Звонок или заявка</h3>
                                    <p>Вы оставляете заявку на сайте или звоните нам. Консультация бесплатная и полностью конфиденциальная.</p>
                                </div>
                            </div>
                            <div class="process-step" data-step="2">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h3>Выезд специалиста</h3>
                                    <p>Врач-нарколог приезжает по указанному адресу в течение 30-60 минут. Анонимность гарантируется.</p>
                                </div>
                            </div>
                            <div class="process-step" data-step="3">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h3>Оказание помощи</h3>
                                    <p>Проводим необходимые процедуры: детоксикация, капельница, медикаментозная поддержка.</p>
                                </div>
                            </div>
                            <div class="process-step" data-step="4">
                                <div class="step-number">4</div>
                                <div class="step-content">
                                    <h3>Контроль состояния</h3>
                                    <p>Наблюдаем за состоянием пациента, даём рекомендации по дальнейшему лечению и реабилитации.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="anonymity" class="anonymity-section py-xl">
                <div class="anonymity-overlay"></div>
                <div class="container">
                    <div class="anonymity-content">
                        <div class="anonymity-emblem">
                            <svg class="emblem-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2" class="glow-circle"/>
                                <path d="M50 10 L65 30 L50 25 L35 30 Z M30 35 L30 60 C30 75 50 85 50 85 C50 85 70 75 70 60 L70 35 L50 30 L30 35 Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h2>Гарантия анонимности</h2>
                        <div class="anonymity-text">
                            <p class="lead">Мы строго соблюдаем врачебную тайну и гарантируем полную конфиденциальность.</p>
                            <ul class="anonymity-list">
                                <li>Никаких записей в медицинских картах</li>
                                <li>Конфиденциальность данных защищена законом</li>
                                <li>Врачи выезжают на обычном транспорте</li>
                                <li>Полная анонимность всех процедур</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="how-we-help" class="how-we-help-section py-xl">
                <div class="container">
                    <h2 class="text-center mb-xl">Как мы помогаем</h2>
                    <div class="help-cards">
                        <div class="help-card fade-up" data-delay="0">
                            <div class="help-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 17H7A5 5 0 0 1 7 7h2"></path>
                                    <path d="M15 7h2a5 5 0 1 1 0 10h-2"></path>
                                    <line x1="8" y1="12" x2="16" y2="12"></line>
                                </svg>
                            </div>
                            <h3>Быстрый выезд</h3>
                            <p>Врач приедет к вам в течение 30-60 минут в любое время суток</p>
                        </div>
                        <div class="help-card fade-up" data-delay="100">
                            <div class="help-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <h3>Капельницы</h3>
                            <p>Профессиональная детоксикация и выведение из запоя на дому</p>
                        </div>
                        <div class="help-card fade-up" data-delay="200">
                            <div class="help-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                </svg>
                            </div>
                            <h3>Качественные лекарства</h3>
                            <p>Используем только сертифицированные препараты</p>
                        </div>
                        <div class="help-card fade-up" data-delay="300">
                            <div class="help-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <h3>24/7 Поддержка</h3>
                            <p>Круглосуточная консультация и помощь в любое время</p>
                        </div>
                    </div>
                    <div class="text-center mt-lg">
                        <button class="btn btn-accent btn-lg" data-open-modal="help">Получить помощь</button>
                    </div>
                </div>
            </section>
            
            <section id="reviews" class="reviews-section py-xl bg-secondary">
                <div class="container">
                    <h2 class="text-center mb-xl">Отзывы наших пациентов</h2>
                    <div class="city-filters" role="tablist" aria-label="Фильтр по городам">
                        <button class="city-filter active" role="tab" aria-selected="true" data-city="Все">Все города</button>
                        <button class="city-filter" role="tab" aria-selected="false" data-city="Москва">Москва</button>
                        <button class="city-filter" role="tab" aria-selected="false" data-city="СПБ">Санкт-Петербург</button>
                        <button class="city-filter" role="tab" aria-selected="false" data-city="Казань">Казань</button>
                    </div>
                    <div class="reviews-slider" aria-label="Отзывы пациентов">
                        <div class="reviews-slides"></div>
                        <button class="slider-nav slider-prev" aria-label="Предыдущий отзыв">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="slider-nav slider-next" aria-label="Следующий отзыв">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div class="slider-dots" role="tablist" aria-label="Выбор отзыва"></div>
                    </div>
                </div>
            </section>
            
            <section id="trust" class="trust-section py-xl">
                <div class="container">
                    <h2 class="text-center mb-xl">Почему нам доверяют</h2>
                    <div class="trust-grid">
                        <div class="trust-card fade-up" data-delay="0">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h3>30 минут</h3>
                            <p>Среднее время приезда врача</p>
                        </div>
                        <div class="trust-card fade-up" data-delay="100">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h3>Анонимность</h3>
                            <p>100% конфиденциальность</p>
                        </div>
                        <div class="trust-card fade-up" data-delay="200">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <h3>Сертификаты</h3>
                            <p>Лицензированные специалисты</p>
                        </div>
                        <div class="trust-card fade-up" data-delay="300">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </div>
                            <h3>Доступные цены</h3>
                            <p>Прозрачное ценообразование</p>
                        </div>
                        <div class="trust-card fade-up" data-delay="400">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>Опыт врачей</h3>
                            <p>Более 10 лет практики</p>
                        </div>
                        <div class="trust-card fade-up" data-delay="500">
                            <div class="trust-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                            </div>
                            <h3>Поддержка 24/7</h3>
                            <p>Всегда на связи</p>
                        </div>
                    </div>
                    <div class="trust-credentials">
                        <div class="credential-item fade-up" data-delay="0">
                            <div class="credential-badge">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="10" y="20" width="80" height="60" rx="5" fill="none" stroke="currentColor" stroke-width="3"/>
                                    <path d="M30 40 L45 55 L70 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    <text x="50" y="75" font-size="8" text-anchor="middle" fill="currentColor">ЛО-77-01-123456</text>
                                </svg>
                            </div>
                            <p>Лицензия Минздрава</p>
                        </div>
                        <div class="credential-item fade-up" data-delay="150">
                            <div class="credential-badge qr-code">
                                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="10" y="10" width="35" height="35" fill="currentColor"/>
                                    <rect x="15" y="15" width="25" height="25" fill="none" stroke="#fff" stroke-width="2"/>
                                    <rect x="20" y="20" width="15" height="15" fill="#fff"/>
                                    <rect x="55" y="10" width="35" height="35" fill="currentColor"/>
                                    <rect x="60" y="15" width="25" height="25" fill="none" stroke="#fff" stroke-width="2"/>
                                    <rect x="65" y="20" width="15" height="15" fill="#fff"/>
                                    <rect x="10" y="55" width="35" height="35" fill="currentColor"/>
                                    <rect x="15" y="60" width="25" height="25" fill="none" stroke="#fff" stroke-width="2"/>
                                    <rect x="20" y="65" width="15" height="15" fill="#fff"/>
                                    <rect x="55" y="55" width="15" height="15" fill="currentColor"/>
                                    <rect x="75" y="55" width="15" height="15" fill="currentColor"/>
                                    <rect x="55" y="75" width="15" height="15" fill="currentColor"/>
                                    <rect x="75" y="75" width="15" height="15" fill="currentColor"/>
                                </svg>
                            </div>
                            <p>QR-код проверки</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="contacts" class="contacts-section py-xl">
                <div class="container">
                    <h2 class="text-center mb-xl">Контакты</h2>
                    <div class="contacts-grid">
                        <div class="contact-info">
                            <div class="contact-item">
                                <h3>Телефон круглосуточно</h3>
                                <a href="tel:+78005001234" class="contact-phone">+7 (800) 500-12-34</a>
                                <p class="text-small text-light">Звонок бесплатный по всей России</p>
                            </div>
                            
                            <div class="contact-item">
                                <h3>Мессенджеры</h3>
                                <div class="messenger-buttons">
                                    <a href="https://wa.me/78005001234" class="btn-messenger btn-whatsapp" target="_blank" rel="noopener">
                                        <svg viewBox="0 0 24 24" class="messenger-icon">
                                            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                        </svg>
                                        WhatsApp
                                    </a>
                                    <a href="https://t.me/78005001234" class="btn-messenger btn-telegram" target="_blank" rel="noopener">
                                        <svg viewBox="0 0 24 24" class="messenger-icon">
                                            <path fill="currentColor" d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                                        </svg>
                                        Telegram
                                    </a>
                                </div>
                            </div>
                            
                            <div class="contact-item">
                                <h3>Адрес</h3>
                                <address class="contact-address">
                                    г. Москва, ул. Примерная, д. 123
                                </address>
                                <a href="geo:55.7558,37.6173?q=Наркологическая служба" class="btn btn-outline btn-small">
                                    📍 Открыть в навигаторе
                                </a>
                            </div>
                        </div>
                        
                        <div class="map-container" id="mapContainer">
                            <div class="map-placeholder">
                                <span>Загрузка карты...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h4>Наркологическая служба</h4>
                        <p>Профессиональная помощь 24/7</p>
                    </div>
                    <div class="footer-section">
                        <h4>Юридическая информация</h4>
                        <ul class="footer-links">
                            <li><a href="#privacy" id="privacyLink">Политика конфиденциальности</a></li>
                            <li>ИНН: 7701234567</li>
                            <li>Лицензия: ЛО-77-01-123456</li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Контакты</h4>
                        <a href="tel:+78005001234" class="footer-phone">+7 (800) 500-12-34</a>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="text-small">&copy; ${new Date().getFullYear()} Наркологическая служба. Все права защищены.</p>
                </div>
            </div>
        </footer>
        
        <div id="helpModal" class="modal-overlay" role="dialog" aria-modal="true" aria-hidden="true" aria-labelledby="helpModalTitle">
            <div class="modal-container">
                <button type="button" class="modal-close" data-close-modal aria-label="Закрыть форму">
                    <span aria-hidden="true">✕</span>
                </button>
                <h2 id="helpModalTitle">Получите план помощи</h2>
                <p class="modal-subtitle">Оставьте контактные данные и кратко опишите ситуацию. Мы перезвоним в течение 5 минут.</p>
                <form id="helpModalForm" class="modal-form" novalidate>
                    <div class="form-group">
                        <label for="helpName">Ваше имя *</label>
                        <input type="text" id="helpName" name="name" class="form-input" placeholder="Иван" required data-autofocus>
                        <span class="form-error" data-error-for="name"></span>
                    </div>
                    <div class="form-group">
                        <label for="helpPhone">Телефон *</label>
                        <input type="tel" id="helpPhone" name="phone" class="form-input" placeholder="+7 (___) ___-__-__" required>
                        <span class="form-error" data-error-for="phone"></span>
                    </div>
                    <div class="form-group">
                        <label for="helpComment">Комментарий</label>
                        <textarea id="helpComment" name="comment" class="form-textarea" rows="4" placeholder="Опишите ситуацию или задайте вопрос"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Отправить заявку</button>
                    <p class="form-disclaimer text-small">Мы свяжемся с вами и дадим подробную консультацию. Ваши данные защищены.</p>
                </form>
            </div>
        </div>
        
        <div id="toast" class="toast" role="alert" aria-live="polite"></div>
        <div id="popup" class="popup-overlay" style="display: none;"></div>
    `;
    
    initAnalytics();
    
    const ctaForm = document.getElementById('ctaForm');
    if (ctaForm) {
        initFormValidation(ctaForm, handleCTASubmit);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
        const value = urlParams.get(param);
        if (value) {
            const input = document.getElementById(param);
            if (input) input.value = value;
        }
    });
    
    initYandexMap('mapContainer');
    
    if (!shouldReduceMotion) {
        initScrollAnimations();
        initParallax();
    }
    
    initInactivityTimer();
    initPopup();
    initStickyButton();
    helpModalControls = initHelpModal();
    initReviewsSlider({ autoplay: !shouldReduceMotion });
    
    initServicesCarousel();
    initAlcoholStatsCountup({ reduceMotion: shouldReduceMotion });
    initHeroMotion({ reduceMotion: shouldReduceMotion });
    initAlcoholVideo();

    const helpModalForm = document.getElementById('helpModalForm');
    if (helpModalForm) {
        initFormValidation(helpModalForm, handleHelpModalSubmit);
    }

    const messengerButtons = document.querySelectorAll('.btn-messenger');
    messengerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.classList.contains('btn-whatsapp') ? 'whatsapp' : 'telegram';
            trackEvent('messenger_click', { messenger_type: type });
        });
    });

    const headerPhone = document.querySelector('.header-phone');
    if (headerPhone) {
        headerPhone.addEventListener('click', () => {
            trackEvent('phone_click', { source: 'header' });
        });
    }

    console.log('Landing page loaded successfully');
});

async function handleHelpModalSubmit(formData) {
    const submitButton = document.querySelector('#helpModalForm button[type="submit"]');
    if (!submitButton) {
        console.error('Submit button not found');
        return;
    }

    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Отправка...';

    trackEvent('form_submit', {
        form_name: 'help_modal_form',
        ...formData
    });

    try {
        let response;
        try {
            response = await fetch('/api/help-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                response = await mockApiRequest('/api/help-request', formData);
            }
        } catch (fetchError) {
            response = await mockApiRequest('/api/help-request', formData);
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        await response.json();

        showToast('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        const form = document.getElementById('helpModalForm');
        if (form) {
            form.reset();
            form.dispatchEvent(new Event('reset'));
        }

        trackEvent('form_success', {
            form_name: 'help_modal_form'
        });

        setTimeout(() => {
            if (helpModalControls && helpModalControls.close) {
                helpModalControls.close();
            }
        }, 500);
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Произошла ошибка при отправке. Пожалуйста, попробуйте позвонить нам.', 'error');

        trackEvent('form_error', {
            form_name: 'help_modal_form',
            error: error.message
        });
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }
}

async function handleCTASubmit(formData) {
    const submitButton = document.getElementById('ctaSubmit');
    const originalText = submitButton.querySelector('.btn-text').textContent;
    
    submitButton.disabled = true;
    submitButton.querySelector('.btn-text').textContent = 'Отправка...';
    
    trackEvent('form_submit', {
        form_name: 'cta_form',
        ...formData
    });
    
    try {
        let response;
        try {
            response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                response = await mockApiRequest('/api/submit-form', formData);
            }
        } catch (fetchError) {
            response = await mockApiRequest('/api/submit-form', formData);
        }
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        await response.json();
        
        showToast('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        const ctaFormElement = document.getElementById('ctaForm');
        ctaFormElement.reset();
        ctaFormElement.dispatchEvent(new Event('reset'));
        
        trackEvent('form_success', {
            form_name: 'cta_form'
        });
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast('Произошла ошибка при отправке. Пожалуйста, попробуйте позвонить нам.', 'error');
        
        trackEvent('form_error', {
            form_name: 'cta_form',
            error: error.message
        });
    } finally {
        submitButton.disabled = false;
        submitButton.querySelector('.btn-text').textContent = originalText;
    }
}

function showToast(messageOrOptions, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    const options = typeof messageOrOptions === 'string' ? {
        message: messageOrOptions,
        variant: type
    } : messageOrOptions;

    const {
        message,
        variant = 'info',
        dismissible = false,
        duration = 5000,
        storageKey,
        storage = 'session',
        onDismiss
    } = options;

    if (!message) return;

    if (storageKey) {
        const storageTarget = storage === 'local' ? localStorage : sessionStorage;
        if (storageTarget.getItem(storageKey)) {
            return;
        }
    }

    let closeButtonHtml = '';
    if (dismissible) {
        closeButtonHtml = '<button class="toast-close" aria-label="Закрыть уведомление">✕</button>';
    }

    toast.innerHTML = `<div class="toast-message">${message}</div>${closeButtonHtml}`;
    toast.className = `toast toast-${variant} toast-show`;

    let hideTimeout;
    const removeToast = () => {
        toast.classList.remove('toast-show');
        if (storageKey) {
            const storageTarget = storage === 'local' ? localStorage : sessionStorage;
            storageTarget.setItem(storageKey, 'true');
        }
        if (typeof onDismiss === 'function') {
            onDismiss();
        }
        clearTimeout(hideTimeout);
    };

    if (dismissible) {
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', removeToast, { once: true });
        }
    }

    if (duration > 0) {
        hideTimeout = setTimeout(removeToast, duration);
    }
}

window.showToast = showToast;

async function initHeroMotion({ reduceMotion } = {}) {
    const hero = document.querySelector('.hero-section');
    if (!hero) {
        return;
    }

    if (reduceMotion) {
        hero.classList.add('hero-ready');
        return;
    }

    try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
            import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js'),
            import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.min.js')
        ]);

        gsap.registerPlugin(ScrollTrigger);

        const title = hero.querySelector('h1');
        const subtitle = hero.querySelector('.hero-subtitle');
        const badges = hero.querySelectorAll('.hero-trust-badges .trust-badge');
        const buttons = hero.querySelectorAll('.hero-cta-buttons .btn');
        const imageWrapper = hero.querySelector('.hero-image-wrapper');

        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

        if (title) {
            timeline.from(title, { opacity: 0, y: 60, duration: 1 });
        }
        if (subtitle) {
            timeline.from(subtitle, { opacity: 0, y: 40, duration: 0.8 }, '-=0.6');
        }
        if (badges.length) {
            timeline.from(badges, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.12
            }, '-=0.4');
        }
        if (buttons.length) {
            timeline.from(buttons, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1
            }, '-=0.5');
        }
        if (imageWrapper) {
            timeline.from(imageWrapper, {
                opacity: 0,
                y: 80,
                duration: 1.1,
                ease: 'power3.out'
            }, '-=0.8');

            gsap.to(imageWrapper, {
                yPercent: -12,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top center',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    } catch (error) {
        console.warn('GSAP unavailable, skipping hero animation', error);
        hero.classList.add('hero-ready');
    }
}

function initAlcoholVideo() {
    const container = document.querySelector('.alcohol-video-container');
    if (!container) {
        return;
    }

    const placeholder = container.querySelector('.alcohol-video-placeholder');
    const note = container.querySelector('.alcohol-video-note');
    const src = container.dataset.videoSrc;
    const title = container.dataset.videoTitle || 'Видео о последствиях алкоголя';

    if (!placeholder || !src) {
        return;
    }

    const loadVideo = (autoplay = false) => {
        if (container.querySelector('iframe')) {
            return;
        }

        const iframe = document.createElement('iframe');
        const separator = src.includes('?') ? '&' : '?';
        iframe.src = autoplay ? `${src}${separator}autoplay=1` : src;
        iframe.loading = 'lazy';
        iframe.title = title;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.className = 'alcohol-video-frame';

        placeholder.hidden = true;
        if (note) {
            container.insertBefore(iframe, note);
        } else {
            container.appendChild(iframe);
        }
    };

    placeholder.addEventListener('click', () => loadVideo(true), { once: true });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadVideo(false);
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(container);
    } else {
        loadVideo(false);
    }
}
