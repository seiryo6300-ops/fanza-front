"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("HUNT");
  const [results, setResults] = useState([]);

  // ▼ 初回ロードでランダム作品を取得
  useEffect(() => {
    getRandom();
  }, []);

  // ▼ ランダム20件取得
  const getRandom = async () => {
    const res = await fetch("/api/fanza/random");
    const json = await res.json();
    if (json.result?.items) {
      setResults(json.result.items);
    }
  };

  // ▼ 検索
  const search = async () => {
    const res = await fetch(`/api/fanza?keyword=${keyword}`);
    const json = await res.json();
    if (json.result?.items) {
      setResults(json.result.items);
    } else {
      alert("データがありません");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FANZA API 結果</h1>

      <input
        style={{ padding: "10px", width: "250px" }}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={search} style={{ marginLeft: "10px" }}>
        検索
      </button>

      <div style={{ marginTop: "30px" }}>
        {results.map((item) => (
          <div key={item.content_id} style={{ marginBottom: "40px" }}>
            <img src={item.imageURL.large} width="250" />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

        ))}
      </div>
    </div>
  );
}
