"use client";
import { useEffect, useState } from "react";

export default function TestPage({ params }) {
  const { id } = params;
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    async function run() {
      const res = await fetch(`/api/search?id=${id}`);
      const data = await res.json();
      console.log("API:", data);
      setRaw(data);
    }
    run();
  }, [id]);

  if (!raw) return <p>読み込み中…</p>;

  return (
    <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
      {JSON.stringify(raw, null, 2)}
    </pre>
  );
}
