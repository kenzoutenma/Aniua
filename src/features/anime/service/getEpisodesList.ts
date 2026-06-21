'use server';

import ACClient from '@/shared/clients/aniua/aniua';

async function getEpisodesListService(slug: string) {
  try {
    const request = await ACClient.episode.list(slug);

    if (request instanceof Error) {
      throw new Error((request as Error).message);
    }

    return request;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw new Error((error as Error).message);
  }
}

export default getEpisodesListService;
