/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_ID: process.env.API_ID,
    AFFILIATE_ID: process.env.AFFILIATE_ID,
  },
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
    unoptimized: true,
  },
};

module.exports = nextConfig;
