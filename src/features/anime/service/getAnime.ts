'use server';

import FI from '@/app/api';
import { backendAPIRoutes } from '@/shared/constants/backend-api.constant';
import { notFound } from 'next/navigation';

async function getAnime(slug: string) {
  try {
    const [anime, character] = await Promise.all([
      FI.fetch<AnimeDataInterface>(backendAPIRoutes.animeByTitle(slug), {
        method: 'GET',
        to: 'out',
        next: {
          revalidate: 3600,
          tags: [`anime-${slug}`],
        },
      }),
      FI.fetch<{ characters: AnimeCharacters[] }>(backendAPIRoutes.charsByTitle(slug), {
        to: 'out',
        method: 'GET',
        next: {
          revalidate: 3600,
          tags: [`anime-chars-${slug}`],
        },
        params: {
          page: '1',
          limit: '10',
        },
      }).catch(() => ({ ok: false, data: { characters: [] } })),
    ]);

    if (!anime.ok) {
      return notFound();
    }

    return {
      ...anime.data,
      characters: character.ok ? character.data.characters.slice(0, 10) : [],
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    return notFound();
  }
}

export default getAnime;
