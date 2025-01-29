// src/pages/_app.tsx
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css"; // Import global styles

const activeChain = "mainnet"; // Change to your deployed contract's chain (e.g., "goerli" for testnet)

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;