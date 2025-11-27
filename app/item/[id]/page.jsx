"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ItemDetail({ params }) {
  const { id } = params;
  const [item, setItem] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/fanza?keyword=${id}`);
        const json = await res.json();
        const data = json.result?.items?.[0];
        setItem(data);
      } catch (err) {
        setError("データ取得に失敗しました");
      }
    };

    fetchDetail();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!item) return <p>読み込み中...</p>;

  return (
    <main className="page">
      <Link href="/" className="back-link">
        ← 戻る
      </Link>

      <div className="detail-container">
        <div className="detail-thumb">
          <img
            src={item.imageURL?.large || item.imageURL?.list}
            alt={item.title}
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{item.title}</h1>

          {item.date && <p>発売日：{item.date}</p>}
          {item.maker && <p>メーカー：{item.maker}</p>}
          {item.actress && (
            <p>
              出演：{" "}
              {item.actress.map((a) => (
                <span key={a.name}>{a.name} </span>
              ))}
            </p>
          )}

          {item.sampleMovieURL && (
            <div className="movie-box">
              <h2>サンプル動画</h2>
              <video
                src={item.sampleMovieURL}
                controls
                width="100%"
                style={{ borderRadius: "10px" }}
              />
            </div>
          )}

          <a
            href={item.URL}
            target="_blank"
            className="detail-buy-button"
          >
            FANZAで作品を見る →
          </a>
        </div>
      </div>
    </main>
  );
}
