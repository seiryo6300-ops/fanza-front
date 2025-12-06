import fetch from "node-fetch";

export async function GET(req) {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("No URL", { status: 400 });
  }

  const res = await fetch(target, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.dmm.co.jp/",
    }
  });

  const buffer = await res.arrayBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type"),
      "Cache-Control": "public, max-age=86400",
    }
  });
}
