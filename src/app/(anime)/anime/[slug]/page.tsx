import DescriptionSection from '@/features/anime/components/description-section/description-section';
import HeroBanner from '@/features/anime/components/hero/hero';
import PlayerSection from '@/features/anime/components/player-section/player-section';
import getAnime from '@/features/anime/service/getAnime';

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const anime = await getAnime(slug);

  return (
    <>
      <HeroBanner data={anime} />
      <PlayerSection data={anime} />
      <DescriptionSection data={anime} />
    </>
  );
}
