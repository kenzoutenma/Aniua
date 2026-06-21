import DescriptionSection from '@/features/anime/components/description-section/description-section';
import HeroBanner from '@/features/anime/components/hero/hero';
import PlayerSection from '@/features/anime/components/player-section/player-section';
import getAnime from '@/features/anime/service/getAnime';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GenerateMetadata from './metadata';
import getAnimeSchema from './schema';

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

  if (anime instanceof Error) {
    return notFound();
  }

  const schema = getAnimeSchema(anime);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HeroBanner
        title={anime.title_ua}
        year={anime.year}
        description={anime.description_main}
        genres={anime.genres}
        trailer={anime.trailer}
        poster={anime.poster}
        cover={anime.cover_image_url}
        anime={anime}
      />
      <PlayerSection data={anime} />
      <DescriptionSection data={anime} />
    </>
  );
}
