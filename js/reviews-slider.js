export const reviewsData = [
    {
        name: "Алексей М.",
        city: "Москва",
        rating: 5,
        text: "Обратился в экстренной ситуации, врач приехал через 25 минут. Профессиональная помощь, деликатное отношение. Спасибо за оперативность и качество!"
    },
    {
        name: "Мария В.",
        city: "СПБ",
        rating: 5,
        text: "Очень благодарна специалистам клиники. Помогли моему близкому человеку в трудную минуту. Полная конфиденциальность, внимательное отношение."
    },
    {
        name: "Дмитрий К.",
        city: "Москва",
        rating: 5,
        text: "Вызвал врача на дом, все прошло быстро и профессионально. Доктор объяснил дальнейший план действий, дал полезные рекомендации."
    },
    {
        name: "Елена П.",
        city: "Казань",
        rating: 5,
        text: "Спасибо за помощь и поддержку! Врачи очень грамотные, анонимность соблюдена полностью. Рекомендую всем, кто нуждается в такой помощи."
    },
    {
        name: "Игорь С.",
        city: "СПБ",
        rating: 5,
        text: "Отличная служба! Вежливые операторы, быстрый выезд, качественная медицинская помощь. Цены адекватные, никаких скрытых платежей."
    },
    {
        name: "Ольга Н.",
        city: "Москва",
        rating: 5,
        text: "Помогли в самый трудный момент. Врач приехал очень быстро, провел все необходимые процедуры. Огромное спасибо за профессионализм!"
    },
    {
        name: "Сергей Л.",
        city: "Казань",
        rating: 5,
        text: "Впервые обращались за такой помощью. Все прошло на высшем уровне. Врач вежливый, компетентный, все объяснил и помог."
    },
    {
        name: "Татьяна Р.",
        city: "СПБ",
        rating: 5,
        text: "Благодарю за оперативность и качественное обслуживание. Врачи действительно знают свое дело, помогли быстро и эффективно."
    },
    {
        name: "Андрей Г.",
        city: "Москва",
        rating: 5,
        text: "Очень доволен работой специалистов. Приехали быстро, все сделали профессионально. Анонимность гарантирована на 100%."
    },
    {
        name: "Наталья Ф.",
        city: "Казань",
        rating: 5,
        text: "Спасибо огромное за помощь! Врач приехал быстро, был очень внимателен и профессионален. Рекомендую эту службу!"
    }
];

