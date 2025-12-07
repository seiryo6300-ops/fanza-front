export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  const API_ID = process.env.API_ID;
  const AFFILIATE_ID = process.env.AFFILIATE_ID;

  if (!cid || !API_ID || !AFFILIATE_ID) {
    return Response.json({ error: "Missing parameters" }, { status: 400 });
  }

  const url = `https://api.dmm.com/affiliate/v3/ItemDetail?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&cid=${cid}&hits=1&output=json`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    const item = json?.result?.items?.[0] ?? null;

    return Response.json({ success: true, item });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
