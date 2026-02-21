"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [videos, setVideos] = useState([]);

  const generateVideos = async () => {
    const res = await fetch("/api/getStockVideos?query=" + prompt);
    const data = await res.json();
    setVideos(data.videos || []);
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
