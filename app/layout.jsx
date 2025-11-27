import "./globals.css";

export const metadata = {
  title: "FANZA Viewer",
  description: "FANZA API Viewer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
