"use client";

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import Link from "next/link";
import { client } from "@/app/client";
import { chain } from "@/app/constants/chain";

export default function Header() {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "discord", "telegram", "email", "x", "phone"], // Add or remove options as needed
      },
    }),
    createWallet("io.metamask"),
    createWallet("io.rabby"),
    createWallet("com.trustwallet.app"),
  ];

  return (
    <header className="p-4 bg-background dark:bg-background border-b border-border shadow relative">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-2">
          <img src="/favicon.ico" alt="delphi Logo" className="h-12 w-12" />
          <span className="text-lg font-bold text-foreground dark:text-foreground">
            delphi
          </span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link href="/" className="text-foreground hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/explore"
              className="text-foreground hover:text-primary"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link href="/create" className="text-foreground hover:text-primary">
              Create
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-foreground hover:text-primary">
              About
            </Link>
          </li>
        </ul>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          <ConnectButton
            client={client}
            wallets={wallets}
            chain={chain}
            connectButton={{
              label: "Connect Wallet",
              style: { fontSize: "0.75rem", height: "2.5rem" },
            }}
          />
        </div>
      </nav>
    </header>
  );
}