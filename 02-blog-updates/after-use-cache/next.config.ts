import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    dynamicIO: true,
  },
}

export default nextConfig
