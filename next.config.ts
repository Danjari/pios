import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: "loose" }, // Helps with Node.js modules in Next.js 15
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      worker_threads: false,
      readline: false,
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      path: require.resolve("path-browserify"),
    };
    return config;
  },
};

export default withPayload(nextConfig as NextConfig);