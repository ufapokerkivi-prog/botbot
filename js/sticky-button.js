import { trackPhoneClick } from './analytics.js';

export function initStickyButton() {
    const button = document.createElement('a');
    button.href = 'tel:+78005001234';
    button.className = 'sticky-call-btn';
    button.setAttribute('role', 'button');
    button.setAttribute('aria-label', 'Позвонить нам');
    button.textContent = 'Позвонить';

    button.addEventListener('click', () => {
        trackPhoneClick('+78005001234');
    });

    document.body.appendChild(button);
}
