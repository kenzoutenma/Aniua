'use server';

import FI from '@/app/api';
import { episodesApiRoutes } from '@/shared/constants/routes';
import { notFound } from 'next/navigation';

async function getEpisodesListService(slug: string) {
  try {
    const request = await FI.fetch<IEpisodeListResponse>(
      episodesApiRoutes.episodeListBySlug(slug),
      {
        to: 'out',
        method: 'GET',
        cache: 'no-store',
      },
    );

    if (!request.ok) {
      return notFound();
    }

    return request.data.episodes;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return notFound();
  }
}

export default getEpisodesListService;
