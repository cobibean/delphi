"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [energyFields, setEnergyFields] = useState<Array<{x: number, y: number, size: number, color: string}>>([]);
  
  // Generate random energy fields for space background
  useEffect(() => {
    const fields = [];
    const colors = ['rgba(255, 95, 31, 0.1)', 'rgba(0, 209, 193, 0.1)', 'rgba(107, 70, 193, 0.1)'];
    
    for (let i = 0; i < 5; i++) {
      fields.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 200 + 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setEnergyFields(fields);
  }, []);
  
  return (
    <footer className="relative bg-oracle-black-void pt-16 pb-8 border-t border-oracle-orange/10 glitch-key-pattern overflow-hidden">
      {/* Space background effects */}
      {energyFields.map((field, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none opacity-30"
          style={{
            left: `${field.x}%`,
            top: `${field.y}%`,
            width: `${field.size}px`,
            height: `${field.size}px`,
            background: `radial-gradient(circle, ${field.color} 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container relative z-10">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img 
                src="/images/delphi-logo.svg" 
                alt="Delphi" 
                className="h-10 w-10 mr-2"
                animate={{ 
                  filter: [
                    "drop-shadow(0 0 0px rgba(255, 95, 31, 0))",
                    "drop-shadow(0 0 5px rgba(255, 95, 31, 0.5))",
                    "drop-shadow(0 0 0px rgba(255, 95, 31, 0))"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.span 
                className="font-heading text-2xl text-oracle-orange"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255, 95, 31, 0)",
                    "0 0 5px rgba(255, 95, 31, 0.5)",
                    "0 0 0px rgba(255, 95, 31, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                DELPHI
              </motion.span>
            </motion.div>
            <p className="text-oracle-white/70 text-sm mb-4">
              The center of the world for artists, weirdos, and degens on Metis and beyond. A marketplace built for creative exploration and digital adventure.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-oracle-orange hover:text-oracle-turquoise transition-colors"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  filter: "brightness(1.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-oracle-orange hover:text-oracle-turquoise transition-colors"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: -5,
                  filter: "brightness(1.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-oracle-orange hover:text-oracle-turquoise transition-colors"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5,
                  filter: "brightness(1.2)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </motion.a>
            </div>
          </div>
          
          {/* Marketplace */}
          <div>
            <motion.h3 
              className="font-heading text-lg text-oracle-orange mb-4 uppercase tracking-wider"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255, 95, 31, 0)",
                  "0 0 3px rgba(255, 95, 31, 0.3)",
                  "0 0 0px rgba(255, 95, 31, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Marketplace
            </motion.h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a 
                  href="/explore" 
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm"
                >
                  Explore
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a 
                  href="/collections" 
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm"
                >
                  Collections
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openComingSoonModal', { detail: 'Create Listing' }))}
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm cursor-pointer"
                >
                  Create Listing
                </button>
              </motion.li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <motion.h3 
              className="font-heading text-lg text-oracle-orange mb-4 uppercase tracking-wider"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255, 95, 31, 0)",
                  "0 0 3px rgba(255, 95, 31, 0.3)",
                  "0 0 0px rgba(255, 95, 31, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              Resources
            </motion.h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a 
                  href="/help" 
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm"
                >
                  Help Center
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a 
                  href="/docs" 
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm"
                >
                  Documentation
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <button 
                  onClick={() => window.dispatchEvent(new CustomEvent('openComingSoonModal', { detail: 'Stats' }))}
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm cursor-pointer"
                >
                  Stats
                </button>
              </motion.li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <motion.h3 
              className="font-heading text-lg text-oracle-orange mb-4 uppercase tracking-wider"
              animate={{ 
                textShadow: [
                  "0 0 0px rgba(255, 95, 31, 0)",
                  "0 0 3px rgba(255, 95, 31, 0.3)",
                  "0 0 0px rgba(255, 95, 31, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              Connect
            </motion.h3>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openComingSoonModal', { detail: 'Profile' }))}
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm cursor-pointer"
                >
                  Profile
                </button>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <a 
                  href="/community" 
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm"
                >
                  Community
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openComingSoonModal', { detail: 'Earn' }))}
                  className="text-oracle-white/70 hover:text-oracle-turquoise text-sm cursor-pointer"
                >
                  Earn
                </button>
              </motion.li>
            </ul>
          </div>
        </div>
        
        {/* Divider with gradient */}
        <motion.div 
          className="divider"
          animate={{
            backgroundImage: [
              'linear-gradient(90deg, transparent, rgba(255, 95, 31, 0.2), transparent)',
              'linear-gradient(90deg, transparent, rgba(0, 209, 193, 0.2), transparent)',
              'linear-gradient(90deg, transparent, rgba(107, 70, 193, 0.2), transparent)',
              'linear-gradient(90deg, transparent, rgba(255, 95, 31, 0.2), transparent)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        {/* Bottom section with copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-oracle-white/50 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            © {currentYear} Delphi. <span className="text-xs accent-text">Built by Vesta & Yeti-Apes</span>
          </motion.p>
          <motion.p 
            className="text-oracle-white/50 text-sm mt-2 md:mt-0"
            whileHover={{ scale: 1.05 }}
          >
            Powered by <a href="/" className="text-oracle-orange hover:text-oracle-turquoise">Metis Blockchain</a>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}