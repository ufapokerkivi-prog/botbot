export function initAnalytics() {
    window.dataLayer = window.dataLayer || [];
    
    console.log('Analytics initialized');
    
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

export function trackEvent(eventName, eventData = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventData);
    }
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...eventData,
        timestamp: new Date().toISOString()
    });
    
    console.log('Analytics event:', eventName, eventData);
}

export function trackFormInteraction(formName, fieldName) {
    trackEvent('form_interaction', {
        form_name: formName,
        field_name: fieldName
    });
}

export function trackPhoneClick(phoneNumber) {
    trackEvent('phone_click', {
        phone_number: phoneNumber,
        click_location: 'sticky_button'
    });
}

export function trackMessengerClick(messenger) {
    trackEvent('messenger_click', {
        messenger_type: messenger
    });
}
