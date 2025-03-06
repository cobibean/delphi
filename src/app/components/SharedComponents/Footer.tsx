"use client";

import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";

export default function Footer() {
  const { isDegenMode } = useContext(ThemeContext);
  
  return (
    <footer className="relative mt-16 py-10 bg-gutter-glow text-sinister-scroll">
      {/* Top decorative border - Scorched pattern */}
      <div className="absolute top-0 left-0 w-full h-1 overflow-hidden">
        <div className="h-1 w-full bg-oracle-embers opacity-30"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-3">
            <span className={`font-heading text-xl font-bold text-transparent bg-clip-text ${
              isDegenMode ? 'bg-oracle-embers' : 'bg-tarnished-fortune'
            } uppercase tracking-wider`}>
              {isDegenMode ? 'Dark Oracle' : 'Delphi'}
            </span>
          </div>
          <p className={`text-sm text-sinister-scroll/70 font-accent italic text-center max-w-md ${
            isDegenMode ? 'text-blood' : ''
          }`}>
            {isDegenMode 
              ? "Where digital prophecies are forged in darkness. The twisted oracle for the damned and degenerate."
              : "Where digital prophecies are discovered and traded. The modern oracle for digital collectibles."}
          </p>
        </div>
        
        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-center">
          <div className="space-y-3">
            <h3 className={`font-heading text-sm ${
              isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'
            } mb-3 uppercase tracking-wider`}>Marketplace</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/collections" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/create" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Create
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className={`font-heading text-sm ${
              isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'
            } mb-3 uppercase tracking-wider`}>Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className={`font-heading text-sm ${
              isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'
            } mb-3 uppercase tracking-wider`}>Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="https://discord.com" target="_blank" rel="noopener noreferrer" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Discord
                </Link>
              </li>
              <li>
                <Link href="https://telegram.org" target="_blank" rel="noopener noreferrer" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Telegram
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className={`font-heading text-sm ${
              isDegenMode ? 'text-sinister-red' : 'text-sinister-orange'
            } mb-3 uppercase tracking-wider`}>Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={`text-sinister-scroll/70 ${
                  isDegenMode ? 'hover:text-sinister-red' : 'hover:text-sinister-orange'
                } transition-colors font-heading uppercase text-xs tracking-wider`}>
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider with scorched pattern */}
        <div className="dark-degen-divider mb-6"></div>
        
        {/* Credits */}
        <div className="text-center text-sm text-sinister-scroll/50">
          <p>
            Powered by <Link href="/" className={`${
              isDegenMode ? 'text-sinister-red hover:text-sinister-gold' : 'text-sinister-orange hover:text-sinister-teal'
            } transition-colors font-heading uppercase text-xs tracking-wider`}>Yeti-Apes & Vesta</Link>
          </p>
          <p className="mt-2 font-accent italic text-xs">
            © {new Date().getFullYear()} {isDegenMode ? 'Dark Oracle' : 'Delphi'}. {isDegenMode ? 'No rights reserved.' : 'All prophecies reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}