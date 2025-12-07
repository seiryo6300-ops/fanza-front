export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) return Response.json({ success: false, item: null });

  try {
    const API_ID = process.env.API_ID;
    const AFFILIATE_ID = process.env.AFFILIATE_ID;

    const url = `https://api.dmm.co.jp/affiliate/v3/ItemList?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&cid=${id}&output=json`;

    const res = await fetch(url);
    const data = await res.json();

    console.log("RAW:", data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
