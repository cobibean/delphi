"use client";

import { motion } from "framer-motion";

interface TestnetGuideModalProps {
  onClose: () => void;
}

export function TestnetGuideModal({ onClose }: TestnetGuideModalProps) {
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
        className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-2xl shadow-card-hover overflow-hidden max-h-[90vh] my-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-2rem)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl text-oracle-orange">
              Metis Sepolia Testnet Guide
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
            <div>
              <h3 className="text-xl font-heading text-quantum-entanglement mb-2">Go to Delphi</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Visit <a href="https://delphinft.app" target="_blank" rel="noopener noreferrer" className="text-cosmic-combustion hover:underline">delphinft.app</a> or <a href="https://bit.ly/4kJ4Krt" target="_blank" rel="noopener noreferrer" className="text-cosmic-combustion hover:underline">https://bit.ly/4kJ4Krt</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-heading text-quantum-entanglement mb-2">Connect Your Wallet</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click the "Connect Wallet" button at the top right and select your preferred wallet (e.g., MetaMask).</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-heading text-quantum-entanglement mb-2">Add the Metis Sepolia Chain to Wallet</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to <a href="https://chainlist.org/chain/59902" target="_blank" rel="noopener noreferrer" className="text-cosmic-combustion hover:underline">Chainlist.org</a>.</li>
                <li>Search for Metis Sepolia.</li>
                <li>Click &quot;Connect&quot; then &quot;Add to Wallet&quot; on the listing.</li>
                <li>Approve the prompt in your wallet to add the chain.</li>
                <li>Switch to the Metis Sepolia Chain:
                  <ul className="list-disc pl-5 mt-1">
                    <li>After adding, make sure your wallet is switched to Metis Sepolia. (Check the network name in your wallet dropdown.)</li>
                  </ul>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-heading text-quantum-entanglement mb-2">Grab Some Test METIS</h3>
              <p className="mb-2">If your wallet needs test tokens to complete a transaction:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Visit the <a href="https://faucet.metis.io/" target="_blank" rel="noopener noreferrer" className="text-cosmic-combustion hover:underline">Metis Faucet</a> and request test METIS.</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-heading text-quantum-entanglement mb-2">You&apos;re Ready to Go!</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>You can now mint your Delphi Pioneer Alpha Pass NFT on DelphiNFT.app</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default TestnetGuideModal; 