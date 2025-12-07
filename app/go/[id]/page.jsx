"use client";

import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/search?id=${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);
        setItem(data.item);
      })
      .catch((err) => console.error(err));
  }, [params.id]);

  if (!item) return <h2>読み込み中…</h2>;

  const smallImages = item?.sampleImageURL?.sample_s || [];
  const largeImages = item?.sampleImageURL?.sample_l || [];
  const sampleMovie = item?.sampleMovieURL?.size_720_480;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      {item.imageURL?.large && (
        <img
          src={item.imageURL.large}
          alt={item.title}
          style={{ maxWidth: "300px" }}
        />
      )}

      <h2>サンプル画像（小）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {smallImages.length > 0 ? (
          smallImages.map((img, i) => (
            <img key={i} src={img.image} width="160" />
          ))
        ) : (
          <p>小サンプル画像なし</p>
        )}
      </div>

      <h2>サンプル画像（大）</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {largeImages.length > 0 ? (
          largeImages.map((img, i) => (
            <img key={i} src={img.image} width="260" />
          ))
        ) : (
          <p>大サンプル画像なし</p>
        )}
      </div>

      <h2>サンプル動画</h2>
      {sampleMovie ? (
        <video width="480" controls src={sampleMovie} />
      ) : (
        <p>サンプル動画なし</p>
      )}

      <p style={{ marginTop: "30px" }}>
        <a href={item.URL} target="_blank" rel="noopener noreferrer">
          ▶ FANZAで作品を見る
        </a>
      </p>
    </div>
  );
}
