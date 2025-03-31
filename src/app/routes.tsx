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
  
  // NFT Mintzone redirect
  {
    source: '/mint',
    destination: '/features/nft/mintzone',
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
    destination: '/features/nft/create',
    permanent: true,
  },
  {
    source: '/features/create/auction',
    destination: '/features/nft/create/auction',
    permanent: true,
  },
  {
    source: '/features/create/direct-listing',
    destination: '/features/nft/create/direct-listing',
    permanent: true,
  },
  {
    source: '/create',
    destination: '/features/nft/create',
    permanent: true,
  },
  {
    source: '/create/auction',
    destination: '/features/nft/create/auction',
    permanent: true,
  },
  {
    source: '/create/direct-listing',
    destination: '/features/nft/create/direct-listing',
    permanent: true,
  },
  {
    source: '/create/deploy',
    destination: '/features/nft/create/deploy',
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