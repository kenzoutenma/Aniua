'use server';

import ACClient from '@/shared/clients/aniua/aniua';

async function getEpisodeService(ID: string): Promise<EpisodeListInterface | Error> {
  try {
    const request = await ACClient.episode.byID(ID);

    if (request instanceof Error) {
      throw new Error((request as Error).message);
    }

    return {
      ...request,
      players: request.player,
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw new Error((error as Error).message);
  }
}

export default getEpisodeService;
