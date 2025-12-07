"use client";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { cid } = params;
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/search?cid=${cid}`);
        const data = await res.json();
        console.log("API DATA:", data);

        if (data?.item) {
          setItem(data.item);
        } else {
          setItem(null);
        }
      } catch {
        setItem(null);
      }
      setLoading(false);
    }
    fetchData();
  }, [cid]);

  if (loading) return <p>読み込み中...</p>;
  if (!item) return <p>データ取得できませんでした</p>;

  return (
    <div>
      <h1>{item.title}</h1>

      {/* ジャケット画像 */}
      {item.imageURL?.large && <img src={item.imageURL.large} width="300" />}

      <h2>サンプル画像（小）</h2>
      {item.sampleImageURL?.sample_s?.image?.length > 0 ? (
        item.sampleImageURL.sample_s.image.map((img, i) => (
          <img key={i} src={img} width="180" />
        ))
      ) : (
        <p>小サンプル画像なし</p>
      )}

      <h2>サンプル画像（大）</h2>
      {item.sampleImageURL?.sample_l?.image?.length > 0 ? (
        item.sampleImageURL.sample_l.image.map((img, i) => (
          <img key={i} src={img} width="300" />
        ))
      ) : (
        <p>大サンプル画像なし</p>
      )}

      <h2>サンプル動画</h2>
      {item.sampleMovieURL?.size_476_306 || item.sampleMovieURL?.size_644_484 ? (
        <video src={item.sampleMovieURL.size_476_306 ?? item.sampleMovieURL.size_644_484} controls width="480" />
      ) : (
        <p>動画なし</p>
      )}

      <br /><br />
      <a href={item.URL} target="_blank">
        ▶ FANZAで作品を見る
      </a>
    </div>
  );
}
