"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-16 py-10 bg-gradient-to-b from-gray-900 to-oracle-night text-oracle-parchment">
      {/* Top decorative border - Greek key pattern */}
      <div className="absolute top-0 left-0 w-full h-4 overflow-hidden">
        <div className="flex">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="h-4 w-4 border-t-2 border-l-2 border-oracle-orange/30" 
              style={{ marginRight: "8px" }}
            />
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-3">
            <span className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-oracle-orange to-oracle-gold">
              Delphi
            </span>
          </div>
          <p className="text-sm text-oracle-parchment/70 font-accent italic text-center max-w-md">
            Where digital prophecies are discovered and traded. The modern oracle for digital collectibles.
          </p>
        </div>
        
        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-center">
          <div className="space-y-3">
            <h3 className="font-display text-sm text-oracle-orange mb-3">Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Create
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-display text-sm text-oracle-orange mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-display text-sm text-oracle-orange mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-display text-sm text-oracle-orange mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-oracle-parchment/70 hover:text-oracle-orange transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider with Greek key pattern */}
        <div className="oracle-divider mb-6"></div>
        
        {/* Credits */}
        <div className="text-center text-sm text-oracle-parchment/50">
          <p>
            Powered by <Link href="/" className="text-oracle-orange hover:text-oracle-gold transition-colors font-medium">Yeti-Apes & Vesta</Link>
          </p>
          <p className="mt-2 font-accent italic text-xs">
            © {new Date().getFullYear()} Delphi. All prophecies reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}