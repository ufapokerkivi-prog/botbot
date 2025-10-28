"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'swiper/css';

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(() => import('swiper/react').then((mod) => mod.SwiperSlide), {
  ssr: false,
});

type Review = {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  category: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: 'Анна П.',
    rating: 5,
    date: '2024-10-15',
    text: 'Огромная благодарность за помощь. Врач приехал очень быстро, все сделал профессионально и деликатно. Спасибо!',
    category: 'Выезд на дом',
  },
  {
    id: 2,
    name: 'Дмитрий К.',
    rating: 5,
    date: '2024-10-08',
    text: 'Проходил курс реабилитации. Очень доволен результатом. Профессиональные психологи, комфортные условия.',
    category: 'Реабилитация',
  },
  {
    id: 3,
    name: 'Елена М.',
    rating: 4,
    date: '2024-09-28',
    text: 'Помогли родственнику справиться с запоем. Быстро, эффективно. Рекомендую.',
    category: 'Вывод из запоя',
  },
  {
    id: 4,
    name: 'Игорь С.',
    rating: 5,
    date: '2024-09-20',
    text: 'Отличная клиника! Кодирование прошло успешно, поддержка на высшем уровне. Уже 6 месяцев трезвости!',
    category: 'Кодирование',
  },
];

export default function ReviewsSection() {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter((r) => r.category === filter);

  const categories = ['all', ...Array.from(new Set(reviews.map(r => r.category)))];

  return (
    <section id="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-intro__eyebrow">Отзывы</span>
          <h2 className="section-intro__title" id="reviews-heading">
            Что говорят наши пациенты
          </h2>
        </div>
        <div className="reviews">
          <div aria-hidden="false" style={{ marginBottom: '1.5rem' }}>
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {reviews.slice(0, 3).map((review) => (
                <SwiperSlide key={`featured-${review.id}`}>
                  <article className="review-card" role="group" aria-label={`Отзыв ${review.name}`}>
                    <div className="review-card__header">
                      <div>
                        <strong>{review.name}</strong>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                          {review.category}
                        </p>
                      </div>
                      <div className="review-card__rating" aria-label={`Оценка: ${review.rating} из 5`}>
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} aria-hidden="true">★</span>
                        ))}
                      </div>
                    </div>
                    <p>{review.text}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="reviews__controls">
            <div className="reviews__filter">
              <label htmlFor="review-filter" className="visually-hidden">
                Фильтр отзывов по категории
              </label>
              <select 
                id="review-filter"
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Выберите категорию отзывов"
                data-testid="reviews-filter"
              >
                <option value="all">Все категории</option>
                {categories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <p aria-live="polite" className="text-light" data-testid="reviews-count">
              Показано отзывов: {filteredReviews.length}
            </p>
          </div>
          <div className="reviews-list" role="list">
            {filteredReviews.map((review) => (
              <article className="review-card" key={review.id} role="listitem">
                <div className="review-card__header">
                  <div>
                    <strong>{review.name}</strong>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                      <time dateTime={review.date}>
                        {new Date(review.date).toLocaleDateString('ru-RU')}
                      </time>
                      {' · '}
                      {review.category}
                    </p>
                  </div>
                  <div className="review-card__rating" aria-label={`Оценка: ${review.rating} из 5`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} aria-hidden="true">★</span>
                    ))}
                  </div>
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
