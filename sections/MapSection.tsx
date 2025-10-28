"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ClinicMap = dynamic(() => import('@/components/ClinicMap'), {
  ssr: false,
  loading: () => <p role="status">Загружаем карту...</p>,
});

export default function MapSection() {
  return (
    <section aria-labelledby="map-heading" className="bg-secondary">
      <div className="container" style={{ display: 'grid', gap: '1.5rem' }}>
        <div>
          <span className="section-intro__eyebrow">Как добраться</span>
          <h2 id="map-heading" className="section-intro__title" style={{ textAlign: 'left' }}>
            Мы находимся в центре Москвы
          </h2>
          <p className="section-intro__description" style={{ textAlign: 'left' }}>
            Клиника в пешей доступности от метро. Есть бесплатная парковка для посетителей.
          </p>
        </div>
        <Suspense fallback={<p role="status">Загружаем карту...</p>}>
          <ClinicMap />
        </Suspense>
      </div>
    </section>
  );
}
