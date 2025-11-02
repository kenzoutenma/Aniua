import AnimeList from '@/features/list/components/items-list';
import useAnimeList from '@/features/list/hooks/useAnimeList';
import { Button } from '@/shared/ui';
import Pagination from '@/shared/ui/pagination/pagination';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Список аніме на Aniua',
    description: `Дивитись аніме на Aniua онлайн у високій якості`,
  };
}

interface ListPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const listPage = async ({ searchParams }: ListPageProps) => {
  const filterQuery = await searchParams;
  const AnimeData = await useAnimeList(filterQuery);

  return (
    <>
      <AnimeList anime={AnimeData.titles} />
      <Pagination isNextDisabled={!AnimeData.isNextPage} isPrevDisabled={!AnimeData.isPrevPage}>
        {Array.from({ length: AnimeData.pageCount }).map((_, i) => (
          <Button
            as="a"
            href={AnimeData.createPageUrl(i + 1)}
            key={i}
            variant={AnimeData.page == i + 1 ? 'primary' : 'secondary'}
          >
            {i + 1}
          </Button>
        ))}
      </Pagination>
    </>
  );
};

export default listPage;
