import { MetadataRoute } from 'next';
import { provincies, gemeenten } from '@/lib/fallback-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://begraafplaatskosten.nl';
  const lastModified = new Date();

  const provinciePages: MetadataRoute.Sitemap = provincies
    .filter((p) => p.beschikbaar)
    .map((p) => ({
      url: `${baseUrl}/provincie/${p.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  const gemeentePages: MetadataRoute.Sitemap = gemeenten.map((g) => ({
    url: `${baseUrl}/gemeente/${g.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...provinciePages,
    ...gemeentePages,
    {
      url: `${baseUrl}/uitvaartkosten`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/soorten-begraafplaatsen`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/grafrechten-uitleg`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/begrippenlijst`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/grafkosten-besparen`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
