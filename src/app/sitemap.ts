import { getAllAnimeSlugs } from '@/utils';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: process.env.NEXT_PUBLIC_BASE_URL || '',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: process.env.NEXT_PUBLIC_BASE_URL + 'list' || '',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  try {
    const slugs = await getAllAnimeSlugs();
    if (slugs.length > 0) {
      const dynamicRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: process.env.NEXT_PUBLIC_BASE_URL + `anime/${slug}` || '',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
      return [...staticRoutes, ...dynamicRoutes];
    }
  } catch (e) {
    console.error('Failed to fetch anime slugs:', e);
  }
  finally {
    return [...staticRoutes];
  }  
}
