export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword") || "HUNT";

  const API_ID = process.env.API_ID;
  const AFFILIATE_ID = process.env.AFFILIATE_ID;

  if (!API_ID || !AFFILIATE_ID) {
    return new Response(
      JSON.stringify({ error: "Missing API_ID or AFFILIATE_ID" }),
      { status: 500 }
    );
  }

  const url = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&hits=20&sort=date&keyword=${keyword}&output=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