export function initReviewsSlider(options = {}) {
    const {
        autoplay = true,
        interval = 5000
    } = options;

    const sliderContainer = document.querySelector('.reviews-slider');
    const slidesWrapper = document.querySelector('.reviews-slides');
    const cityFilters = document.querySelectorAll('.city-filter');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!sliderContainer || !slidesWrapper) {
        return null;
    }

    const slidesId = 'reviewsSlides';
    slidesWrapper.id = slidesId;
    slidesWrapper.setAttribute('role', 'list');
    sliderContainer.setAttribute('role', 'region');
    sliderContainer.setAttribute('aria-roledescription', 'carousel');
    sliderContainer.setAttribute('aria-live', autoplay ? 'polite' : 'off');
    sliderContainer.setAttribute('aria-atomic', 'false');

    cityFilters.forEach(filter => {
        filter.setAttribute('aria-controls', slidesId);
    });

    let currentIndex = 0;
    let autoplayInterval = null;
    let filteredReviews = [...reviewsData];
    let currentFilter = 'Все';
    let isPaused = false;

    function updateFilterButtons(activeCity) {
        cityFilters.forEach(filter => {
            const isActive = filter.dataset.city === activeCity;
            filter.classList.toggle('active', isActive);
            filter.setAttribute('aria-selected', isActive ? 'true' : 'false');
            filter.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    function renderSlides() {
        slidesWrapper.innerHTML = filteredReviews.map((review, index) => `
            <article class="review-slide" data-index="${index}" role="group" aria-roledescription="slide" aria-label="Отзыв ${index + 1} из ${filteredReviews.length}" data-city="${review.city}">
                <div class="review-card">
                    <div class="review-header">
                        <div class="review-author">
                            <h4 class="review-name">${review.name}</h4>
                            <p class="review-city">${review.city}</p>
                        </div>
                        <div class="review-rating" aria-label="Рейтинг ${review.rating} из 5">
                            ${'★'.repeat(review.rating)}
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                </div>
            </article>
        `).join('');
    }

    function updateDots() {
        if (!dotsContainer) {
            return;
        }

        dotsContainer.innerHTML = filteredReviews.map((_, index) => `
            <button
                class="slider-dot${index === currentIndex ? ' active' : ''}"
                role="tab"
                aria-label="Перейти к отзыву ${index + 1}"
                aria-selected="${index === currentIndex}"
                data-index="${index}"
                tabindex="${index === currentIndex ? '0' : '-1'}"
            ></button>
        `).join('');

        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = Number(dot.dataset.index);
                updateSlider();
                resetAutoplay();
            });
        });
    }

    function updateSlider() {
        const slides = slidesWrapper.querySelectorAll('.review-slide');
        const hasMultiple = filteredReviews.length > 1;

        slides.forEach((slide, index) => {
            const offset = (index - currentIndex) * 100;
            const isActive = index === currentIndex;
            slide.style.transform = `translateX(${offset}%)`;
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.pointerEvents = isActive ? 'auto' : 'none';
            slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            slide.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        sliderContainer.setAttribute('aria-label', `Отзывы пациентов, отзыв ${currentIndex + 1} из ${filteredReviews.length}${currentFilter !== 'Все' ? `, город ${currentFilter}` : ''}`);

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                const isActive = index === currentIndex;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
                dot.setAttribute('tabindex', isActive ? '0' : '-1');
            });
        }

        if (prevBtn) {
            prevBtn.disabled = !hasMultiple;
            prevBtn.setAttribute('aria-disabled', (!hasMultiple).toString());
        }

        if (nextBtn) {
            nextBtn.disabled = !hasMultiple;
            nextBtn.setAttribute('aria-disabled', (!hasMultiple).toString());
        }
    }

    function nextSlide() {
        if (!filteredReviews.length) {
            return;
        }
        currentIndex = (currentIndex + 1) % filteredReviews.length;
        updateSlider();
    }

    function prevSlide() {
        if (!filteredReviews.length) {
            return;
        }
        currentIndex = (currentIndex - 1 + filteredReviews.length) % filteredReviews.length;
        updateSlider();
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function startAutoplay() {
        if (!autoplay || isPaused || filteredReviews.length <= 1) {
            stopAutoplay();
            return;
        }

        stopAutoplay();
        autoplayInterval = setInterval(() => {
            nextSlide();
        }, interval);
    }

    function resetAutoplay() {
        if (!autoplay) {
            return;
        }
        stopAutoplay();
        if (!isPaused) {
            startAutoplay();
        }
    }

    function setPaused(paused) {
        if (!autoplay) {
            return;
        }
        isPaused = paused;
        if (paused) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }

    function filterReviews(city) {
        currentFilter = city;
        filteredReviews = city === 'Все'
            ? [...reviewsData]
            : reviewsData.filter(review => review.city === city);
        currentIndex = 0;
        renderSlides();
        updateDots();
        updateSlider();
        resetAutoplay();
    }

    cityFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const city = filter.dataset.city;
            updateFilterButtons(city);
            filterReviews(city);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    if (autoplay) {
        sliderContainer.addEventListener('mouseenter', () => setPaused(true));
        sliderContainer.addEventListener('mouseleave', () => setPaused(false));

        sliderContainer.addEventListener('focusin', () => setPaused(true));
        sliderContainer.addEventListener('focusout', (event) => {
            if (!sliderContainer.contains(event.relatedTarget)) {
                setPaused(false);
            }
        });
    }

    let touchStartX = 0;
    let touchEndX = 0;

    slidesWrapper.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    slidesWrapper.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoplay();
        }
    }

    updateFilterButtons(currentFilter);
    renderSlides();
    updateDots();
    updateSlider();
    startAutoplay();

    return {
        filterReviews,
        next: nextSlide,
        prev: prevSlide,
        destroy: () => {
            stopAutoplay();
        }
    };
}
