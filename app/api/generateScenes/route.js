import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }

  const keywords = prompt
    .split(" ")
    .filter(word => word.length > 3)
    .slice(0, 3)
    .join(" ");

  const scenes = [
    `${keywords} luxury lifestyle`,
    `${keywords} close up product detail`,
    `${keywords} confident woman using product`
  ];

  return NextResponse.json({ scenes });
}
