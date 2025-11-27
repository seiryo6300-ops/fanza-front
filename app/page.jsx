"use client";
import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("HUNT");
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(`/api/fanza?keyword=${keyword}`);
    const json = await res.json();

    if (!json.result || !json.result.items) {
      alert("データがありません");
      return;
    }

    setResults(json.result.items);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>FANZA API 結果</h1>

      {/* 検索ボックス */}
      <div style={{ marginBottom: "20px" }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="検索ワード"
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={search}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          検索
        </button>
      </div>

      {/* カード一覧（グリッド） */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {results.map((item) => (
          <div
            key={item.content_id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              background: "#fff",
            }}
          >
            <img
              src={item.imageURL.large}
              alt="thumbnail"
              style={{
                width: "100%",
                borderRadius: "6px",
              }}
            />
            <p style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.4" }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
