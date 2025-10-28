let servicesSwiper = null;
let modulesPromise = null;

const MOBILE_BREAKPOINT = 1024;

async function loadSwiper() {
    if (!modulesPromise) {
        modulesPromise = import('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs');
    }
    return modulesPromise;
}

function destroySwiper(container) {
    if (servicesSwiper) {
        servicesSwiper.destroy(true, true);
        servicesSwiper = null;
        container.classList.remove('is-carousel');
    }
}

export function initServicesCarousel() {
    const container = document.querySelector('.services-swiper');
    if (!container) {
        return;
    }

    const paginationEl = container.querySelector('.services-pagination');

    const handleSetup = async () => {
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            if (!servicesSwiper) {
                const { default: Swiper } = await loadSwiper();
                servicesSwiper = new Swiper(container, {
                    slidesPerView: 1.08,
                    spaceBetween: 16,
                    speed: 550,
                    resistanceRatio: 0.85,
                    touchEventsTarget: 'container',
                    pagination: paginationEl ? {
                        el: paginationEl,
                        clickable: true
                    } : undefined,
                    breakpoints: {
                        480: {
                            slidesPerView: 1.3
                        },
                        640: {
                            slidesPerView: 1.6
                        },
                        860: {
                            slidesPerView: 2.2,
                            spaceBetween: 20
                        }
                    }
                });
                container.classList.add('is-carousel');
            }
        } else if (servicesSwiper) {
            destroySwiper(container);
        }
    };

    handleSetup();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleSetup();
        }, 200);
    });
}
