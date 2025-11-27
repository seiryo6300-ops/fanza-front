export async function GET() {
  const API_ID = process.env.API_ID;
  const AFFILIATE_ID = process.env.AFFILIATE_ID;

  const url = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&hits=20&sort=rank`;

  try {
    const res = await fetch(url);
    const json = await res.json();

    return Response.json(json);
  
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
