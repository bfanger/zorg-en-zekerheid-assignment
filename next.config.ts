import type { NextConfig } from "next";
import fs from "node:fs";

const inDocker = fs.existsSync("/.dockerenv");

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  webpack: (config, { dev }) => {
    if (dev && inDocker) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.watchOptions = { poll: 1000 };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
};

export default nextConfig;
