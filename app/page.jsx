"use client";
import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?cid=${params.id}`)
      .then(res => res.json())
      .then(data => setItem(data.result.items[0]));
  }, [params.id]);

  if (!item) return <h2>読み込み中...</h2>;

  const img = item.imageURL.large;
  const sampleSmall = item.sampleImageURL?.sample_s?.image || [];
  const sampleLarge = item.sampleImageURL?.sample_l?.image || [];
  const sampleMovie = item.sampleMovieURL?.size_720_480;

  return (
    <main style={{ padding: "20px" }}>
      <h1>{item.title}</h1>
      <img src={`/api/proxy?url=${img}`} style={{ width: "300px", borderRadius: "10px" }} />

      <h2>サンプル画像</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
        {sampleSmall.map((src, i) => (
          <img key={i} src={`/api/proxy?url=${src}`} style={{ width: "100%" }} />
        ))}
      </div>

      <h2>サンプル動画</h2>
      {sampleMovie ? (
        <video
          src={`/api/proxy?url=${sampleMovie}`}
          controls
          style={{ width: "100%", maxWidth: "600px", marginTop: "15px" }}
        />
      ) : (
        <p>サンプル動画はありません</p>
      )}

      <h3>ジャンル</h3>
      <p>{item.iteminfo.genre.map(g => g.name).join(" / ")}</p>

      <h3>出演</h3>
      <p>{item.iteminfo.actress.map(a => a.name).join(" / ")}</p>

      <h3>メーカー</h3>
      <p>{item.iteminfo.maker[0].name}</p>

      <br />
      <a href="/" style={{ color: "blue" }}>← 一覧へ戻る</a>
    </main>
  );
}
