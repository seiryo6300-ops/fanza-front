"use client";

import { useEffect, useState } from "react";

const DEFAULT_KEYWORD = "HUNT";

// 画像URLを取得する関数
function getImageUrl(item) {
  const img = item.imageURL || {};
  return img.large || img.list || img.small || "/noimage.png";
}

export default function Home() {
  const [keyword, setKeyword] = useState(DEFAULT_KEYWORD);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ランダム取得（トップ表示）
  const fetchRandom = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/fanza/random");
      if (!res.ok) throw new Error("ランダム取得に失敗しました");

      const json = await res.json();
      setResults(json.result?.items || []);
    } catch (err) {
      console.error(err);
      setError(err.message ?? "エラーが発生しました");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 検索
  const handleSearch = async (e) => {
    e.preventDefault();

    const q = keyword.trim() || DEFAULT_KEYWORD;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`/api/fanza?keyword=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("検索に失敗しました");

      const json = await res.json();
      setResults(json.result?.items || []);
    } catch (err) {
      console.error(err);
      setError(err.message ?? "エラーが発生しました");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // 初回ロードでランダム表示
  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <main className="page">
      {/* ヘッダー */}
      <header className="page-header">
        <h1 className="page-title">FANZA API 結果</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="キーワードを入力"
          />
          <button className="search-button">検索</button>
        </form>
      </header>

      {loading && <p className="info-text">読み込み中...</p>}
      {error && <p className="error-text">エラー: {error}</p>}

      {!loading && !error && (
        <>
          {results.length === 0 ? (
            <p className="info-text">データがありません。</p>
          ) : (
            <section className="cards-grid">
              {results.map((item) => {
                const imgSrc = getImageUrl(item);

                return (
                  <article key={item.content_id} className="card">
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noreferrer"
                      className="card-link"
                    >
                      <div className="card-thumb">
                        <img
                          src={imgSrc}
                          alt={item.title}
                          onError={(e) =>
                            (e.currentTarget.src = "/noimage.png")
                          }
                        />
                      </div>

                      <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                      </div>
                    </a>
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

<div className="card-genres">
  {item.genre?.map((g) => (
    <a key={g.name}
       href={`/genre/${g.name}`}
       className="genre-tag">
      {g.name}
    </a>
  ))}
</div>
