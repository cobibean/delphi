# DELPHI: The Multidimensional Nexus

*An Interdimensional Portal for Artists, Weirdos, and Degens Across the Omniverse*

![Delphi Banner](public/delphi-banner.png)

## About Delphi

Delphi is a reality-bending NFT marketplace built on the Metis blockchain. It's a place where digital artifacts from across the omniverse converge in a chaotic yet harmonious explosion of visual energy.

### Brand Pillars

1. **Reality Distortion**: Pushing the boundaries of conventional design with mind-bending visual effects
2. **Controlled Chaos**: Creating excitement through unexpected animations and interactions
3. **Dimensional Layering**: Building depth through overlapping elements and spatial anomalies
4. **Celestial Energy**: Infusing the UI with cosmic forces and pulsating energies

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **Web3**: thirdweb SDK
- **Blockchain**: Metis (Andromeda Network)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A thirdweb client ID (get one at [thirdweb.com](https://thirdweb.com))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/delphi.git
   cd delphi
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your thirdweb client ID:
   ```
   NEXT_PUBLIC_TEMPLATE_CLIENT_ID=your-client-id-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Features

- **Interdimensional Marketplace**: Browse and purchase NFTs from across the multiverse
- **Reality-Bending UI**: Experience a unique and immersive user interface with cosmic animations
- **Metis Integration**: Fast and low-cost transactions on the Metis blockchain
- **Wallet Connection**: Seamless wallet connection with thirdweb
- **Coming Soon**: No-code NFT collection creation tool

## Deployment

The app is configured for easy deployment on Vercel:

```bash
npm run build
# or
yarn build
```

## Customization

### Contract Addresses

You can easily update the marketplace contract address in `src/app/constants/contracts.ts`.

### Design System

The app follows the Delphi Design System 2.0: Cosmic Overload. The design system is implemented in:

- `tailwind.config.ts` - Colors, animations, and utilities
- `src/app/globals.css` - Base styles and components
- React components in `src/app/components/`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [thirdweb](https://thirdweb.com) for the Web3 SDK
- [Metis](https://metis.io) for the blockchain infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animations
