"use client";

import { fanzaData } from "./data/retroData";

export default function Home() {
  const items = fanzaData;

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">2000〜2010年代アーカイブ</h1>
        <p className="page-sub">熟女・人妻・懐かし黄金期コレクション</p>
      </header>

      <section className="cards-grid">
        {items.map((item) => (
          <article key={item.id} className="card">
            <a
              href={
                item.url +
                (item.url.includes("?") ? "&" : "?") +
                `affid=${item.static ? "cozy-001" : "cozy-990"}`
              }
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

            <div className="card-tags">
              {item.category.map((c) => (
                <span key={c} className="genre-tag">{c}</span>
              ))}
            </div>

            <div className="card-actors">
              {item.people.map((p) => (
                <span key={p} className="actor-tag">{p}</span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
