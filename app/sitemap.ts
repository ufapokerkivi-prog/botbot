import type { MetadataRoute } from 'next';

const routes = ['', '/#services', '/#about', '/#reviews', '/#contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com';

  return routes.map((route) => ({
    url: `${baseUrl}${route.replace('#', '/')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.7,
  }));
}
