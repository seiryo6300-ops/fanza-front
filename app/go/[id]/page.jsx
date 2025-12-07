"use client";
import { useEffect, useState } from "react";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/search?cid=${params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("API RAW:", data);

        // どちらでも対応（items配列 / item単体）
        const result =
          data?.result?.items?.[0] ||
          data?.result?.item ||
          null;

        console.log("PARSED:", result);

        setItem(result);
      })
      .catch(err => console.error("Fetch Error:", err))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <h2>読み込み中...</h2>;
  if (!item) return <h2>データ取得できませんでした</h2>;

  // 必ず null 回避
  const img = item?.imageURL?.large || "";
  const smallImages = item?.sampleImageURL?.sample_s?.image || [];
  const largeImages = item?.sampleImageURL?.sample_l?.image || [];
  const sampleMovie = item?.sampleMovieURL?.size_720_480 || null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title || "タイトル不明"}</h1>

      {img && (
        <img
          src={img}
          alt="ジャケット"
          style={{ width: "300px", borderRadius: "10px" }}
        />
      )}

      <h2>サンプル画像（小）</h2>
      {smallImages.length === 0 && <p>なし</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {smallImages.map((src, i) => (
          <img key={i} src={src} style={{ width: "150px" }} />
        ))}
      </div>

      <h2>サンプル画像（大）</h2>
      {largeImages.length === 0 && <p>なし</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {largeImages.map((src, i) => (
          <img key={i} src={src} style={{ width: "300px" }} />
        ))}
      </div>

      <h2>サンプル動画</h2>
      {sampleMovie ? (
        <video controls width="480" src={sampleMovie} />
      ) : (
        <p>無し</p>
      )}

      <p style={{ marginTop: "20px" }}>
        <a href={item.URL} target="_blank" rel="noopener noreferrer">
          ▶ FANZAで作品を見る
        </a>
      </p>
    </div>
  );
}
