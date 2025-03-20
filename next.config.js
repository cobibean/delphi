/** @type {import('next').NextConfig} */
const { redirects } = require('./src/app/routes.tsx');

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
  async redirects() {
    return redirects;
  },
  webpack: (config, { isServer }) => {
    // Add handling for native modules
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

module.exports = nextConfig; 