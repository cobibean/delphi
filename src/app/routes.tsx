/**
 * This file defines redirects from old paths to new feature-based paths
 * To be used in next.config.js
 */

const redirects = [
  // Marketplace redirects
  {
    source: '/',
    destination: '/features/marketplace',
    permanent: true,
  },

  // NFT redirects
  {
    source: '/nft/:id',
    destination: '/features/nft/:id',
    permanent: true,
  },

  // Profile redirects
  {
    source: '/profile',
    destination: '/features/profile',
    permanent: true,
  },
  {
    source: '/my-listings',
    destination: '/features/profile/my-listings',
    permanent: true,
  },
  {
    source: '/my-nfts',
    destination: '/features/profile/my-nfts',
    permanent: true,
  },

  // Create redirects - REVERSED DIRECTION
  {
    source: '/features/create',
    destination: '/create',
    permanent: true,
  },
  {
    source: '/features/create/auction',
    destination: '/create/auction',
    permanent: true,
  },
  {
    source: '/features/create/direct-listing',
    destination: '/create/direct-listing',
    permanent: true,
  },

  // Stats redirects
  {
    source: '/stats',
    destination: '/features/stats',
    permanent: true,
  },

  // Debug redirects
  {
    source: '/debug',
    destination: '/features/debug',
    permanent: true,
  },
];

// Use CommonJS exports for compatibility with next.config.js
module.exports = { redirects }; 