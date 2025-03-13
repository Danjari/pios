import { withPayload } from "@payloadcms/next/withPayload";
const nextConfig = {
  reactStrictMode: true,
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
export default withPayload(nextConfig);