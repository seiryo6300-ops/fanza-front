export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const api_id = process.env.API_ID;
  const affiliate_id = process.env.AFFILIATE_ID;

  if (!api_id || !affiliate_id) {
    return Response.json(
      { error: "API_ID or AFFILIATE_ID missing" },
      { status: 400 }
    );
  }

  const url = `https://api.dmm.com/affiliate/v3/ItemDetail?api_id=${api_id}&affiliate_id=${affiliate_id}&site=FANZA&service=digital&floor=videoa&content_id=${id}&output=json`;

  const res = await fetch(url);
  const data = await res.json();

  return Response.json(data);
}
