'use server';

import FI from '@/app/api';
import { backendAPIRoutes } from '@/shared/constants/backend-api.constant';
import { notFound } from 'next/navigation';

async function getEpisodeService(ID: string) {
  try {
    const request = await FI.fetch<EpisodeListInterface>(backendAPIRoutes.episodeByID(ID), {
      to: 'out',
      method: 'GET',
      cache: 'no-store',
    });

    if (!request.ok) {
      return notFound();
    }

    return request.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    return notFound();
  }
}

export default getEpisodeService;
