import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}genres`;

    const request = await fetch(url, {
      method: 'GET',
    });

    const response = await request.json();

    return NextResponse.json(response.genres);
  } catch (e) {
    return NextResponse.json({ message: 'Internal server error', error: e }, { status: 500 });
  }
}
