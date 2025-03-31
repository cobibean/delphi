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

  // Define the main sections of links
  const sections = [
    {
      title: "Marketplace",
      links: [
        { name: "All NFTs", href: "/" },
        { name: "New", href: "/" },
        { name: "Art", href: "/" },
        { name: "Photography", href: "/" },
        { name: "Music", href: "/" },
      ]
    },
    {
      title: "Create",
      links: [
        { name: "Create NFT", href: "/create" },
        { name: "Create Auction", href: "/create/auction" },
        { name: "Create Direct Listing", href: "/create/direct-listing" },
      ]
    },
    {
      title: "Profile",
      links: [
        { name: "My NFTs", href: "/my-nfts" },
        { name: "My Listings", href: "/my-listings" },
        { name: "My Profile", href: "/profile" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Platform Status", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Stats", href: "/stats" },
      ]
    }
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    initial: { y: 0 },
    hover: { y: -3, transition: { duration: 0.2 } }
  };

  return (
    <footer className="relative bg-cosmic-black border-t border-cosmic-grey-800">
      {/* Background energy fields */}
      <div className="absolute inset-0 overflow-hidden">
        {energyFields.map((field, index) => (
          <div 
            key={index}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              top: `${field.y}%`,
              left: `${field.x}%`,
              width: `${field.size}px`,
              height: `${field.size}px`,
              background: field.color,
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="container mx-auto px-4 py-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={footerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo and mission section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="/images/logo/logo-transparent.png" 
                alt="Delphi" 
                className="h-12 w-auto mr-3"
              />
              <span className="text-2xl font-bold text-oracle-white">Delphi</span>
            </div>
            <p className="text-cosmic-grey-300 mb-6">
              The premier NFT marketplace built on the Metis Andromeda network, providing a seamless experience for trading digital assets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white transition">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation sections */}
          {sections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-lg font-semibold text-oracle-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a 
                      href={link.href}
                      className="text-cosmic-grey-300 hover:text-oracle-white transition inline-block"
                      variants={linkVariants}
                      initial="initial"
                      whileHover="hover"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-cosmic-grey-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cosmic-grey-300 text-sm mb-4 md:mb-0">
            © {currentYear} Delphi. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white text-sm transition">
              Terms of Service
            </a>
            <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white text-sm transition">
              Privacy Policy
            </a>
            <a href="#" className="text-cosmic-grey-300 hover:text-oracle-white text-sm transition">
              Cookies
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
} 