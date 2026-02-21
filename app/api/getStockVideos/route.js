import { NextResponse } from 'next/server';

const PEXELS_API_URL = 'https://api.pexels.com/videos/search';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();

  if (!query) {
    return NextResponse.json(
      { error: 'Missing required query parameter: q' },
      { status: 400 }
    );
  }

  const apiKey = process.env.PEXELS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server configuration error: missing PEXELS_API_KEY' },
      { status: 500 }
    );
  }

  try {
    const pexelsResponse = await fetch(
      `${PEXELS_API_URL}?query=${encodeURIComponent(query)}&per_page=6`,
      {
        headers: {
          Authorization: apiKey,
        },
        cache: 'no-store',
      }
    );

    if (!pexelsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch videos from Pexels' },
        { status: pexelsResponse.status }
      );
    }

    const data = await pexelsResponse.json();
    const videos = (data.videos || [])
      .map((video) => {
        const bestFile = (video.video_files || [])
          .slice()
          .sort((a, b) => (b.width || 0) - (a.width || 0))[0];

        return bestFile?.link;
      })
      .filter(Boolean)
      .slice(0, 6);

    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json(
      { error: 'Unexpected error while fetching stock videos' },
      { status: 500 }
    );
  }
}
