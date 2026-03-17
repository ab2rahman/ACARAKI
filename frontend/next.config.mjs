/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8081',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '8081',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'festivaljamunusantara.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'api.festivaljamunusantara.com',
        pathname: '/storage/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default nextConfig;
