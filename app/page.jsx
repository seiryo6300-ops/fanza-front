"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("熟女");
  const [loading, setLoading] = useState(false);

  // API取得
  const fetchData = async (kw) => {
    setLoading(true);
    const res = await fetch(`/api/fanza?keyword=${kw}`);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(keyword);
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">

      {/* タイトル */}
      <h1 className="text-3xl font-bold mb-4">FANZA API 結果</h1>

      {/* 🔍検索ボックス */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="キーワード検索（例：熟女・人妻）"
        />
        <button
          onClick={() => fetchData(keyword)}
          className="bg-blue-600 text-white px-4 rounded"
        >
          検索
        </button>
      </div>

      {/* 🔥カテゴリーボタン */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["熟女", "人妻", "不倫", "近親", "美魔女", "HUNT"].map((cat) => (
          <button
            key={cat}
            onClick={() => { setKeyword(cat); fetchData(cat); }}
            className="bg-gray-800 text-white px-3 py-1 rounded whitespace-nowrap"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ローディング */}
      {loading && <p className="text-xl">読み込み中…</p>}

      {/* グリッド一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="bg-white shadow rounded overflow-hidden hover:scale-105 transition"
          >
            <img
              src={item.imageURL}
              alt={item.title}
              className="w-full object-cover"
            />
            <div className="p-2 text-sm">
              <div className="font-bold">{item.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 0件時 */}
      {items.length === 0 && !loading && (
        <p className="mt-4 text-gray-600">該当作品がありません。</p>
      )}
    </div>
  );
}

