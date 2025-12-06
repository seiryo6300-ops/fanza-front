export async function GET(req) {
  const url = new URL(req.url).searchParams.get("url");

  if (!url) {
    return new Response("No URL", { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://www.dmm.co.jp/",
    },
  });

  const buffer = await res.arrayBuffer();
  return new Response(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
