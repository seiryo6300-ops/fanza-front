"use client";

import { useEffect, useState, useRef } from "react";
import Hls from "hls.js";

export default function ItemPage({ params }) {
  const [item, setItem] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch(`/api/search?cid=${params.id}`)
      .then((res) => res.json())
      .then((data) => setItem(data.result.items[0]));
  }, [params.id]);

  // 動画プレイヤーセット
  useEffect(() => {
    if (!item || !item.sampleMovieURL) return;

    const url =
      item.sampleMovieURL.size_720_480 ||
      item.sampleMovieURL.size_476_306;

    if (!url) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // iPhone Safari 等
      videoRef.current.src = url;
    }
  }, [item]);

  if (!item) return <h2 style={{ padding: "20px" }}>読み込み中...</h2>;

  const img = item.imageURL?.large;
  const sampleSmall = item.sampleImageURL?.sample_s;
  const sampleLarge = item.sampleImageURL?.sample_l;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{item.title}</h1>

      <img
        src={img}
        alt={item.title}
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          display: "block",
        }}
      />

      <h2>サンプル画像（小）</h2>
      <div className="grid">
        {sampleSmall?.map((url, idx) => (
          <img key={idx} src={url} alt="" />
        ))}
      </div>

      <h2>サンプル画像（大）</h2>
      <div className="gridBig">
        {sampleLarge?.map((url, idx) => (
          <img key={idx} src={url} alt="" />
        ))}
      </div>

      <h2>サンプル動画</h2>
      <video
        ref={videoRef}
        controls
        playsInline
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "8px",
          background: "#000",
          marginTop: "20px",
        }}
      ></video>

      <a
        href={item.URL}
        target="_blank"
        style={{
          display: "block",
          marginTop: "30px",
          fontSize: "20px",
          color: "blue",
        }}
      >
        ▶ FANZAで作品を見る
      </a>

      {/* ====== Layout CSS ====== */}
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
          margin: 20px 0;
        }

        .grid img {
          width: 100%;
          border-radius: 6px;
          object-fit: cover;
        }

        .gridBig {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          margin: 20px 0;
        }

        .gridBig img {
          width: 100%;
          border-radius: 6px;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}
