"use client";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { id } = params;
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/search?id=${id}`);
        const raw = await res.json();
        console.log("RAW:", raw);

        // ★ result.items ではなく result.item
        const item =
          raw?.result?.item ||
          raw?.result?.items?.[0] ||
          null;

        console.log("PARSED:", item);

        if (!item) {
          setError(true);
        } else {
          setData(item);
        }
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }

    fetchData();
  }, [id]);

  if (error) return <h2>データ取得できませんでした</h2>;
  if (!data) return <h2>読み込み中...</h2>;

  return (
    <div>
      <h1>{data.title}</h1>

      <img
        src={data.imageURL.large}
        width="300"
        alt={data.title}
      />

      <h2>サンプル動画</h2>
      {data.sampleMovieURL?.size_644_480 && (
        <video controls width="480">
          <source src={data.sampleMovieURL.size_644_480} type="video/mp4" />
        </video>
      )}

      <a href={data.URL} target="_blank">
        ▶ FANZAで作品を見る
      </a>
    </div>
  );
}
