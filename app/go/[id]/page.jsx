"use client";
import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result.items[0]))
      .catch((e) => console.error("API Error:", e));
  }, [params.id]);

  if (!item) return <h2>読み込み中...</h2>;

  const img = item.imageURL?.large;
  const sampleSmall = item.sampleImageURL?.sample_s?.image || [];
  const sampleLarge = item.sampleImageURL?.sample_l?.image || [];
  const sampleMovie = item.sampleMovieURL?.size_720_480;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>
      <img src={img} alt={item.title} width="300" />

      <h2>サンプル画像（小）</h2>
      {sampleSmall.map((src, i) => (
        <img key={i} src={src} alt={`sample_s_${i}`} width="150" />
      ))}

      <h2>サンプル画像（大）</h2>
      {sampleLarge.map((src, i) => (
        <img key={i} src={src} alt={`sample_l_${i}`} width="300" />
      ))}

      <h2>サンプル動画</h2>
      {sampleMovie && (
        <video width="480" controls src={sampleMovie} />
      )}

      <a
        href={item.affiliateURL}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "20px", display: "block", marginTop: "20px" }}
      >
        ▶ FANZAで作品を見る
      </a>
    </div>
  );
}
