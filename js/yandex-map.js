let mapLoaded = false;

export function initYandexMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Map container not found');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !mapLoaded) {
                loadYandexMap(containerId);
                observer.disconnect();
            }
        });
    }, {
        rootMargin: '100px'
    });

    observer.observe(container);
}

function loadYandexMap(containerId) {
    if (mapLoaded) return;
    
    mapLoaded = true;
    
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scriptId = 'yandex-maps-script';
    if (document.getElementById(scriptId)) {
        initializeMap(containerId);
        return;
    }
    
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    
    script.onload = () => {
        ymaps.ready(() => initializeMap(containerId));
    };
    
    script.onerror = () => {
        console.error('Failed to load Yandex Maps');
        showMapFallback(containerId);
    };
    
    document.head.appendChild(script);
}

function initializeMap(containerId) {
    try {
        const map = new ymaps.Map(containerId, {
            center: [55.7558, 37.6173],
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl']
        });
        
        const placemark = new ymaps.Placemark([55.7558, 37.6173], {
            balloonContent: '<strong>Наркологическая служба</strong><br>г. Москва, ул. Примерная, д. 123',
            hintContent: 'Наша клиника'
        }, {
            preset: 'islands#medicalIcon',
            iconColor: '#00C8B3'
        });
        
        map.geoObjects.add(placemark);
        
        const placeholder = document.querySelector(`#${containerId} .map-placeholder`);
        if (placeholder) {
            placeholder.style.display = 'none';
        }
    } catch (error) {
        console.error('Error initializing Yandex Map:', error);
        showMapFallback(containerId);
    }
}

function showMapFallback(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `
        <div class="map-fallback">
            <img src="/assets/images/map-fallback.svg" alt="Карта с расположением клиники" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
    `;
}
