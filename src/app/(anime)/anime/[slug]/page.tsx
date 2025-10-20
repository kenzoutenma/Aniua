import FetchServiceInstance from '@/app/api';
import HeroBanner from '@/components/hero/hero';
import { getTranslatedText } from '@/utils';
import { Metadata } from 'next';
import DescriptionSection from '../Components/Sections/DescriptionSection/DescriptionSection';
import PlayerSection from '../Components/Sections/PlayerSection/PlayerSection';


export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await FetchServiceInstance.fetchHelper(`api/anime/${slug}`, { to: 'self' });

  const language = 'uk';
  const title = language === 'uk' ? data.title : data.title_en;

  return {
    title: `${title} - Aniua | ${data.title_jp}`,
    description: `${getTranslatedText('description.anime', { anime: title })} \n ${data?.description && data.description.split(' ').slice(0, 10).join(' ')}...`,
  };
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const data = (await FetchServiceInstance.fetchHelper(`api/anime/${slug}`, {
    to: 'self',
    cache: 'no-store',
  })) as AnimeDataInterface;

  // const playerID = 'player-section';

  return (
    <>
      <HeroBanner data={data} />
      <PlayerSection data={data}/>
      <DescriptionSection data={data} />
    </>
  );
}
