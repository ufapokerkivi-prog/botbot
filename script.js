import { initFormValidation } from './js/forms.js';
import { initAnalytics, trackEvent } from './js/analytics.js';
import { initInactivityTimer } from './js/inactivity-timer.js';
import { initPopup } from './js/popup.js';
import { initParallax } from './js/parallax.js';
import { initStickyButton } from './js/sticky-button.js';
import { initYandexMap } from './js/yandex-map.js';
import { initScrollAnimations } from './js/scroll-animations.js';
import { mockApiRequest } from './js/mock-api.js';

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
            <section class="hero-section py-xl">
                <div class="container">
                    <h1>Профессиональная помощь 24/7</h1>
                    <p class="hero-subtitle">Анонимно. Конфиденциально. Быстро.</p>
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
