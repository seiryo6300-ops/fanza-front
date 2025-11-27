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
    <div style={{ padding: "20px" }}>
      <h1>FANZA API 結果</h1>

      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="検索ワード"
        style={{ padding: "8px" }}
      />
      <button onClick={search} style={{ marginLeft: "10px" }}>
        検索
      </button>

      <div style={{ marginTop: "20px" }}>
        {results.map((item) => (
          <div key={item.content_id} style={{ marginBottom: "40px" }}>
            <img
              src={item.imageURL.large}
              alt="thumbnail"
              style={{ width: "200px" }}
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
