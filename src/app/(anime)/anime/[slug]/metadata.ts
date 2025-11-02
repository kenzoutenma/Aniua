import getAnime from '@/features/anime/service/getAnime';
import { getTranslatedText } from '@/shared/lib';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const anime = await getAnime(slug);

  const language = 'uk';
  const title = language === 'uk' ? anime.title : anime.title_en;

  return {
    title: `${title} - Aniua | ${anime.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${anime.description && anime.description.split(' ').slice(0, 10).join(' ')}...`,
  };
}
