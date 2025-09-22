import FetchServiceInstance from '@/app/api';
import { backendAPIRoutes } from '@/constants/backend-api.constant';
import { sleep } from '@/utils';

async function getAllAnimeSlugs(): Promise<string[]> {
  const allSlugs: string[] = [];
  let page = 1;
  const pageSize = 10;
  let hasMore = true;

  while (hasMore) {
    const response = await FetchServiceInstance.fetchHelper(backendAPIRoutes['filter'], {
      to: 'out',
      params: { limit: String(pageSize), page: String(page), order: 'rating' },
    });

    const titles: AnimeDataInterface[] = response.titles;

    allSlugs.push(...titles.map((anime) => anime.slug));
    if (page < 3) {
      hasMore = false;
    } else {
      page++;
    }

    await sleep(1000);
  }
  return allSlugs;
}

export default getAllAnimeSlugs;
