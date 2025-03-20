"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/feedback";

interface ListingOptionsModalProps {
  onClose: () => void;
}

export function ListingOptionsModal({ onClose }: ListingOptionsModalProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionSelect = (option: string) => {
    // Don't allow selection of "collection" option as it's coming soon
    if (option === "collection") {
      toast.info(
        "Collection Listing Coming Soon",
        "The ability to list multiple NFTs from a collection will be available soon!"
      );
      return;
    }
    
    setSelectedOption(option);
    
    // Add a slight delay before navigating for visual feedback
    setIsLoading(true);
    setTimeout(() => {
      try {
        switch (option) {
          case "direct":
            router.push("/create/direct-listing");
            toast.success(
              "Direct Listing Selected",
              "You're being redirected to create a direct listing."
            );
            break;
          case "auction":
            router.push("/create/auction");
            toast.success(
              "Auction Listing Selected",
              "You're being redirected to create an auction listing."
            );
            break;
          default:
            // In case of any other option, just stay on the page
            setIsLoading(false);
            toast.error(
              "Invalid Option",
              "The selected listing type is not valid."
            );
        }
      } catch (error) {
        console.error("Navigation error:", error);
        setIsLoading(false);
        toast.error(
          "Navigation Failed",
          "Failed to navigate to the listing creation page. Please try again."
        );
      }
    }, 500);
  };

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
        className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl w-full max-w-2xl shadow-card-hover overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-2xl text-oracle-orange">
              Choose Listing Type
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Direct Listing Option */}
            <motion.div
              className={`relative overflow-hidden border rounded-lg transition-all cursor-pointer group ${
                selectedOption === "direct"
                  ? "border-sinister-orange bg-sinister-orange/20"
                  : "border-sinister-orange/30 bg-sinister-black/30 hover:bg-sinister-black/40"
              }`}
              onClick={() => handleOptionSelect("direct")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-heading text-oracle-white">
                    Direct Listing
                  </h3>
                  {selectedOption === "direct" && (
                    <div className="text-sinister-orange">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-sinister-scroll mb-4">
                  List your NFT for a fixed price. Buyers can purchase immediately without bidding.
                </p>

                <div className="text-sinister-orange text-sm">
                  <span className="bg-sinister-orange/10 px-2 py-1 rounded">
                    Fixed Price
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Auction Listing Option */}
            <motion.div
              className={`relative overflow-hidden border rounded-lg transition-all cursor-pointer group ${
                selectedOption === "auction"
                  ? "border-cosmic-combustion bg-cosmic-combustion/20"
                  : "border-cosmic-combustion/30 bg-sinister-black/30 hover:bg-sinister-black/40"
              }`}
              onClick={() => handleOptionSelect("auction")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-heading text-oracle-white">
                    Auction
                  </h3>
                  {selectedOption === "auction" && (
                    <div className="text-cosmic-combustion">
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
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <p className="text-sinister-scroll mb-4">
                  Set a minimum bid and allow buyers to compete for your NFT. Optionally add a buyout price.
                </p>

                <div className="text-cosmic-combustion text-sm">
                  <span className="bg-cosmic-combustion/10 px-2 py-1 rounded">
                    Competitive Bidding
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Collection Offer - Coming Soon */}
            <motion.div
              className="relative overflow-hidden border border-sinister-scroll/20 bg-sinister-black/20 rounded-lg cursor-not-allowed opacity-70"
              whileHover={{ scale: 1 }}
            >
              <div className="absolute top-2 right-2">
                <span className="bg-sinister-scroll/30 text-xs text-sinister-scroll px-2 py-1 rounded">
                  Coming Soon
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-heading text-oracle-white/70">
                    Collection Offer
                  </h3>
                </div>

                <p className="text-sinister-scroll/70 mb-4">
                  List multiple NFTs from the same collection with a single transaction.
                </p>

                <div className="text-sinister-scroll/50 text-sm">
                  <span className="bg-sinister-scroll/10 px-2 py-1 rounded">
                    Batch Listing
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-8 w-8 border-4 border-oracle-orange border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 