import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    // Use modern image formats for smaller file sizes
    formats: ['image/avif', 'image/webp'],
    // Limit image sizes to what we actually use
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Enable compression
  compress: true,
  // Strict powered-by header removal for security & smaller response
  poweredByHeader: false,
};

export default nextConfig;
