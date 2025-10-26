import FI from '@/app/api';
import { backendAPIRoutes } from '@/constants/backend-api.constant';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;

    const anime = await FI.fetch<AnimeDataInterface>(backendAPIRoutes.animeByTitle(slug), {
      method: 'GET',
      to: 'out',
      cache: 'force-cache',
    });

    if (!anime.ok) {
      return NextResponse.json(
        { message: `Failed to fetch anime ${slug}` },
        { status: anime.status },
      );
    }

    const character = await FI.fetch<{ characters: AnimeCharacters[] }>(
      backendAPIRoutes.charsByTitle(slug),
      {
        to: 'out',
        method: 'GET',
        cache: 'force-cache',
        params: {
          page: '1',
          limit: '10',
        },
      },
    );

    const totalResponse: AnimeDataInterface & { characters: AnimeCharacters[] } = {
      ...anime.data,
      characters: !character.ok ? [] : character.data.characters.slice(0, 10),
    };

    return NextResponse.json(totalResponse);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
