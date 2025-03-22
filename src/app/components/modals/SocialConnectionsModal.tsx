"use client";

import { motion } from "framer-motion";

interface SocialConnectionsModalProps {
  onClose: () => void;
}

export function SocialConnectionsModal({ onClose }: SocialConnectionsModalProps) {
  return (
    <div
      className="fixed inset-0 bg-sinister-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-md shadow-card-hover overflow-hidden max-h-[90vh] my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl text-oracle-orange">
              Connect With Delphi
            </h2>
            <button
              onClick={onClose}
              className="text-oracle-white/70 hover:text-oracle-orange"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="space-y-6 text-oracle-white">
            <p className="text-oracle-white/80">
              Stay up to date with the latest Delphi news, features, and updates by following us on social media.
            </p>
            
            <div className="space-y-4">
              {/* Twitter */}
              <a 
                href="https://twitter.com/delphiapp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-cosmic-black hover:bg-cosmic-black/80 border border-oracle-orange/20 rounded-lg p-4 transition-all duration-300 hover:border-oracle-orange/40"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-quantum-entanglement rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-oracle-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6.01c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-oracle-orange font-heading text-lg">Follow on Twitter</h3>
                    <p className="text-oracle-white/60 text-sm mt-1">Get the latest updates and announcements</p>
                  </div>
                </div>
              </a>
              
              {/* Yeti Apes Telegram */}
              <a 
                href="https://t.me/+P2HzYi7_8FRiOGFk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-cosmic-black hover:bg-cosmic-black/80 border border-oracle-orange/20 rounded-lg p-4 transition-all duration-300 hover:border-oracle-orange/40"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-cosmic-combustion rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-oracle-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.732l9.733-3.76c.565-.222.885.002.702.641l-1.657 7.82c-.116.553-.451.69-.916.433l-2.551-1.888-1.189 1.148c-.122.118-.221.219-.409.244-.187.026-.341-.03-.454-.34l-.87-2.871-.012.008z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-oracle-orange font-heading text-lg">Join Yeti Apes Telegram</h3>
                    <p className="text-oracle-white/60 text-sm mt-1">Connect with the Yeti Apes community</p>
                  </div>
                </div>
              </a>
              
              {/* Vesta Telegram */}
              <a 
                href="https://t.me/+EaYsOIOZzxlhZTg8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-cosmic-black hover:bg-cosmic-black/80 border border-oracle-orange/20 rounded-lg p-4 transition-all duration-300 hover:border-oracle-orange/40"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-oracle-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-oracle-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.732l9.733-3.76c.565-.222.885.002.702.641l-1.657 7.82c-.116.553-.451.69-.916.433l-2.551-1.888-1.189 1.148c-.122.118-.221.219-.409.244-.187.026-.341-.03-.454-.34l-.87-2.871-.012.008z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-oracle-orange font-heading text-lg">Join Vesta Telegram</h3>
                    <p className="text-oracle-white/60 text-sm mt-1">Connect with the Vesta community</p>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="pt-4">
              <button 
                onClick={onClose}
                className="bg-quantum-entanglement text-oracle-white hover:bg-quantum-entanglement/90 w-full py-3 rounded-lg font-heading transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default SocialConnectionsModal; 