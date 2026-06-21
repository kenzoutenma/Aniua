'use server';

import ACClient from '@/shared/clients/aniua/aniua';

async function getAnime(
  slug: string,
): Promise<(AnimeDataInterface & { characters: AnimeCharacters[] }) | Error> {
  try {
    const [anime, character] = await Promise.all([
      ACClient.anime.get(slug),
      ACClient.anime.characters(slug).catch(() => null),
    ]);

    if (anime instanceof Error) {
      throw new Error((anime as Error).message);
    }

    return {
      ...anime,
      characters: character && !(character instanceof Error) ? character.slice(0, 10) : [],
    };
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw new Error((error as Error).message);
  }
}

export default getAnime;
