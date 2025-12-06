/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "pics.dmm.co.jp", 
      "www.dmm.co.jp"
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
  },
};

module.exports = nextConfig;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pics.dmm.co.jp",
      },
    ],
    unoptimized: true, // これ重要！
  },
};

module.exports = nextConfig;

