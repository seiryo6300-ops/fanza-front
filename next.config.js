/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      }
    ],
    unoptimized: true, // これ重要！
  },
};

module.exports = nextConfig;
