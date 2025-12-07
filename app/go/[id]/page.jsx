"use client";

import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setItem(data.item); // ← ここ決定！
      });
  }, [params.id]);

  if (!item) return <h2>読み込み中…</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      <img
        src={item.imageURL.large}
        alt={item.title}
        style={{ maxWidth: "300px" }}
      />

      <h2>サンプル画像（小）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {item.sampleImageURL.sample_s?.map((img, i) => (
          <img key={i} src={img.image} width="180" />
        ))}
      </div>

      <h2>サンプル画像（大）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {item.sampleImageURL.sample_l?.map((img, i) => (
          <img key={i} src={img.image} width="300" />
        ))}
      </div>

      <h2>サンプル動画</h2>
      {item.sampleMovieURL?.size_720_480 && (
        <video
          width="480"
          controls
          src={item.sampleMovieURL.size_720_480}
        />
      )}

      <p style={{ marginTop: "30px" }}>
        <a href={item.URL} target="_blank" rel="noopener noreferrer">
          ▶ FANZAで作品を見る
        </a>
      </p>
    </div>
  );
}
