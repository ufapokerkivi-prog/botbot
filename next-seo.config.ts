import { DefaultSeoProps } from 'next-seo';

const defaultSeo: DefaultSeoProps = {
  titleTemplate: '%s | Наркологическая служба',
  defaultTitle: 'Наркологическая служба - Профессиональная помощь 24/7',
  description:
    'Профессиональная наркологическая служба. Анонимная помощь, вывод из запоя, кодирование, реабилитация. Круглосуточно.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Наркологическая служба - Профессиональная помощь 24/7',
    description:
      'Профессиональная наркологическая служба. Анонимная помощь, вывод из запоя, кодирование, реабилитация. Круглосуточно.',
    images: [
      {
        url: 'https://example.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Наркологическая служба',
      },
    ],
    siteName: 'Наркологическая служба',
  },
  twitter: {
    handle: '@narcology_clinic',
    site: '@narcology_clinic',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'canonical',
      href: 'https://example.com',
    },
  ],
};

export default defaultSeo;
