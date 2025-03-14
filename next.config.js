/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io'],
  },
  async rewrites() {
    return [
      {
        source: '/temp/:path*',
        destination: '/api/static/:path*',
      },
      {
        source: '/assets/:path*',
        destination: '/api/static/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 