import type { Metadata } from "next";
import { Inter, Anton, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { client } from "./client";

// Import fonts
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Delphi - The Multidimensional Nexus",
  description:
    "An Interdimensional Portal for Artists, Weirdos, and Degens Across the Omniverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anton.variable} ${bebasNeue.variable} bg-oracle-black text-oracle-white`}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
