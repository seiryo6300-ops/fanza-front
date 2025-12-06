export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const cid = searchParams.get("cid");

  const res = await fetch(
    `https://api.dmm.com/affiliate/v3/ItemList?api_id=${process.env.API_ID}&affiliate_id=${process.env.AFF_ID}&site=FANZA&service=digital&floor=videoa&cid=${cid}&output=json`
  );

  const data = await res.json();
  return Response.json(data);
}
