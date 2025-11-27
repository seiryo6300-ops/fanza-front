export default async function handler(req, res) {
  try {
    const keyword = req.query.keyword || "熟女";

    const API_ID = process.env.API_ID;
    const AFFILIATE_ID = process.env.AFFILIATE_ID;

    const url = `https://api.dmm.com/affiliate/v3/ItemList?api_id=${API_ID}&affiliate_id=${AFFILIATE_ID}&site=DMM&service=digital&floor=videoa&hits=20&keyword=${encodeURIComponent(keyword)}&output=json`;

    const response = await fetch(url);
    const data = await response.json();

    const items =
      data.result?.items?.map((item) => ({
        title: item.title,
        imageURL: item.imageURL?.large || item.sampleImageURL || "",
      })) || [];

    res.status(200).json({ items });
  } catch (err) {
    res.status(500).json({ error: "API Error", detail: err.message });
  }
}
