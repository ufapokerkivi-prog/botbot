import { z } from './zod.js';

const formSchemas = {
    cta: z.object({
        name: z.string()
            .min(2, 'Имя должно содержать минимум 2 символа')
            .max(50, 'Имя слишком длинное'),
        phone: z.string()
            .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный телефон')
    }),
    callback: z.object({
        phone: z.string()
            .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите корректный телефон')
    })
};

export function initFormValidation(form, onSubmit) {
    const formType = form.id.includes('callback') ? 'callback' : 'cta';
    const schema = formSchemas[formType];
    
    const phoneInput = form.querySelector('input[type="tel"]');
    if (phoneInput) {
        initPhoneMask(phoneInput);
    }
    
    form.addEventListener('input', (e) => {
        if (e.target.matches('input[required]')) {
            clearError(e.target);
        }
    });
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const errors = validateForm(data, schema);
        
        if (errors.length > 0) {
            displayErrors(form, errors);
            return;
        }
        
        await onSubmit(data);
    });
    
    form.addEventListener('reset', () => {
        setTimeout(() => {
            clearAllErrors(form);
            checkFormValidity(form);
        }, 0);
    });
    
    checkFormValidity(form);
    form.addEventListener('input', () => checkFormValidity(form));
}

function initPhoneMask(input) {
    input.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '+7 (';
        }
    });
    
    input.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (!value.startsWith('7')) {
            value = '7' + value;
        }
        
        value = value.substring(0, 11);
        
        let formatted = '+7';
        
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
        }
        if (value.length >= 4) {
            formatted += ') ' + value.substring(4, 7);
        }
        if (value.length >= 7) {
            formatted += '-' + value.substring(7, 9);
        }
        if (value.length >= 9) {
            formatted += '-' + value.substring(9, 11);
        }
        
        this.value = formatted;
    });
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length <= 4) {
            e.preventDefault();
            this.value = '+7 (';
        }
    });
}

function validateForm(data, schema) {
    const errors = [];
    
    try {
        schema.parse(data);
    } catch (error) {
        if (error.errors) {
            error.errors.forEach(err => {
                errors.push({
                    field: err.path[0],
                    message: err.message
                });
            });
        }
    }
    
    return errors;
}

function displayErrors(form, errors) {
    clearAllErrors(form);
    
    errors.forEach(error => {
        const input = form.querySelector(`[name="${error.field}"]`);
        if (input) {
            showError(input, error.message);
        }
    });
}

function showError(input, message) {
    const errorSpan = input.parentElement.querySelector(`[data-error-for="${input.name}"]`);
    if (errorSpan) {
        errorSpan.textContent = message;
        input.classList.add('input-error');
    }
}

function clearError(input) {
    const errorSpan = input.parentElement.querySelector(`[data-error-for="${input.name}"]`);
    if (errorSpan) {
        errorSpan.textContent = '';
        input.classList.remove('input-error');
    }
}

function clearAllErrors(form) {
    const errorSpans = form.querySelectorAll('.form-error');
    errorSpans.forEach(span => span.textContent = '');
    
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => input.classList.remove('input-error'));
}

function checkFormValidity(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    const requiredInputs = form.querySelectorAll('input[required]');
    const allFilled = Array.from(requiredInputs).every(input => {
        if (input.type === 'tel') {
            return input.value.replace(/\D/g, '').length === 11;
        }
        return input.value.trim().length >= 2;
    });
    
    submitButton.disabled = !allFilled;
}
