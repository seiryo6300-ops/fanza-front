"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GenrePage({ params }) {
  const { id } = params;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const res = await fetch(`/api/fanza?keyword=${encodeURIComponent(id)}`);
        const json = await res.json();
        setResults(json.result?.items || []);
      } catch (e) {
        setError("データ取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchGenre();
  }, [id]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="page">
      <Link href="/" className="back-link">
        ← トップへ戻る
      </Link>

      <h1 className="page-title">
        ジャンル: {decodeURIComponent(id)}
      </h1>

      <section className="cards-grid">
        {results.map((item) => {
          const img =
            item.imageURL?.large ||
            item.imageURL?.list ||
            item.imageURL?.small ||
            "/noimage.png";

          return (
            <article key={item.content_id} className="card">
              <a href={`/item/${item.content_id}`} className="card-link">
                <div className="card-thumb">
                  <img
                    src={img}
                    alt={item.title}
                    onError={(e) => (e.currentTarget.src = "/noimage.png")}
                  />
                </div>

                <div className="card-body">
                  <h2 className="card-title">{item.title}</h2>
                </div>
              </a>

              {/* ジャンルタグを詳細ページの下にも表示 */}
              <div className="card-genres">
                {item.genre?.map((g) => (
                  <a
                    key={g.name}
                    href={`/genre/${g.name}`}
                    className="genre-tag"
                  >
                    {g.name}
                  </a>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
