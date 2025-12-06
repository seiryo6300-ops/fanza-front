export default function RedirectPage({ params }) {
  const base = "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=";

  const jumpUrl = `${base}${params.id}/`;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>移動しています...</h1>
      <p>開かない場合は下のリンクをクリックしてください</p>
      <a href={jumpUrl}>作品ページへ移動</a>

      <script
        dangerouslySetInnerHTML={{
          __html: `
           setTimeout(() => {
             window.location.href = "${jumpUrl}";
           }, 800);
          `,
        }}
      />
    </div>
  );
}
