"use client";

import { fanzaData } from "./data/retroData";
import Image from "next/image";

export default function Home() {
  return (
    <main className="page">
      <header className="page-header">
        <h1>2000〜2010年代アーカイブ</h1>
        <p>熟女・人妻・懐かし黄金期コレクション</p>
      </header>

      <section className="cards-grid">
        {fanzaData.map((item) => (
          <article key={item.id} className="card">
            <a
              href={`${item.url}?affid=${item.static ? "cozy-001" : "cozy-990"}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card-thumb">
                <Image
                  src={item.cover}
                  alt={item.title}
                  width={360}
                  height={500}
                  unoptimized
                />
              </div>
              <div className="card-body">
                <h2>{item.title}</h2>
                <p>{item.year}年頃 / {item.maker}</p>
              </div>
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
