import FI from '@/app/api';
import HomeScreen from '@/components/Screens/Home/HomeScreen';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { backendAPIRoutes } from '@/constants/backend-api.constant';

interface group {
  name: string;
  data: AnimeDataInterface[];
}

export default async function Home() {
  const request = await FI.fetch<AnimeGenre[]>(animeAPIConstant.genres_data, { to: 'self' });
  if (!request.ok) return request
  const data = request.data as AnimeGenre[];

  const groups: group[] = [];

  const communityChoice = await FI.fetch<AnimeDataListInterface>(backendAPIRoutes['filter'], {
    to: 'out',
    params: { limit: '9', order: 'rating' },
  });
  if (!communityChoice.ok) return communityChoice;
  groups.push({
    name: 'home.Community choice',
    data: communityChoice.data.titles as AnimeDataInterface[],
  });

  for (let i = 0; i < 4; i++) {
    const thisGenreIs = data[i]
    const action = await FI.fetch<AnimeDataListInterface>(backendAPIRoutes['filter'], {
      to: 'out',
      cache: 'no-store',
      params: { limit: '9', order: 'rating', genre: thisGenreIs.id.toString() },
    });
    if (!action.ok) return action;
    groups.push({ name: `anime_genres.${thisGenreIs.slug}`, data: action.data.titles as AnimeDataInterface[] });
  }

  return <HomeScreen groups={groups} />;
}
