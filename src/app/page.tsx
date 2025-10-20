import FetchServiceInstance from '@/app/api';
import HomeScreen from '@/components/Screens/Home/HomeScreen';
import { backendAPIRoutes } from '@/constants/backend-api.constant';

export default async function Home() {
  const communityChoice = await FetchServiceInstance.fetchHelper(backendAPIRoutes['filter'], {
    to: 'out',
    params: { limit: '9', order: 'rating' },
  }).then((res) => res.titles as AnimeDataInterface[]);

  const action = await FetchServiceInstance.fetchHelper(backendAPIRoutes['filter'], {
    to: 'out',
    cache: 'no-store',
    params: { limit: '9', order: 'rating', genre: '10' },
  }).then((res) => res.titles as AnimeDataInterface[]);

  const groups = [
    { name: 'home.Community choice', data: communityChoice },
    { name: 'anime_genres.action', data: action },
  ];

  return <HomeScreen groups={groups} />;
}
