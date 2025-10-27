import FI from '@/app/api';
import { animeAPIConstant } from '@/shared/constants/api-endpoints.constant';

interface IUseAnimeList {
  titles: AnimeDataInterface[] | null;
  createPageUrl: (page: number) => string;
  page: number;
  pageCount: number;
  isNextPage: boolean;
  isPrevPage: boolean;
}

const useAnimeList = async (
  query: Record<string, string | string[] | undefined>,
): Promise<IUseAnimeList> => {
  const request = await FI.fetch<AnimeDataListInterface>(animeAPIConstant['list'], {
    params: { page: '1', limit: '15', ...query },
    to: 'self',
    cache: 'force-cache',
  });

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    for (const key in query) {
      const value = query[key];
      if (Array.isArray(value)) {
        value.forEach((v) => v && params.append(key, v));
      } else if (typeof value === 'string') {
        params.set(key, value);
      }
    }

    params.set('page', page.toString());

    return `?${params.toString()}`;
  };

  const result = {
    titles: request.ok ? request?.data?.titles : null,
    page: request.ok ? request?.data?.page : 0,
    pageCount: request.ok ? request?.data?.page_count : 0,
    isNextPage: request.ok ? request?.data?.next_page : false,
    isPrevPage: request.ok ? request?.data?.previous_page : false,
    createPageUrl,
  };

  return result;
};

export default useAnimeList;
