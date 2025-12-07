"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result.items[0]));
  }, [params.id]);

  if (!item) return <h2>読み込み中...</h2>;

  const img = item.imageURL.large;
  const smallImages = [
    item.sampleImageURL?.sample_s?.image,
    item.sample_l?.image,
    item.sample_m?.image,
  ].filter(Boolean);

  const largeImages = item.sampleImageURL?.sample?.image || [];

  const movie = item.sampleMovieURL?.size_720_480 || item.sampleMovieURL?.size_560_360;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      <Image
        src={img}
        alt={item.title}
        width={400}
        height={600}
        style={{ height: "auto" }}
        unoptimized
      />

      {/* 小サンプル */}
      <h2>サンプル画像（小）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {smallImages.map((src, idx) => (
          <Image key={idx} src={src} alt="" width={200} height={140} unoptimized />
        ))}
      </div>

      {/* 大サンプル */}
      <h2>サンプル画像（大）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {largeImages.map((src, idx) => (
          <Image key={idx} src={src} alt="" width={300} height={200} unoptimized />
        ))}
      </div>

      {/* サンプル動画 */}
      <h2>サンプル動画</h2>
      {movie ? (
        <video
          src={movie}
          controls
          width="480"
          style={{ maxWidth: "100%", border: "1px solid #333" }}
        />
      ) : (
        <p>サンプル動画はありません</p>
      )}

      <p style={{ marginTop: "20px" }}>
        ▶{" "}
        <a href={item.URL} target="_blank" rel="noopener noreferrer">
          FANZAで作品を見る
        </a>
      </p>
    </div>
  );
}
