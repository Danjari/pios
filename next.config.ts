import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack:(config)=>{
    config.resolve.fallback = {
      fs: false,
      worker_threads:false,
      readline: false,
    };
    return config;
  }
};

export default withPayload(nextConfig);
