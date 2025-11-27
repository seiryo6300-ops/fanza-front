"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("HUNT");
  const [results, setResults] = useState([]);

  // ⭐ トップページはランダム表示
  useEffect(() => {
    loadRandom();
  }, []);

  async function loadRandom() {
    try {
      const res = await fetch("/api/fanza/random");
      const json = await res.json();

      if (!json.result || !json.result.items) return;

      setResults(json.result.items);
    } catch (e) {
      console.error("Random error:", e);
    }
  }

  // ⭐ 検索
  const search = async () => {
    try {
      const res = await fetch(`/api/fanza?keyword=${keyword}`);
      const json = await res.json();

      if (!json.result || !json.result.items) {
        alert("検索結果がありません");
        return;
      }

      setResults(json.result.items);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>FANZA API 結果</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <button onClick={search} style={{ padding: "8px" }}>
          検索
        </button>
      </div>

      {/* 結果表示 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "25px",
        }}
      >
        {results.map((item, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
            }}
          >
            <img
              src={item.images?.large}
              alt={item.title}
              style={{ width: "100%", borderRadius: "6px" }}
            />

            <p style={{ fontWeight: "bold", fontSize: "14px", marginTop: "10px" }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
