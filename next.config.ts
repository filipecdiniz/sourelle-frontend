import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [], // Adicione o domínio do seu VPS
    unoptimized: true
  },
  /* config options here */
};

export default nextConfig;
