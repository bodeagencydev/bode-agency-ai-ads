"use client";

import { FormEvent, useMemo, useState } from "react";

type VoiceStyle = "Standard" | "Energetic";

type GeneratedMedia = {
  stockVideos: string[];
  finalVideo: string;
};

const voiceStyles: VoiceStyle[] = ["Standard", "Energetic"];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("Standard");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedMedia | null>(null);

  const isGenerateDisabled = useMemo(() => !prompt.trim() || isGenerating, [prompt, isGenerating]);

  async function handleGenerateAd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setResult({
      stockVideos: [
        `https://samplelib.com/lib/preview/mp4/sample-5s.mp4?topic=${encodeURIComponent(prompt)}`,
        "https://samplelib.com/lib/preview/mp4/sample-10s.mp4"
      ],
      finalVideo: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4"
    });

    setIsGenerating(false);
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Bode Agency AI Ad Generator</h1>
        <p>Create ad drafts using a prompt and optional media references.</p>

        <form onSubmit={handleGenerateAd} className="form">
          <label>
            Prompt
            <input
              type="text"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Describe your ad concept..."
              required
            />
          </label>

          <label>
            Optional Image Upload
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
            />
          </label>

          <label>
            Optional Video Upload
            <input
              type="file"
              accept="video/*"
              onChange={(event) => setVideoFile(event.target.files?.[0] ?? null)}
            />
          </label>

          <label>
            Voice Style
            <select
              value={voiceStyle}
              onChange={(event) => setVoiceStyle(event.target.value as VoiceStyle)}
            >
              {voiceStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" disabled={isGenerateDisabled}>
            {isGenerating ? "Generating..." : "Generate Ad"}
          </button>
        </form>

        <div className="summary">
          <h2>Current Inputs</h2>
          <ul>
            <li><strong>Prompt:</strong> {prompt || "None yet"}</li>
            <li><strong>Image:</strong> {imageFile?.name ?? "No image selected"}</li>
            <li><strong>Video:</strong> {videoFile?.name ?? "No video selected"}</li>
            <li><strong>Voice Style:</strong> {voiceStyle}</li>
          </ul>
        </div>
      </section>

      <section className="card results">
        <h2>Generated Results</h2>
        {!result ? (
          <p>No ad generated yet. Submit the form to preview stock clips and the final ad video.</p>
        ) : (
          <>
            <h3>Suggested Stock Videos</h3>
            <div className="video-grid">
              {result.stockVideos.map((videoUrl) => (
                <video key={videoUrl} controls src={videoUrl} className="video-player" />
              ))}
            </div>

            <h3>Final Video</h3>
            <video controls src={result.finalVideo} className="video-player final" />
          </>
        )}
      </section>
    </main>
  );
}
