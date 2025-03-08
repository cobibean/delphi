"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-oracle-black-void py-12 border-t border-oracle-orange/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-impact text-oracle-orange mb-4">DELPHI</h3>
            <p className="text-oracle-white/70 mb-4">
              The Multidimensional Nexus - An Interdimensional Portal for Artists, Weirdos, and Degens Across the Omniverse
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-oracle-white hover:text-oracle-orange transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                Twitter
              </motion.a>
              <motion.a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-oracle-white hover:text-oracle-orange transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                Discord
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-impact text-oracle-turquoise mb-4">MARKETPLACE</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="text-oracle-white/70 hover:text-oracle-white transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-oracle-white/70 hover:text-oracle-white transition-colors">
                  Create Listing
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-oracle-white/70 hover:text-oracle-white transition-colors">
                  Stats
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-impact text-oracle-purple mb-4">RESOURCES</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-oracle-white/70 hover:text-oracle-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-oracle-white/70 hover:text-oracle-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <a 
                  href="https://metis.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-oracle-white/70 hover:text-oracle-white transition-colors"
                >
                  Metis
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-impact text-oracle-gold mb-4">NEWSLETTER</h4>
            <p className="text-oracle-white/70 mb-4">
              Subscribe to receive interdimensional updates
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-oracle-black-matter border border-oracle-orange/30 text-oracle-white px-4 py-2 rounded-l-md focus:outline-none focus:border-oracle-orange w-full"
              />
              <button 
                type="submit" 
                className="cosmic-button rounded-l-none"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-oracle-orange/10 text-center text-oracle-white/50">
          <p>© {new Date().getFullYear()} Delphi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 