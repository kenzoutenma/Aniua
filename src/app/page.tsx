import FI from '@/app/api';
import HomeScreen from '@/features/home/components/home-screen';
import { getGenresData } from '@/features/list/service/get-filters';
import { searchApiRoutes } from '@/shared/constants/routes';

interface group {
  name: string;
  data: AnimeDataInterface[];
}

export default async function Home() {
  const request = await getGenresData();

  const groups: group[] = [];

  const communityChoice = await FI.fetch<AnimeDataListInterface>(searchApiRoutes['filter'], {
    to: 'out',
    params: { limit: '9', order: 'rating' },
  });
  if (!communityChoice.ok) return communityChoice;
  groups.push({
    name: 'home.Community choice',
    data: communityChoice.data.titles as AnimeDataInterface[],
  });

  for (let i = 0; i < 7; i++) {
    const thisGenreIs = request.data[i];
    if (!thisGenreIs) continue;

    const action = await FI.fetch<AnimeDataListInterface>(searchApiRoutes['filter'], {
      to: 'out',
      params: { limit: '9', order: 'rating', genre: thisGenreIs.id },
      next: { tags: [`anime-list-genre-${thisGenreIs.slug}`] },
    });
    if (!action.ok) return action;
    groups.push({
      name: `anime_genres.${thisGenreIs.slug}`,
      data: action.data.titles as AnimeDataInterface[],
    });
  }

  return <HomeScreen groups={groups} />;
}
