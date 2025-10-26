import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { NextRequest, NextResponse } from 'next/server';
import FI from '@/app/api';

export async function GET(req: NextRequest) {
  try {
    const title: string = req.nextUrl.searchParams.get('title') || '';

    const request = await FI.fetch<EpisodeListInterface>(animeAPIConstant.episodeByTitle(title), {
      to: 'out',
      method: 'GET',
      cache: 'no-store',
    });

    if (!request.ok) {
      return NextResponse.json({ message: `Failed to fetch episode` }, { status: request.status });
    }

    return NextResponse.json(request.data);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
