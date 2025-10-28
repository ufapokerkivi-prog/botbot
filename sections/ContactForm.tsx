"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+?[78]?\d{10}$/, 'Введите корректный номер телефона'),
  service: z.string().min(1, 'Выберите услугу'),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <div className="section-intro">
          <span className="section-intro__eyebrow">Контакты</span>
          <h2 className="section-intro__title" id="contact-heading">
            Свяжитесь с нами
          </h2>
          <p className="section-intro__description">
            Заполните форму, и наш специалист свяжется с вами в течение 5 минут
          </p>
        </div>
        <div className="contact-section">
          <form 
            className="contact-form" 
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Форма обратной связи"
            role="form"
          >
            <div className="contact-form__group">
              <label htmlFor="name">Ваше имя *</label>
              <input
                id="name"
                type="text"
                placeholder="Иван Иванов"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
              />
              {errors.name && (
                <p id="name-error" className="contact-form__error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="contact-form__group">
              <label htmlFor="phone">Телефон *</label>
              <input
                id="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                {...register('phone')}
              />
              {errors.phone && (
                <p id="phone-error" className="contact-form__error" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="contact-form__group">
              <label htmlFor="service">Услуга *</label>
              <select
                id="service"
                aria-required="true"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
                {...register('service')}
              >
                <option value="">Выберите услугу</option>
                <option value="home-visit">Выезд нарколога на дом</option>
                <option value="coding">Кодирование от алкоголизма</option>
                <option value="rehabilitation">Реабилитация</option>
                <option value="detox">Вывод из запоя</option>
              </select>
              {errors.service && (
                <p id="service-error" className="contact-form__error" role="alert">
                  {errors.service.message}
                </p>
              )}
            </div>
            <div className="contact-form__group">
              <label htmlFor="message">Сообщение (необязательно)</label>
              <textarea
                id="message"
                rows={4}
                placeholder="Расскажите о вашей ситуации"
                {...register('message')}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn--primary" 
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
            {submitted && (
              <p role="status" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                ✓ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
              </p>
            )}
          </form>
          <div>
            <div className="service-card">
              <h3>Телефон горячей линии</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                <a href="tel:+78001234567">8 800 123-45-67</a>
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)' }}>
                Звонок бесплатный, круглосуточно
              </p>
            </div>
            <div className="service-card">
              <h3>Адрес клиники</h3>
              <address style={{ fontStyle: 'normal' }}>
                <p>г. Москва, ул. Примерная, д. 123</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginTop: '0.5rem' }}>
                  Пн-Вс: круглосуточно
                </p>
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
