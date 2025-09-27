import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // если нужно
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.techbob.de",
      },
    ],
  },
};

export default nextConfig;


