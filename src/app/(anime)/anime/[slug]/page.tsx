import DescriptionSection from '@/features/anime/components/description-section/description-section';
import HeroBanner from '@/features/anime/components/hero/hero';
import PlayerSection from '@/features/anime/components/player-section/player-section';
import getAnime from '@/features/anime/service/getAnime';
import getAnimeSchema from './schema';
import { Metadata } from 'next';
import GenerateMetadata from './metadata';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  return GenerateMetadata(slug);
}

export default async function AnimePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  const anime = await getAnime(slug);
  const schema = getAnimeSchema(anime);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroBanner data={anime} />
      <PlayerSection data={anime} />
      <DescriptionSection data={anime} />
    </>
  );
}
