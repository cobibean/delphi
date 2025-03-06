"use client";

import Link from "next/link";
import WalletConnection from "./WalletConnection";

export default function Header() {
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
          <li>
            <Link href="/test" className="text-foreground hover:text-primary">
              Test
            </Link>
          </li>
        </ul>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          <WalletConnection />
        </div>
      </nav>
    </header>
  );
}