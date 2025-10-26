import FI from '@/app/api';
import HomeScreen from '@/components/Screens/Home/HomeScreen';
import { backendAPIRoutes } from '@/constants/backend-api.constant';

export default async function Home() {
  const communityChoice = await FI.fetch<AnimeDataInterface[]>(backendAPIRoutes['filter'], {
    to: 'out',
    params: { limit: '9', order: 'rating' },
  });

  const action = await FI.fetch<AnimeDataInterface[]>(backendAPIRoutes['filter'], {
    to: 'out',
    cache: 'no-store',
    params: { limit: '9', order: 'rating', genre: '10' },
  });

  if (!action.ok || !communityChoice.ok) return action;

  const groups = [
    { name: 'home.Community choice', data: communityChoice.data as AnimeDataInterface[] },
    { name: 'anime_genres.action', data: action.data as AnimeDataInterface[] },
  ];

  if (action.ok && communityChoice.ok) {
    return <HomeScreen groups={groups} />;
  }
}
