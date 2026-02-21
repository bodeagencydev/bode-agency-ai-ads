import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { product } = body;

    if (!product) {
      return NextResponse.json(
        { error: 'Product is required' },
        { status: 400 }
      );
    }

    // Basic UGC Ad Structure (45–60 seconds)
    const scenes = [
      {
        text: `I just found the best ${product}!`,
        type: "hook",
        search: product
      },
      {
        text: `I used to struggle with this before.`,
        type: "problem",
        search: product
      },
      {
        text: `Then I discovered this ${product}.`,
        type: "solution",
        search: product
      },
      {
        text: `Here’s how it works.`,
        type: "demo",
        search: product
      },
      {
        text: `And the results are amazing.`,
        type: "result",
        search: product
      },
      {
        text: `You should try it today.`,
        type: "cta",
        search: product
      }
    ];

    return NextResponse.json({ scenes });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate scenes' },
      { status: 500 }
    );
  }
}
