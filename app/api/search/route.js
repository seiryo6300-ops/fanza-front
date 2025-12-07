import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const cid = searchParams.get("cid") || searchParams.get("id");

    if (!cid) {
      return NextResponse.json({ error: "cid required" }, { status: 400 });
    }

    const apiURL = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${process.env.API_ID}&affiliate_id=${process.env.AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&keyword=${cid}&hits=1&output=json`;

    const res = await fetch(apiURL);
    const data = await res.json();

    console.log("RAW:", data);

    const item = data.result?.items?.[0] || null;

    if (!item) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ raw: data, parsed: item });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
