"use client";

import { useState, useEffect, useRef } from "react";

export default function ContactMap() {
  const [mapVisible, setMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMapVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={mapRef} className="min-h-[360px] overflow-hidden rounded-2xl bg-elevated shadow-soft">
      {mapVisible ? (
        <iframe
          title="Карта проезда"
          src="https://yandex.ru/map-widget/v1/?ll=37.620070%2C55.753630&z=11&mode=search&text=%D0%BD%D0%B0%D1%80%D0%BA%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C"
          loading="lazy"
          className="h-[360px] w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="text-6xl">🗺️</div>
          <p className="text-sm text-muted">Карта загрузится автоматически при просмотре блока</p>
          <button
            type="button"
            onClick={() => setMapVisible(true)}
            className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
          >
            Загрузить карту
          </button>
        </div>
      )}
    </div>
  );
}
