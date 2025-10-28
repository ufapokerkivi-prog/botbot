'use client';

import { ReactNode, useEffect, useState } from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';
import defaultSeo from '@/next-seo.config';

const sectionSeoConfig = [
  {
    id: 'services',
    title: 'Услуги наркологической службы',
    description: 'Комплексная помощь: выезд нарколога, кодирование, реабилитация и сопровождение 24/7.',
  },
  {
    id: 'about',
    title: 'О клинике',
    description: 'Лицензированная клиника с опытом более 15 лет. Полная конфиденциальность и современные методы лечения.',
  },
  {
    id: 'reviews',
    title: 'Отзывы пациентов',
    description: 'Реальные отзывы пациентов о выезде нарколога на дом, реабилитации и кодировании.',
  },
  {
    id: 'contact',
    title: 'Контакты наркологической службы',
    description: 'Свяжитесь с нами по телефону или оставьте заявку на консультацию. Работаем круглосуточно.',
  },
];

function SectionSeoManager() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry) => setActiveSectionId(entry.target.id));
      },
      {
        threshold: 0.6,
      }
    );

    sectionSeoConfig.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const activeSection = sectionSeoConfig.find((section) => section.id === activeSectionId);

  return (
    <NextSeo
      title={activeSection?.title || defaultSeo.defaultTitle}
      description={activeSection?.description || defaultSeo.description}
      openGraph={{
        ...defaultSeo.openGraph,
        title: activeSection?.title || defaultSeo.openGraph?.title || '',
        description: activeSection?.description || defaultSeo.openGraph?.description || '',
        url: activeSectionId ? `https://example.com/#${activeSectionId}` : 'https://example.com',
      }}
    />
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <NextSeo additionalMetaTags={sectionSeoConfig.map((section) => ({
        name: `section-${section.id}-description`,
        content: section.description,
      }))} />
      <SectionSeoManager />
      {children}
    </>
  );
}
