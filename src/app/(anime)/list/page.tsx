import Pagination from '@/components/Pagination/Pagination';
import { Button, Section } from '@/components/UI/UIComponents';
import useAnimeList from '@/hooks/useAnimeList';
import { Metadata } from 'next';
import AnimeList from './Components/AnimeList';
import Filters from './Components/Filters';

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
    <Section typeOfSection="TwoColSection" classname="justify-evenly" style={{ gridTemplateColumns: "10fr 3fr", padding: "2rem 6rem"}}>
      <Section.Col>
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
      </Section.Col>
      <Section.Col>
        <Filters />
      </Section.Col>
    </Section>
  );
};

export default listPage;
