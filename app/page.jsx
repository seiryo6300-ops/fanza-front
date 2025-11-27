export default async function Page() {
  const res = await fetch(
    "https://fanza-proxy.vercel.app/api/fanza?keyword=HUNT&hits=10",
    { cache: "no-store" }
  );
  const data = await res.json();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">FANZA API 結果</h1>

      {data?.result?.items?.map((item) => (
        <div key={item.content_id} className="mb-4 p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <img
            src={item.imageURL?.small}
            alt=""
            className="mt-2 w-40 border"
          />
        </div>
      ))}
    </main>
  );
}
