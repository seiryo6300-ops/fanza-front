"use client";
import { useEffect, useState } from "react";

export default function DetailPage({ params }) {
  const { id } = params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/search?id=${id}`);
        const data = await res.json();

        console.log("API RAW:", data);

        if (data.success && data.item) setItem(data.item);
        else setItem(null);
      } catch (error) {
        console.error(error);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p style={{ fontSize: "24px" }}>読み込み中…</p>;
  if (!item) return <p style={{ fontSize: "24px" }}>データ取得できませんでした</p>;

  const imagesSmall = item?.imageURL?.sample_s?.image || [];
  const imagesLarge = item?.imageURL?.sample_l?.image || [];
  const video = item?.sampleMovieURL?.size_644_414;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      {/* ジャケット */}
      <img
        src={item.imageURL?.large}
        alt={item.title}
        style={{ width: "300px", marginBottom: "20px" }}
      />

      {/* 小サンプル */}
      <h2>サンプル画像（小）</h2>
      {imagesSmall.length === 0 && <p>小サンプルなし</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imagesSmall.map((src, i) => (
          <img key={i} src={src} alt="" style={{ width: "180px" }} />
        ))}
      </div>

      {/* 大サンプル */}
      <h2 style={{ marginTop: "40px" }}>サンプル画像（大）</h2>
      {imagesLarge.length === 0 && <p>大サンプルなし</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {imagesLarge.map((src, i) => (
          <img key={i} src={src} alt="" style={{ width: "300px" }} />
        ))}
      </div>

      {/* サンプル動画 */}
      <h2 style={{ marginTop: "40px" }}>サンプル動画</h2>
      {!video && <p>動画なし</p>}
      {video && (
        <video
          controls
          src={video}
          style={{ width: "100%", maxWidth: "700px" }}
        />
      )}

      {/* FANZAリンク */}
      <p style={{ marginTop: "30px" }}>
        <a
          href={item.URL}
          target="_blank"
          style={{ fontSize: "20px", color: "blue" }}
        >
          ▶ FANZAで作品を見る
        </a>
      </p>
    </div>
  );
}
