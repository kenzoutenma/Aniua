import FetchServiceInstance from '@/app/api';
import { animeAPIConstant } from '@/constants/api-endpoints.constant';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;

    const anime = await FetchServiceInstance.fetchHelper(animeAPIConstant.animeByTitle(slug), {
      to: 'out',
      method: 'GET',
      cache: 'force-cache',
      requestReturn: true,
    });

    const character = await FetchServiceInstance.fetchHelper(animeAPIConstant.charsByTitle(slug), {
      to: 'out',
      method: 'GET',
      cache: 'force-cache',
      requestReturn: true,
      params: {
        page: '1',
        limit: '10',
      },
    });

    if (!anime.ok) {
      return NextResponse.json(
        { message: `Failed to fetch anime ${slug}` },
        { status: anime.status },
      );
    }

    const animeBody = await anime.json();
    const characterBody = character && character.status === "200" && await character.json();

    const totalResponse = {
      ...animeBody,
      characters: characterBody && characterBody.characters.slice(0, 10),
    };

    return NextResponse.json(totalResponse);
  } catch (error) {
    console.error('Error in login handler:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
