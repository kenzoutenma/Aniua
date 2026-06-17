'use server';

import FI from '@/app/api';
import { searchApiRoutes } from '@/shared/constants/routes';

export async function getGenresData() {
  try {
    const request = await FI.fetch<{ genres: AnimeGenre[] }>(searchApiRoutes.genres_data, {
      to: 'out',
      next: {
        revalidate: 86400,
        tags: ['anime-genres'],
      },
    });

    if (!request.ok) {
      return { ok: false, data: [] };
    }

    return {
      ok: true,
      data: request.data.genres.map((genre: AnimeGenre) => ({
        id: genre.id,
        title: genre.title,
        title_en: genre.title_en,
        slug: genre.slug,
      })),
    };
  } catch (e) {
    console.error('Failed to load genres:', e);
    return { ok: false, data: [] };
  }
}
