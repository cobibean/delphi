'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSettings, FiDollarSign, FiPackage, FiUpload, FiCheck } from 'react-icons/fi';

// Define types
interface DeploymentConfig {
  collectionName: string;
  symbol: string;
  description: string;
  contractType: string;
  royaltyPercentage: number;
  royaltyRecipient: string;
}

// Loading indicator
const LoadingIndicator = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

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

// Main Contract Deployment Page
export default function DeployContractPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    collectionName: '',
    symbol: '',
    description: '',
    contractType: 'nft-collection',
    royaltyPercentage: 5,
    royaltyRecipient: ''
  });
  const [deploymentStatus, setDeploymentStatus] = useState({
    success: false,
    error: '',
    contractAddress: '',
    transactionHash: ''
  });

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

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeploymentConfig(prev => ({
      ...prev,
      [name]: name === 'royaltyPercentage' ? parseFloat(value) : value
    }));
  };

  // Handle contract type selection
  const handleContractTypeSelect = (type: string) => {
    setDeploymentConfig(prev => ({
      ...prev,
      contractType: type
    }));
  };

  // Deploy contract
  const deployContract = async () => {
    // Validate form
    if (!deploymentConfig.collectionName || !deploymentConfig.symbol || !deploymentConfig.royaltyRecipient) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setDeploymentStep(1);

    try {
      // In a real implementation, you would call an API to deploy the contract
      // For now, we'll just simulate the deployment process
      
      // Simulate contract deployment (step 1)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStep(2);
      
      // Simulate metadata upload (step 2)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStep(3);
      
      // Simulate contract initialization (step 3)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set success status
      setDeploymentStatus({
        success: true,
        error: '',
        contractAddress: '0x1234567890123456789012345678901234567890',
        transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
      });
    } catch (error) {
      console.error('Error deploying contract:', error instanceof Error ? error.message : 'Unknown error');
      setDeploymentStatus({
        ...deploymentStatus,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Deploy NFT Contract</h1>
      
      {deploymentStatus.success ? (
        // Success view
        <div className="bg-gray-900 rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-green-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Contract Deployed Successfully!</h2>
          <p className="text-gray-400 mb-6">Your NFT collection is now live on the blockchain</p>
          
          <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-1">Contract Address</p>
              <p className="font-mono text-sm break-all">{deploymentStatus.contractAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
              <p className="font-mono text-sm break-all">{deploymentStatus.transactionHash}</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/my-nfts')}
              className="bg-primary text-white rounded-lg px-6 py-3 font-medium hover:bg-primary-dark"
            >
              View My NFTs
            </button>
            <button
              onClick={() => router.push('/create/nft-generator')}
              className="bg-gray-700 text-white rounded-lg px-6 py-3 font-medium hover:bg-gray-600"
            >
              Create Another Collection
            </button>
          </div>
        </div>
      ) : isLoading ? (
        // Deployment in progress view
        <div className="bg-gray-900 rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">Deploying Your NFT Contract</h2>
          
          <div className="max-w-md mx-auto">
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  deploymentStep >= 1 ? 'bg-primary' : 'bg-gray-700'
                }`}>
                  {deploymentStep >= 1 ? <FiCheck /> : '1'}
                </div>
                <div>
                  <p className="font-medium">Preparing Contract</p>
                  <p className="text-sm text-gray-400">Setting up your contract parameters</p>
                </div>
                {deploymentStep === 1 && (
                  <LoadingIndicator />
                )}
              </div>
              
              <div className="flex items-center mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  deploymentStep >= 2 ? 'bg-primary' : 'bg-gray-700'
                }`}>
                  {deploymentStep >= 2 ? <FiCheck /> : '2'}
                </div>
                <div>
                  <p className="font-medium">Uploading Metadata</p>
                  <p className="text-sm text-gray-400">Storing your collection data on IPFS</p>
                </div>
                {deploymentStep === 2 && (
                  <LoadingIndicator />
                )}
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  deploymentStep >= 3 ? 'bg-primary' : 'bg-gray-700'
                }`}>
                  {deploymentStep >= 3 ? <FiCheck /> : '3'}
                </div>
                <div>
                  <p className="font-medium">Finalizing Deployment</p>
                  <p className="text-sm text-gray-400">Confirming transaction on the blockchain</p>
                </div>
                {deploymentStep === 3 && (
                  <LoadingIndicator />
                )}
              </div>
            </div>
            
            <p className="text-center text-sm text-gray-400">
              This process may take a few minutes. Please don't close this page.
            </p>
          </div>
        </div>
      ) : (
        // Form view
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
                    name="collectionName"
                    value={deploymentConfig.collectionName}
                    onChange={handleInputChange}
                    placeholder="My Awesome NFTs"
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Symbol *
                  </label>
                  <input
                    type="text"
                    name="symbol"
                    value={deploymentConfig.symbol}
                    onChange={handleInputChange}
                    placeholder="NFTS"
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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
                    name="description"
                    value={deploymentConfig.description}
                    onChange={handleInputChange}
                    placeholder="Describe your collection..."
                    rows={3}
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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
                    name="royaltyPercentage"
                    value={deploymentConfig.royaltyPercentage}
                    onChange={handleInputChange}
                    min="0"
                    max="15"
                    step="0.1"
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Percentage of secondary sales you'll receive (0-15%)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Royalty Recipient Address *
                  </label>
                  <input
                    type="text"
                    name="royaltyRecipient"
                    value={deploymentConfig.royaltyRecipient}
                    onChange={handleInputChange}
                    placeholder="0x..."
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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
                    selected={deploymentConfig.contractType === contract.type}
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
                onClick={deployContract}
                className="w-full bg-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-primary-dark"
              >
                Deploy Contract
              </button>
              
              <p className="text-xs text-gray-400 mt-2 text-center">
                Gas fees will apply for contract deployment
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 