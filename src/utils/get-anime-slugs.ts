import FI from '@/app/api';
import { backendAPIRoutes } from '@/constants/backend-api.constant';
import { sleep } from '@/utils';

async function getAllAnimeSlugs(): Promise<string[]> {
  const allSlugs: string[] = [];
  let page = 1;
  const pageSize = 10;
  let hasMore = true;

  while (hasMore) {
    const request = await FI.fetch<AnimeDataListInterface>(backendAPIRoutes['filter'], {
      to: 'out',
      params: { limit: String(pageSize), page: String(page), order: 'rating' },
    });

    if (request.ok) {
      const titles = request.data.titles;

      if (Array.isArray(titles)) {
        allSlugs.push(...titles.map((anime) => anime.slug));
      }
      if (page < 3) {
        hasMore = false;
      } else {
        page++;
      }
    } else {
      break;
    }

    await sleep(1000);
  }
  return allSlugs;
}

export default getAllAnimeSlugs;
