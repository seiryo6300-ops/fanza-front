"use client";
import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result.items[0]));
  }, [params.id]);

  if (!item) return <h2>読み込み中...</h2>;

  const img = item.imageURL.large;
  const sampleSmall = item.sampleImageURL?.sample_s?.image || [];
  const sampleLarge = item.sampleImageURL?.sample_l?.image || [];
  const sampleMovie = item.sampleMovieURL?.size_720_480;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      <img src={img} alt={item.title} width="320" />

      <h3>サンプル画像（小）</h3>
      {sampleSmall.map((s, i) => (
        <img key={i} src={s} width="160" style={{ margin: "5px" }} />
      ))}

      <h3>サンプル画像（大）</h3>
      {sampleLarge.map((s, i) => (
        <img key={i} src={s} width="320" style={{ margin: "5px" }} />
      ))}

      {sampleMovie && (
        <>
          <h3>サンプル動画</h3>
          <video width="480" controls src={sampleMovie}></video>
        </>
      )}
    </div>
  );
}
