export function initHelpModal() {
    const overlay = document.getElementById('helpModal');
    if (!overlay) {
        return null;
    }

    const openButtons = document.querySelectorAll('[data-open-modal="help"]');
    const closeButton = overlay.querySelector('[data-close-modal]');
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    let previouslyFocusedElement = null;
    let focusableElements = [];
    let firstFocusableElement = null;
    let lastFocusableElement = null;
    let isOpen = false;

    function setAriaHidden(isHidden) {
        overlay.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
    }

    function updateFocusableElements() {
        focusableElements = Array.from(overlay.querySelectorAll(focusableSelector))
            .filter(element => element.offsetParent !== null || element === document.activeElement);
        firstFocusableElement = focusableElements[0] || null;
        lastFocusableElement = focusableElements[focusableElements.length - 1] || null;
    }

    function focusInitialElement() {
        updateFocusableElements();
        const primaryField = overlay.querySelector('[data-autofocus], input, textarea, button');
        if (primaryField && typeof primaryField.focus === 'function') {
            primaryField.focus();
            return;
        }
        if (firstFocusableElement && typeof firstFocusableElement.focus === 'function') {
            firstFocusableElement.focus();
        }
    }

    function handleKeydown(event) {
        if (!isOpen) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            close();
            return;
        }

        if (event.key === 'Tab') {
            updateFocusableElements();
            if (!focusableElements.length) {
                event.preventDefault();
                overlay.focus();
                return;
            }

            const currentFocused = document.activeElement;
            if (event.shiftKey) {
                if (currentFocused === firstFocusableElement || currentFocused === overlay) {
                    event.preventDefault();
                    (lastFocusableElement || firstFocusableElement).focus();
                }
            } else if (currentFocused === lastFocusableElement) {
                event.preventDefault();
                (firstFocusableElement || lastFocusableElement).focus();
            }
        }
    }

    function open() {
        if (isOpen) {
            return;
        }

        previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        isOpen = true;
        setAriaHidden(false);
        overlay.classList.add('modal-active');
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            focusInitialElement();
        });

        document.addEventListener('keydown', handleKeydown);
    }

    function close() {
        if (!isOpen) {
            return;
        }

        isOpen = false;
        overlay.classList.remove('modal-active');
        setAriaHidden(true);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeydown);

        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            previouslyFocusedElement.focus();
        }
    }

    openButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            open();
        });
    });

    closeButton?.addEventListener('click', () => {
        close();
    });

    overlay.addEventListener('mousedown', (event) => {
        if (event.target === overlay) {
            close();
        }
    });

    overlay.addEventListener('transitionend', (event) => {
        if (event.propertyName === 'opacity' && !overlay.classList.contains('modal-active')) {
            overlay.scrollTop = 0;
        }
    });

    setAriaHidden(true);
    overlay.setAttribute('tabindex', '-1');

    return {
        open,
        close
    };
}
