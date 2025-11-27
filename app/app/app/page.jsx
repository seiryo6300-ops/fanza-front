"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        "https://fanza-proxy.vercel.app/api/fanza?keyword=HUNT&hits=10"
      );
      const data = await res.json();
      setItems(data.result?.items ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">FANZA 動画一覧（HUNT）</h1>

      {loading && <p>読み込み中…</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item) => (
          <a
            key={item.product_id}
            href={item.affiliateURL}
            target="_blank"
            className="bg-neutral-900 rounded overflow-hidden"
          >
            <img
              src={item.imageURL?.list || item.imageURL?.small}
              alt={item.title}
            />
            <div className="p-2">
              <p className="text-xs text-pink-300">
                {item.iteminfo?.maker?.[0]?.name}
              </p>
              <p className="text-sm line-clamp-2">{item.title}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
