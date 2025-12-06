"use client";

import { useEffect, useState } from "react";

export default function DetailPage({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/search?id=${params.id}`);
        const data = await res.json();

        if (data?.result?.items?.length > 0) {
          setItem(data.result.items[0]);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) return <p>読み込み中...</p>;
  if (!item) return <p>作品データが見つかりません</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1>{item.title}</h1>

      <img
        src={item.imageURL.large}
        alt={item.title}
        style={{
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}
      />

      <p style={{ marginTop: "15px" }}>
        <strong>発売日：</strong> {item.date}
      </p>

      <p>
        <strong>メーカー：</strong>
        {item.iteminfo?.maker?.map((m) => m.name).join(" / ")}
      </p>

      <p>
        <strong>出演：</strong>
        {item.iteminfo?.actress?.map((a) => a.name).join(" / ")}
      </p>

      <p>
        <strong>ジャンル：</strong>
        {item.iteminfo?.genre?.map((g) => g.name).join(" / ")}
      </p>

      <a
        href={item.affiliateURL}
        target="_blank"
        style={{
          display: "block",
          marginTop: "20px",
          background: "#E60033",
          color: "white",
          padding: "14px 20px",
          borderRadius: "8px",
          fontWeight: "bold",
          textAlign: "center",
          textDecoration: "none"
        }}
      >
        FANZAで作品を見る
      </a>

      {/* サンプル画像（小） */}
      {item.sampleImageURL?.sample_s?.image?.length > 0 && (
        <>
          <h2 style={{ marginTop: "30px" }}>サンプル画像</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {item.sampleImageURL.sample_s.image.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`sample-${i}`}
                style={{
                  width: "120px",
                  borderRadius: "6px"
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
