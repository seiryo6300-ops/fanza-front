import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    // cid または id の両対応にしておく
    const cid = searchParams.get("cid") || searchParams.get("id");

    if (!cid) {
      return NextResponse.json({ error: "No content ID provided" }, { status: 400 });
    }

    // FANZA API URL
    const apiURL = `https://api.dmm.com/affiliate/v3/ItemDetail?api_id=${process.env.API_ID}&affiliate_id=${process.env.AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&cid=${cid}&output=json`;

    const res = await fetch(apiURL);
    const data = await res.json();

    // JSON構造ずれ対策
    const item = data.result?.items?.[0] || null;

    return NextResponse.json({ raw: data, parsed: item });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
