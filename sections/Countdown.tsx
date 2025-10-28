"use client";

import { useEffect, useState } from 'react';

type TimeRemaining = {
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (target: Date): TimeRemaining => {
  const difference = target.getTime() - Date.now();
  if (difference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export default function Countdown() {
  const [target] = useState(() => {
    const date = new Date();
    date.setHours(date.getHours() + 2, 0, 0, 0);
    return date;
  });
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() => calculateTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section aria-labelledby="countdown-heading">
      <div className="container">
        <div className="cta-card" role="status" aria-live="polite">
          <div>
            <h2 id="countdown-heading" style={{ marginBottom: '0.5rem' }}>
              Ближайший выезд врача доступен через
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.85)' }}>
              Вы можете оформить вызов прямо сейчас. Наш оператор свяжется с вами в течение 5 минут.
            </p>
          </div>
          <div className="countdown" role="group" aria-label="Время до ближайшего выезда">
            <div className="countdown__item">
              <span className="countdown__value" aria-live="polite" aria-label="Часы">
                {timeLeft.hours.toString().padStart(2, '0')}
              </span>
              <span className="countdown__label">Часы</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value" aria-live="polite" aria-label="Минуты">
                {timeLeft.minutes.toString().padStart(2, '0')}
              </span>
              <span className="countdown__label">Минуты</span>
            </div>
            <div className="countdown__item">
              <span className="countdown__value" aria-live="polite" aria-label="Секунды">
                {timeLeft.seconds.toString().padStart(2, '0')}
              </span>
              <span className="countdown__label">Секунды</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
