'use server'

import FI, { Options } from '@/app/api';
import { backendAPIRoutes } from '@/shared/constants/backend-api.constant';

export async function getList(options: Options) {
  try {
    const request = await FI.fetch<AnimeDataListInterface>(backendAPIRoutes.filter, options);
    if(!request.ok) return request
    return {ok: true, ...request.data}
  } catch (e) {
    console.error(e)
     throw new Error("Failed to load list:");
  }
}
