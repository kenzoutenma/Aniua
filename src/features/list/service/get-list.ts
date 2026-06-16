'use server';

import FI, { Options } from '@/app/api';
import { searchApiRoutes } from '@/shared/constants/routes';

export async function getList(options: Options) {
  try {
    const request = await FI.fetch<AnimeDataListInterface>(searchApiRoutes.filter, options);
    if (!request.ok) return request;

    request.data.titles.forEach((e) => {
      e.title = e.title || e.title_en || e.title_jp;
    });

    return { ok: true, ...request.data };
  } catch (e) {
    console.error(e);
    throw new Error('Failed to load list:');
  }
}
