import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/YuniversalDraft',
  assetPrefix: '/YuniversalDraft',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
