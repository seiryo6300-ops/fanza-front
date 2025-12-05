"use client";

import { fanzaData } from "@/app/data/retroData";

export default function ItemDetail({ params }) {
  const id = params.id;
  const item = fanzaData.find((v) => v.id === id);

  if (!item) return <p>データがありません</p>;

  return (
    <main className="detail-page">
      <header className="detail-header">
        <h1 className="detail-title">{item.title}</h1>
      </header>

      <div className="detail-body">
        <img
          className="detail-img"
          src={item.cover}
          alt={item.title}
          onError={(e) => (e.currentTarget.src = "/noimage.png")}
        />

        <p className="detail-meta">{item.year}年頃 / {item.maker}</p>

        <div className="detail-tags">
          {item.category.map((c) => (
            <span key={c} className="detail-tag">{c}</span>
          ))}
        </div>

        <div className="detail-actors">
          {item.people.map((p) => (
            <span key={p} className="detail-actor">{p}</span>
          ))}
        </div>

        <a
          href={
            item.url +
            (item.url.includes("?") ? "&" : "?") +
            `affid=${item.static ? "cozy-001" : "cozy-990"}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="detail-buy-button"
        >
          FANZAで作品を見る →
        </a>
      </div>
    </main>
  );
}
