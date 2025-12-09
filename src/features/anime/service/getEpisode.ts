'use server';

import FI from '@/app/api';
import { episodesApiRoutes } from '@/shared/constants/routes';

import { notFound } from 'next/navigation';

async function getEpisodeService(ID: string): Promise<EpisodeListInterface> {
  try {
    const [episode, video] = await Promise.all([
      FI.fetch<EpisodeListInterface>(episodesApiRoutes.episodeByID(ID), {
        to: 'out',
        method: 'GET',
        cache: 'no-store',
      }),
      FI.fetch<PlayersInEpisode[]>(episodesApiRoutes.videoByEpisodeID(ID), {
        to: 'out',
        method: 'GET',
        cache: 'no-store',
      }).catch(() => ({ ok: false, data: [] })),
    ]);

    if (!episode.ok) {
      return notFound();
    }

    return {
      ...episode.data,
      players: video.ok ? video.data : [],
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    return notFound();
  }
}

export default getEpisodeService;
