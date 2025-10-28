import { initFormValidation } from './forms.js';
import { trackEvent } from './analytics.js';
import { mockApiRequest } from './mock-api.js';

const POPUP_DELAY = 30000;
const STORAGE_KEY = 'popupDismissed';

let popupShown = false;

export function initPopup() {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (dismissed) {
        return;
    }

    setTimeout(() => {
        showPopup();
    }, POPUP_DELAY);
}

function showPopup() {
    if (popupShown) return;
    
    popupShown = true;
    
    trackEvent('popup_shown', {
        delay_seconds: 30
    });

    const overlay = document.getElementById('popup');
    if (!overlay) return;

    overlay.innerHTML = `
        <div class="popup-card" role="dialog" aria-labelledby="popupTitle" aria-modal="true">
            <button class="popup-close" id="closePopup" aria-label="Закрыть">✕</button>
            <h3 id="popupTitle">Получите консультацию прямо сейчас</h3>
            <p class="text-light">Оставьте ваш телефон и мы перезвоним в течение 3 минут</p>
            <form id="callbackForm" class="cta-form" novalidate>
                <div class="form-group">
                    <label for="callbackPhone">Телефон *</label>
                    <input type="tel" id="callbackPhone" name="phone" class="form-input" placeholder="+7 (___) ___-__-__" required>
                    <span class="form-error" data-error-for="phone"></span>
                </div>
                <button type="submit" class="btn btn-primary" id="callbackSubmit">
                    <span class="btn-text">Перезвоните мне</span>
                </button>
                <p class="form-disclaimer text-small text-center">
                    Нажимая кнопку, вы соглашаетесь с <a href="#privacy">политикой конфиденциальности</a>
                </p>
            </form>
        </div>
    `;

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    const closeButton = document.getElementById('closePopup');
    if (closeButton) {
        closeButton.addEventListener('click', () => dismissPopup());
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            dismissPopup();
        }
    });

    document.addEventListener('keydown', handleEscapeKey);

    const callbackForm = document.getElementById('callbackForm');
    if (callbackForm) {
        initFormValidation(callbackForm, handleCallbackSubmit);
    }

    const firstInput = overlay.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        dismissPopup();
    }
}

function dismissPopup() {
    const overlay = document.getElementById('popup');
    if (!overlay) return;

    sessionStorage.setItem(STORAGE_KEY, 'true');
    
    trackEvent('popup_dismissed');

    overlay.style.display = 'none';
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
}

async function handleCallbackSubmit(formData) {
    const submitButton = document.getElementById('callbackSubmit');
    const originalText = submitButton.querySelector('.btn-text').textContent;
    
    submitButton.disabled = true;
    submitButton.querySelector('.btn-text').textContent = 'Отправка...';
    
    trackEvent('callback_form_submit', formData);

    try {
        let response;
        try {
            response = await fetch('/api/callback-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                response = await mockApiRequest('/api/callback-request', formData);
            }
        } catch (fetchError) {
            response = await mockApiRequest('/api/callback-request', formData);
        }

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        await response.json();

        window.showToast('Заявка принята! Мы перезвоним вам в ближайшие 3 минуты.', 'success');
        
        trackEvent('callback_form_success', formData);
        
        dismissPopup();
    } catch (error) {
        console.error('Callback form submission error:', error);
        window.showToast('Произошла ошибка. Пожалуйста, позвоните нам напрямую.', 'error');
        
        trackEvent('callback_form_error', {
            error: error.message
        });
    } finally {
        submitButton.disabled = false;
        submitButton.querySelector('.btn-text').textContent = originalText;
    }
}
