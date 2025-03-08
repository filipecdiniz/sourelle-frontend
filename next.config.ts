import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [], // Adicione o domínio do seu VPS
    unoptimized: true
  },
  serverRuntimeConfig: {
    host: '0.0.0.0',
    port: 8080
  },
  /* config options here */
};

export default nextConfig;
