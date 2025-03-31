'use client';

import { useTransaction } from '@/providers/TransactionProvider';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiCheck, FiDollarSign, FiPackage, FiSettings, FiUpload } from 'react-icons/fi';
import { useActiveAccount } from 'thirdweb/react';

// Contract type card component
const ContractTypeCard = ({ 
  type, 
  title, 
  description, 
  icon, 
  selected, 
  onSelect 
}: { 
  type: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  selected: boolean; 
  onSelect: (type: string) => void; 
}) => {
  return (
    <div 
      className={`border-2 rounded-xl p-4 cursor-pointer transition-colors ${
        selected 
          ? 'border-primary bg-primary bg-opacity-10' 
          : 'border-gray-700 hover:border-gray-500'
      }`}
      onClick={() => onSelect(type)}
    >
      <div className="flex items-center mb-2">
        <div className={`mr-3 ${selected ? 'text-primary' : 'text-gray-400'}`}>
          {icon}
        </div>
        <h3 className="font-medium">{title}</h3>
        {selected && (
          <div className="ml-auto text-primary">
            <FiCheck />
          </div>
        )}
      </div>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
};

// Main Contract Deployment Page (Placeholder)
export default function DeployContractPage() {
  const _router = useRouter();
  const _account = useActiveAccount();
  const { addTransaction } = useTransaction();
  const [contractType, setContractType] = useState('nft-collection');

  // Contract type options
  const contractTypes = [
    {
      type: 'nft-collection',
      title: 'NFT Collection (ERC721)',
      description: 'Standard collection of unique NFTs. Best for 1/1 artworks.',
      icon: <FiPackage size={24} />
    },
    {
      type: 'nft-drop',
      title: 'NFT Drop (ERC721)',
      description: 'Collection with claim phases. Good for scheduled releases.',
      icon: <FiPackage size={24} />
    },
    {
      type: 'edition',
      title: 'Edition (ERC1155)',
      description: 'Multiple copies of each NFT. More gas efficient.',
      icon: <FiPackage size={24} />
    },
    {
      type: 'edition-drop',
      title: 'Edition Drop (ERC1155)',
      description: 'Multiple copies with claim phases. Best for large drops.',
      icon: <FiPackage size={24} />
    }
  ];

  // Handle contract type selection
  const handleContractTypeSelect = (type: string) => {
    setContractType(type);
  };

  // Handle form submission (placeholder)
  const handleDeployClick = () => {
    // Display a toast or modal indicating this feature is coming soon
    alert('Contract deployment feature coming soon!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Deploy NFT Contract</h1>
      
      {/* Coming Soon Banner */}
      <div className="bg-gray-800 border border-primary/30 rounded-xl p-8 mb-8 text-center">
        <h2 className="text-2xl font-semibold text-primary mb-4">Coming Soon</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Contract deployment functionality is under development and will be available soon. 
          This page shows a preview of what&apos;s coming.
        </p>
        <div className="inline-block bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full">
          Feature in Development
        </div>
      </div>
      
      {/* Feature Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Collection Details */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiSettings className="mr-2" /> Collection Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Collection Name *
                </label>
                <input
                  type="text"
                  placeholder="My Awesome NFTs"
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary opacity-50"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Symbol *
                </label>
                <input
                  type="text"
                  placeholder="NFTS"
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary opacity-50"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">
                  Short identifier for your collection (usually 3-5 characters)
                </p>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Describe your collection..."
                  rows={3}
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary opacity-50"
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiDollarSign className="mr-2" /> Royalty Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Royalty Percentage
                </label>
                <input
                  type="number"
                  value={5}
                  min="0"
                  max="15"
                  step="0.1"
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary opacity-50"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">
                  Percentage of secondary sales you&apos;ll receive (0-15%)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Royalty Recipient Address *
                </label>
                <input
                  type="text"
                  placeholder="0x..."
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary opacity-50"
                  disabled
                />
                <p className="text-xs text-gray-400 mt-1">
                  Wallet address that will receive royalty payments
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column - Contract Type & Deploy Button */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiPackage className="mr-2" /> Contract Type
            </h2>
            
            <div className="space-y-3">
              {contractTypes.map((contract) => (
                <ContractTypeCard
                  key={contract.type}
                  type={contract.type}
                  title={contract.title}
                  description={contract.description}
                  icon={contract.icon}
                  selected={contractType === contract.type}
                  onSelect={handleContractTypeSelect}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiUpload className="mr-2" /> Deploy
            </h2>
            
            <p className="text-sm text-gray-400 mb-4">
              Once deployed, your NFT contract will be live on the blockchain and cannot be modified.
            </p>
            
            <button
              onClick={handleDeployClick}
              className="w-full bg-primary/70 text-white rounded-lg px-4 py-3 font-medium hover:bg-primary/60 cursor-not-allowed"
            >
              Deploy Contract
            </button>
            
            <p className="text-xs text-gray-400 mt-2 text-center">
              Gas fees will apply for contract deployment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 