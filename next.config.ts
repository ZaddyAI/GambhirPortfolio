import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400, 3840],
  },
  async redirects() {
    return [
      {
        source: "/gambhir.pdf",
        destination: "/resume",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
