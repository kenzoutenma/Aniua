import FI from '@/app/api';
import HeroBanner from '@/components/hero/hero';
import DescriptionSection from '@/components/Screens/Anime/Sections/DescriptionSection/DescriptionSection';
import PlayerSection from '@/components/Screens/Anime/Sections/PlayerSection/PlayerSection';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { getTranslatedText } from '@/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  const request = await FI.fetch<AnimeDataInterface>(animeAPIConstant.animeByTitle(slug), {
    method: 'GET',
    to: 'self',
  });

  if (!request.ok) {
    return notFound();
  }

  const language = 'uk';
  const title = language === 'uk' ? request.data.title : request.data.title_en;

  return {
    title: `${title} - Aniua | ${request.data.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${request.data.description && request.data.description.split(' ').slice(0, 10).join(' ')}...`,
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const request = await FI.fetch<AnimeDataInterface & { characters: AnimeCharacters[] }>(
    animeAPIConstant.animeByTitle(slug),
    {
      method: 'GET',
      to: 'self',
    },
  );

  if (!request.ok) return notFound();

  return (
    <>
      <HeroBanner data={request.data} />
      <PlayerSection data={request.data} />
      <DescriptionSection data={request.data} />
    </>
  );
}
