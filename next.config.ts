import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — a stray package-lock.json in the user home
  // directory otherwise makes Turbopack guess the wrong root.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Admin uploads photos through server actions; the default 1MB limit
      // rejects typical photos before they reach the action.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
