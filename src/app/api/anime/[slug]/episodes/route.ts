import FI from '@/app/api';
import { animeAPIConstant } from '@/shared/constants/api-endpoints.constant';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;

    if (slug === 'none') {
      NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    const response = await FI.fetch(animeAPIConstant.episodeList(slug), {
      to: 'out',
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch anime list ${slug}` },
        { status: response.status },
      );
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
