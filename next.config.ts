import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "export", // Enable static site export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
