import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: "Missing prompt" },
      { status: 400 }
    );
  }

  // FAKE scenes (no OpenAI involved)
  return NextResponse.json({
    scenes: [
      prompt + " lifestyle scene",
      prompt + " product close up",
      prompt + " happy customer smiling"
    ]
  });
}
