"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface ListingOptionsModalProps {
  onClose: () => void;
}

export default function ListingOptionsModal({ onClose }: ListingOptionsModalProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    if (option === "collection") {
      // Collection creation is coming soon, don't navigate
      return;
    }
    
    setIsLoading(true);
    
    // Navigate to the appropriate page
    setTimeout(() => {
      if (option === "direct") {
        router.push("/create/direct-listing");
      } else if (option === "auction") {
        router.push("/create/auction");
      }
      onClose();
    }, 500);
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oracle-black-void/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-oracle-black-matter border border-oracle-orange/20 rounded-xl w-full max-w-2xl shadow-card-hover"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-cosmic-connection opacity-10"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <motion.h3 
                className="font-heading text-2xl text-oracle-orange"
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(255, 95, 31, 0)",
                    "0 0 10px rgba(255, 95, 31, 0.5)",
                    "0 0 0px rgba(255, 95, 31, 0)"
                  ]
                } as any}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Create New Listing
              </motion.h3>
              <motion.button 
                onClick={onClose}
                className="text-oracle-white/70 hover:text-oracle-orange"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <p className="text-oracle-white mb-6">
              Select the type of listing you want to create:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Direct Listing Option */}
              <motion.div 
                className={`relative overflow-hidden rounded-xl border-2 ${
                  selectedOption === "direct" 
                    ? "border-oracle-orange" 
                    : "border-oracle-orange/30"
                } p-6 cursor-pointer transition-all duration-300 hover:border-oracle-orange`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect("direct")}
              >
                <div className="absolute inset-0 bg-cosmic-combustion opacity-5"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cosmic-combustion rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-xl text-oracle-orange text-center mb-2">Direct Listing</h4>
                  <p className="text-oracle-white/70 text-center text-sm">
                    You set the price, cancel listing anytime
                  </p>
                </div>
                {selectedOption === "direct" && isLoading && (
                  <div className="absolute inset-0 bg-oracle-black-void/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </motion.div>
              
              {/* Auction Option */}
              <motion.div 
                className={`relative overflow-hidden rounded-xl border-2 ${
                  selectedOption === "auction" 
                    ? "border-oracle-orange" 
                    : "border-oracle-orange/30"
                } p-6 cursor-pointer transition-all duration-300 hover:border-oracle-orange`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect("auction")}
              >
                <div className="absolute inset-0 bg-cosmic-combustion opacity-5"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cosmic-combustion rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-xl text-oracle-orange text-center mb-2">Auction</h4>
                  <p className="text-oracle-white/70 text-center text-sm">
                    Set a minimum bid and auction duration
                  </p>
                </div>
                {selectedOption === "auction" && isLoading && (
                  <div className="absolute inset-0 bg-oracle-black-void/50 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-oracle-orange border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </motion.div>
              
              {/* Create Collection Option (Coming Soon) */}
              <motion.div 
                className={`relative overflow-hidden rounded-xl border-2 ${
                  selectedOption === "collection" 
                    ? "border-oracle-turquoise" 
                    : "border-oracle-turquoise/30"
                } p-6 cursor-pointer transition-all duration-300 hover:border-oracle-turquoise`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionSelect("collection")}
              >
                <div className="absolute inset-0 bg-cosmic-combustion opacity-5"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cosmic-combustion rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-xl text-oracle-turquoise text-center mb-2">Create Collection</h4>
                  <p className="text-oracle-white/70 text-center text-sm">
                    Create your own NFT collection
                  </p>
                  <div className="mt-2 flex justify-center">
                    <span className="badge-turquoise">Coming Soon</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="text-oracle-white/70 text-sm text-center">
              Select the option that best fits your needs. You can always change your listing type later.
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 