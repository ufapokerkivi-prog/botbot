import { trackEvent } from './analytics.js';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000;
const STORAGE_KEY = 'inactivityToastDismissed';
const SECOND = 1000;

let countdownInterval;
let toastShown = false;
let dismissed = sessionStorage.getItem(STORAGE_KEY) === 'true';
let timeLeft = INACTIVITY_TIMEOUT;
let activeToast;

export function initInactivityTimer() {
    updateCountdownDisplay();
    startCountdown();

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
        document.addEventListener(event, handleInteraction, { passive: true });
    });
}

function handleInteraction() {
    timeLeft = INACTIVITY_TIMEOUT;
    if (!dismissed) {
        toastShown = false;
    }
    startCountdown();
}

function startCountdown() {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            showInactivityToast();
            return;
        }

        timeLeft -= SECOND;
        updateCountdownDisplay();
    }, SECOND);

    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    const countdownElement = document.getElementById('inactivityCountdown');
    if (!countdownElement) return;

    const remaining = formatTime(timeLeft);
    countdownElement.textContent = `Внимание: Акция действует еще ${remaining}`;
}

function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function showInactivityToast() {
    if (toastShown || dismissed) {
        timeLeft = INACTIVITY_TIMEOUT;
        startCountdown();
        return;
    }

    toastShown = true;
    timeLeft = INACTIVITY_TIMEOUT;

    trackEvent('inactivity_toast_shown', {
        timeout_minutes: 15
    });

    const toastHtml = `
        <div class="inactivity-toast">
            <div class="toast-content">
                <strong>Нужна помощь?</strong>
                <p>Мы всегда на связи - позвоните прямо сейчас!</p>
            </div>
            <div class="toast-actions">
                <a href="tel:+78005001234" class="toast-btn toast-btn-primary">
                    Позвонить
                </a>
                <button class="toast-btn toast-btn-secondary" id="dismissInactivityToast">
                    Закрыть
                </button>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'toast toast-inactivity toast-show';
    wrapper.setAttribute('role', 'alert');
    wrapper.setAttribute('aria-live', 'assertive');
    wrapper.innerHTML = toastHtml;
    wrapper.style.minWidth = '300px';
    wrapper.style.maxWidth = '400px';
    wrapper.style.left = '1.5rem';
    wrapper.style.right = 'auto';

    activeToast = wrapper;

    document.body.appendChild(wrapper);

    const dismissButton = wrapper.querySelector('#dismissInactivityToast');
    if (dismissButton) {
        dismissButton.addEventListener('click', () => {
            dismissInactivityToast(wrapper);
        });
    }

    wrapper.querySelector('a[href^="tel:"]')?.addEventListener('click', () => {
        trackEvent('inactivity_toast_call_clicked');
    });

    startCountdown();
}

function dismissInactivityToast(toastElement) {
    sessionStorage.setItem(STORAGE_KEY, 'true');
    dismissed = true;

    trackEvent('inactivity_toast_dismissed');

    toastElement.classList.remove('toast-show');
    setTimeout(() => {
        if (toastElement.parentNode) {
            toastElement.parentNode.removeChild(toastElement);
        }
        activeToast = null;
    }, 300);
}
