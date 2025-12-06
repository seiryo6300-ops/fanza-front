import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  // id が無い場合
  if (!id) {
    return NextResponse.json(
      { error: "id がありません。" },
      { status: 400 }
    );
  }

  try {
    // ここが FANZA 公式レスポンス取得
    const url = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${process.env.API_ID}&affiliate_id=${process.env.AFFILIATE_ID}&site=FANZA&service=digital&floor=videoa&hits=1&sort=date&cid=${id}`;
    const res = await fetch(url);
    const data = await res.json();

    // items 配列抽出
    const items = data?.result?.items || [];

    // 1件もない場合
    if (!items.length) {
      return NextResponse.json(
        { error: "作品データがありません。" },
        { status: 404 }
      );
    }

    // 作品詳細 1件返す
    return NextResponse.json({
      status: 200,
      item: items[0],
    });
  } catch (err) {
    return NextResponse.json(
      { error: "検索取得に失敗しました。" },
      { status: 500 }
    );
  }
}
