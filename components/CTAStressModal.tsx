"use client";

import { useState, useEffect, useRef } from 'react';

export default function CTAStressModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button 
        className="btn btn--ghost" 
        onClick={() => setIsOpen(true)}
        style={{ color: '#fff' }}
      >
        Узнать подробнее
      </button>
    );
  }

  return (
    <div 
      className="modal-backdrop" 
      onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" ref={dialogRef}>
        <div className="modal__header">
          <h3 className="modal__title" id="modal-title">Круглосуточная помощь</h3>
          <button 
            className="modal__close" 
            onClick={() => setIsOpen(false)}
            aria-label="Закрыть модальное окно"
          >
            ✕
          </button>
        </div>
        <div>
          <p style={{ marginBottom: '1rem' }}>
            Наша служба работает круглосуточно без выходных. Вы можете обратиться к нам в любое время.
          </p>
          <ul style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <li>✓ Выезд врача в течение часа</li>
            <li>✓ Полная анонимность</li>
            <li>✓ Современные методы лечения</li>
            <li>✓ Психологическая поддержка семьи</li>
          </ul>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:+78001234567" className="btn btn--primary">
              Позвонить сейчас
            </a>
            <button className="btn btn--ghost" onClick={() => setIsOpen(false)}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
