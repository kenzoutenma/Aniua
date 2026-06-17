import FI from '@/app/api';
import { getList } from '../service/get-list';

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
  const request = await getList({
    params: { page: '1', limit: '15', ...query },
    cache: 'force-cache',
    next: {
      revalidate: 86400,
      tags: ['anime-list'],
    },
  });

  const createPageUrl = (page: number) => {
    const params = FI.getParams(query);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const result = {
    titles: request.ok ? request?.titles : null,
    page: request.ok ? request?.page : 0,
    pageCount: request.ok ? request.page_count : 0,
    isNextPage: request.ok ? request.next_page : false,
    isPrevPage: request.ok ? request.previous_page : false,
    createPageUrl,
  };

  return result;
};

export default useAnimeList;
