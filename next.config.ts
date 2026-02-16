import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/YuniversalDraft',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
