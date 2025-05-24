import type { NextConfig } from "next";

const nextConfig = {
  webpack: (config: any) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
