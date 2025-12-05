"use client";

import { fanzaData } from "./data/retroData";

export default function Home() {
  const items = fanzaData; // ← もうAPI依存しない。これだけで表示

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">懐かしアーカイブ 2000〜2010年代</h1>
        <p className="page-sub">熟女 / 人妻 / 黄金期ベストセレクション</p>
      </header>

      <section className="cards-grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            {/* 作品ページ（アフィID付き） */}
            <a
              href={`${item.url}?affid=cozy-990`}
              className="card-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-thumb">
                <img
                  src={item.cover}
                  alt={item.title}
                  onError={(e) => (e.currentTarget.src = "/noimage.png")}
                />
              </div>

              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-meta">
                  {item.year}年頃 / {item.maker}
                </p>
              </div>
            </a>

            {/* カテゴリタグ（熟女 / 人妻 / 懐かし総集編など） */}
            <div className="card-genres">
              {item.category.map((c) => (
                <span key={c} className="genre-tag">
                  {c}
                </span>
              ))}
            </div>

            {/* 出演者（任意） */}
            <div className="card-actors">
              {item.people.map((p) => (
                <span key={p} className="actor-tag">
                  {p}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
