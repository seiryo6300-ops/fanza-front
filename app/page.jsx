"use client";
import { retroData } from "./data/retroData";

export default function Home() {
  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-title">2000〜2010年代アーカイブ</h1>
        <p className="page-sub">熟女・人妻・懐かし黄金期コレクション</p>
      </header>

      <section className="cards-grid">
        {retroData.map((item) => (
          <article key={item.id} className="card">
            <a
              href={
                item.url +
                (item.url.includes("?") ? "&" : "?") +
                `affid=${item.static ? "cozy-001" : "cozy-990"}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              <div className="card-thumb">
                <img src={item.cover} alt={item.title} />
              </div>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.year}年 / {item.maker}</p>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
