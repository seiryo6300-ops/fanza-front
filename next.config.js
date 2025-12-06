/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pics.dmm.co.jp",
      "www.dmm.co.jp",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pics.dmm.co.jp",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.dmm.co.jp",
        pathname: "/**",
      },
    ],
    unoptimized: true,  // ← これが最重要！
  },
};

module.exports = nextConfig;
