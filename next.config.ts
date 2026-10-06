import type { NextConfig } from "next";
import fs from "node:fs";

const inDocker = fs.existsSync("/.dockerenv");

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { dev }) => {
    if (dev && inDocker) {
      config.watchOptions = { poll: 1000 };
    }
    return config;
  },
};

export default nextConfig;
