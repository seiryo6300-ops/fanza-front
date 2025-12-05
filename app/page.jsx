"use client";

import { useEffect, useState } from "react";
import { fanzaData } from "./data/retroData";

const DEFAULT_KEYWORD = "HUNT";

function getImageUrl(item) {
  const img = item.imageURL || {};
  return img.large || img.list || img.small || "/noimage.png";
}

export default function Home() {
  const [keyword, setKeyword] = useState(DEFAULT_KEYWORD);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandom = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/fanza/random");
      const json = await res.json();
      setResults(json.result?.items || []);
    } catch (err) {
      setError("ランダム取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = keyword.trim() || DEFAULT_KEYWORD;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/fanza?keyword=${encodeURIComponent(q)}`);
      const json = await res.json();
      setResults(json.result?.items || []);
    } catch (err) {
      setError("検索に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">FANZA API 結果</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="キーワードを入力"
          />
          <button className="search-button" type="submit">
            検索
          </button>
        </form>
      </header>

      {loading && <p>読み込み中...</p>}
      {error && <p>エラー: {error}</p>}

      {!loading && !error && (
        <>
          {results.length === 0 ? (
            <p>データがありません。</p>
          ) : (
            <section className="cards-grid">
              {results.map((item) => {
                const imgSrc = getImageUrl(item);

                return (
                  <article key={item.content_id} className="card">
                    <a
                      href={`/item/${item.content_id}`}
                      className="card-link"
                    >
                      <div className="card-thumb">
                        <img
                          src={imgSrc}
                          alt={item.title}
                          onError={(e) => (e.currentTarget.src = "/noimage.png")}
                        />
                      </div>

                      <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                      </div>
                    </a>

                    {/* ジャンルタグ */}
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
          )}
        </>
      )}
    </main>
  );
}
