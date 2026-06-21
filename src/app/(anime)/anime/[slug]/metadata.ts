import getAnime from '@/features/anime/service/getAnime';
import { getTranslatedText } from '@/shared/lib';
import { Metadata } from 'next';

export default async function GenerateMetadata(slug: string): Promise<Metadata> {
  const anime = await getAnime(slug);

  if (anime instanceof Error) {
    return {
      title: getTranslatedText(''),
      description: `...`,
    };
  }

  const language = 'uk';
  const title = language === 'uk' ? anime.description_main : anime.title_en;

  return {
    title: `${title} - Aniua | ${anime.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${anime.description_main && anime.description_main.split(' ').slice(0, 10).join(' ')}...`,
  };
}
