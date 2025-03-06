"use client";

import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import Link from "next/link";

export default function CreateListingPage() {
  const account = useActiveAccount();
  const [formData, setFormData] = useState({
    contractAddress: "",
    tokenId: "",
    price: "",
    quantity: "1",
    duration: "1", // days
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // If no wallet is connected, show a message
  if (!account) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Create Listing</h1>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
          <p className="text-lg mb-6">Please connect your wallet to create a listing</p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    // Basic validation
    if (!formData.contractAddress || !formData.tokenId || !formData.price) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Here you would call your contract to create the listing
      // For now, we'll just simulate a successful listing creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      setFormData({
        contractAddress: "",
        tokenId: "",
        price: "",
        quantity: "1",
        duration: "1",
      });
    } catch (err) {
      console.error("Error creating listing:", err);
      setError("Failed to create listing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create NFT Listing</h1>
      
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Listing Created Successfully!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your NFT has been listed on the marketplace.</p>
              <div className="flex justify-center gap-4">
                <Link 
                  href="/"
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Go Home
                </Link>
                <button 
                  onClick={() => setSuccess(false)}
                  className="bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-all"
                >
                  Create Another Listing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="contractAddress">
                  NFT Contract Address *
                </label>
                <input
                  type="text"
                  id="contractAddress"
                  name="contractAddress"
                  value={formData.contractAddress}
                  onChange={handleChange}
                  placeholder="0x..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The contract address of your NFT collection</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="tokenId">
                  Token ID *
                </label>
                <input
                  type="text"
                  id="tokenId"
                  name="tokenId"
                  value={formData.tokenId}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The ID of your NFT</p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="price">
                  Price (METIS) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.01"
                  step="0.000001"
                  min="0"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">The price per token in METIS</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="quantity">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="duration">
                    Duration (days)
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-turquoise-400"
                  >
                    <option value="1">1 day</option>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-turquoise-400 to-orange-400 text-white px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Listing"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Before you list your NFT</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Make sure you own the NFT you're trying to list</li>
          <li>You'll need to approve the marketplace contract to transfer your NFT when it's sold</li>
          <li>Gas fees will apply for the approval and listing transactions</li>
          <li>Your NFT will remain in your wallet until it's sold</li>
        </ul>
      </div>
    </div>
  );
} 