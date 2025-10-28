type OpeningHoursSpecification = {
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

export const generateStructuredData = () => {
  const openingHours: OpeningHoursSpecification = {
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://example.com#clinic',
    name: 'Наркологическая служба',
    description:
      'Профессиональная наркологическая служба. Вывод из запоя, кодирование, реабилитация и сопровождение 24/7.',
    url: 'https://example.com',
    telephone: '+7-800-123-45-67',
    email: 'info@narcology.example',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Примерная, д. 123',
      addressLocality: 'Москва',
      addressCountry: 'RU',
      postalCode: '101000',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.7558,
      longitude: 37.6173,
    },
    image: ['https://example.com/images/og-image.jpg'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
    },
    areaServed: {
      '@type': 'City',
      name: 'Москва',
    },
    openingHoursSpecification: openingHours,
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Выезд нарколога на дом',
        price: '3500.00',
        priceCurrency: 'RUB',
      },
      {
        '@type': 'Offer',
        name: 'Кодирование от алкоголизма',
        price: '8700.00',
        priceCurrency: 'RUB',
      },
    ],
    sameAs: [
      'https://vk.com/narcology',
      'https://ok.ru/narcology',
    ],
    serviceType: 'Наркологические услуги',
  };
};
