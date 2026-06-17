import getAnime from '@/features/anime/service/getAnime';
import { getTranslatedText } from '@/shared/lib';
import { Metadata } from 'next';

export default async function GenerateMetadata(slug: string): Promise<Metadata> {
  const anime = await getAnime(slug);

  const language = 'uk';
  const title = language === 'uk' ? anime.title_ua : anime.title_en;

  return {
    title: `${title} - Aniua | ${anime.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${anime.description && anime.description.split(' ').slice(0, 10).join(' ')}...`,
  };
}
