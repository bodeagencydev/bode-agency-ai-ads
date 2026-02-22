"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videos, setVideos] = useState([]);

const generateVideos = async () => {
  if (!prompt.trim()) {
    alert("Please enter a prompt");
    return;
  }

  try {
    // Step 1: Generate scenes
    const sceneRes = await fetch("/api/generateScenes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const sceneData = await sceneRes.json();

    if (!sceneRes.ok) {
      alert(sceneData.error || "Scene generation failed");
      return;
    }

    const scenes = sceneData.scenes;

    let allVideos = [];

    // Step 2: Fetch stock videos for each scene
    for (const scene of scenes) {
      const videoRes = await fetch(
        "/api/getStockVideos?q=" + encodeURIComponent(scene)
      );

      const videoData = await videoRes.json();

      if (videoData.videos) {
        allVideos = [...allVideos, ...videoData.videos.slice(0, 2)];
      }
    }

    setVideos(allVideos);

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Bode Agency AI</h1>

      <textarea
        placeholder="Enter your ad prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ width: "100%", height: "100px", marginBottom: "20px" }}
      />

      <button onClick={generateVideos}>
        Generate Stock Videos
      </button>

      <div style={{ marginTop: "40px" }}>
        {videos.map((video, index) => (
          <video
            key={index}
            src={video}
            controls
            width="300"
            style={{ margin: "10px" }}
          />
        ))}
      </div>
    </main>
  );
}
