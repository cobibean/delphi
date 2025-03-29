export const dynamic = 'force-static';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delphi | The Center of the World - NFT Marketplace',
  description: 'Discover and trade NFTs at Delphi - the center of the world for artists, weirdos, and degens on Metis and beyond.',
  icons: {
    icon: [
      {
        url: '/facicon.png',
        sizes: 'any',
        type: 'image/png',
      }
    ],
    apple: [
      {
        url: '/facicon.png',
        sizes: 'any',
      }
    ],
    shortcut: '/facicon.png',
  },
  manifest: '/site.webmanifest',
}; 