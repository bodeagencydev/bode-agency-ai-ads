import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing prompt" },
        { status: 400 }
      );
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Break the user prompt into exactly 3 short visual ad scenes. Keep each scene under 10 words.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "";

    const scenes = text
      .split("\n")
      .map((line) => line.replace(/^\d+\.?\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

    return NextResponse.json({ scenes });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate scenes" },
      { status: 500 }
    );
  }
}
