'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUpload, FiPlus, FiTrash2, FiSettings, FiImage, FiLayers } from 'react-icons/fi';

// Define types
interface Trait {
  name: string;
  file: string;
  path: string;
}

interface Layer {
  name: string;
  traits: Trait[];
}

interface GenerationConfig {
  name: string;
  description: string;
  amount: number;
  width: number;
  height: number;
  baseUri: string;
}

interface NFT {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  dna: string;
}

// Loading indicator
const LoadingIndicator = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Layer item component
const LayerItem = ({ 
  layer, 
  onDelete, 
  onMoveUp, 
  onMoveDown, 
  isFirst, 
  isLast 
}: { 
  layer: Layer; 
  onDelete: (name: string) => void; 
  onMoveUp: (name: string) => void; 
  onMoveDown: (name: string) => void; 
  isFirst: boolean; 
  isLast: boolean; 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <FiLayers className="mr-2 text-primary" />
          <h3 className="font-medium">{layer.name}</h3>
          <span className="ml-2 text-sm text-gray-400">({layer.traits?.length || 0} traits)</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onMoveUp(layer.name)} 
            disabled={isFirst}
            className={`p-1 rounded ${isFirst ? 'text-gray-500' : 'text-gray-300 hover:text-white'}`}
          >
            ↑
          </button>
          <button 
            onClick={() => onMoveDown(layer.name)} 
            disabled={isLast}
            className={`p-1 rounded ${isLast ? 'text-gray-500' : 'text-gray-300 hover:text-white'}`}
          >
            ↓
          </button>
          <button 
            onClick={() => onDelete(layer.name)} 
            className="p-1 rounded text-red-400 hover:text-red-500"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
      
      {layer.traits && layer.traits.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {layer.traits.map((trait: Trait) => (
            <div key={trait.name} className="relative group">
              <img 
                src={trait.path} 
                alt={trait.name} 
                className="w-full h-16 object-cover rounded border border-gray-700"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                <span className="text-xs text-white">{trait.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 text-sm text-gray-400 italic">No traits added yet</div>
      )}
    </div>
  );
};

// Main NFT Generator Page
export default function NFTGeneratorPage() {
  const router = useRouter();
  const [layers, setLayers] = useState<Layer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newLayerName, setNewLayerName] = useState('');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [generationConfig, setGenerationConfig] = useState<GenerationConfig>({
    name: 'My Collection',
    description: 'A unique generative art collection',
    amount: 10,
    width: 512,
    height: 512,
    baseUri: 'ipfs://'
  });
  const [previewNFTs, setPreviewNFTs] = useState<NFT[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch layers on component mount
  React.useEffect(() => {
    fetchLayers();
  }, []);

  // Fetch layers from the API
  const fetchLayers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/layers');
      const data = await response.json();
      if (data.success) {
        setLayers(data.layers || []);
      } else {
        console.error('Error fetching layers:', data.error);
      }
    } catch (error) {
      console.error('Error fetching layers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new layer
  const createLayer = async () => {
    if (!newLayerName) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-layer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ layerName: newLayerName }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewLayerName('');
        fetchLayers();
      } else {
        console.error('Error creating layer:', data.error);
        alert(`Error creating layer: ${data.error}`);
      }
    } catch (error) {
      console.error('Error creating layer:', error instanceof Error ? error.message : 'Unknown error');
      alert(`Error creating layer: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a layer
  const deleteLayer = async (layerName: string) => {
    if (!confirm(`Are you sure you want to delete the layer "${layerName}"? This action cannot be undone.`)) {
      return;
    }
    
    // In a real implementation, you would call an API to delete the layer
    // For now, we'll just remove it from the state
    setLayers(layers.filter(layer => layer.name !== layerName));
  };

  // Move a layer up in the order
  const moveLayerUp = (layerName: string) => {
    const index = layers.findIndex(layer => layer.name === layerName);
    if (index <= 0) return;
    
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index - 1];
    newLayers[index - 1] = temp;
    
    setLayers(newLayers);
  };

  // Move a layer down in the order
  const moveLayerDown = (layerName: string) => {
    const index = layers.findIndex(layer => layer.name === layerName);
    if (index >= layers.length - 1) return;
    
    const newLayers = [...layers];
    const temp = newLayers[index];
    newLayers[index] = newLayers[index + 1];
    newLayers[index + 1] = temp;
    
    setLayers(newLayers);
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedLayer) {
      alert('Please select a layer first');
      return;
    }
    
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsLoading(true);
    
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('layerType', selectedLayer);
        formData.append('file', file);
        
        const response = await fetch('/api/upload-layer', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        
        if (!data.success) {
          console.error(`Error uploading file ${file.name}:`, data.error);
          alert(`Error uploading file ${file.name}: ${data.error}`);
        }
      }
      
      // Refresh layers after upload
      fetchLayers();
    } catch (error) {
      console.error('Error uploading files:', error instanceof Error ? error.message : 'Unknown error');
      alert(`Error uploading files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Generate NFTs
  const generateNFTs = async () => {
    if (layers.length === 0) {
      alert('Please add at least one layer with traits before generating');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Prepare the configuration for generation
      const config = {
        ...generationConfig,
        layers: layers.map(layer => ({
          name: layer.name,
          options: layer.traits.map(trait => ({
            name: trait.name,
            weight: 100 / layer.traits.length // Equal weight for all traits for now
          }))
        }))
      };
      
      const response = await fetch('/api/generate-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config,
          amount: generationConfig.amount
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPreviewNFTs(data.results || []);
      } else {
        console.error('Error generating NFTs:', data.error);
        alert(`Error generating NFTs: ${data.error}`);
      }
    } catch (error) {
      console.error('Error generating NFTs:', error instanceof Error ? error.message : 'Unknown error');
      alert(`Error generating NFTs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for generation config
  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGenerationConfig(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'width' || name === 'height' 
        ? parseInt(value, 10) 
        : value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">NFT Collection Generator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Layer Management */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiLayers className="mr-2" /> Layers
            </h2>
            
            {/* Add New Layer */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="text"
                  value={newLayerName}
                  onChange={(e) => setNewLayerName(e.target.value)}
                  placeholder="New layer name"
                  className="flex-1 bg-gray-800 text-white rounded-l px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={createLayer}
                  disabled={!newLayerName || isLoading}
                  className="bg-primary text-white rounded-r px-4 py-2 hover:bg-primary-dark disabled:opacity-50"
                >
                  <FiPlus />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Layer names can only contain letters, numbers, and underscores
              </p>
            </div>
            
            {/* Layer List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {isLoading ? (
                <LoadingIndicator />
              ) : layers.length > 0 ? (
                layers.map((layer, index) => (
                  <LayerItem
                    key={layer.name}
                    layer={layer}
                    onDelete={deleteLayer}
                    onMoveUp={moveLayerUp}
                    onMoveDown={moveLayerDown}
                    isFirst={index === 0}
                    isLast={index === layers.length - 1}
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <FiLayers className="mx-auto text-4xl mb-2" />
                  <p>No layers added yet</p>
                  <p className="text-sm mt-2">
                    Create a layer to get started with your NFT collection
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Upload Traits */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiUpload className="mr-2" /> Upload Traits
            </h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Select Layer
              </label>
              <select
                value={selectedLayer || ''}
                onChange={(e) => setSelectedLayer(e.target.value)}
                className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a layer</option>
                {layers.map((layer) => (
                  <option key={layer.name} value={layer.name}>
                    {layer.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mt-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="trait-upload"
              />
              <label
                htmlFor="trait-upload"
                className={`w-full flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-lg text-center cursor-pointer ${
                  selectedLayer
                    ? 'border-primary hover:border-primary-light text-primary'
                    : 'border-gray-600 text-gray-500'
                }`}
              >
                <FiUpload className="mr-2" />
                <span>{selectedLayer ? 'Upload traits to ' + selectedLayer : 'Select a layer first'}</span>
              </label>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: PNG, JPG, GIF, WEBP. Max size: 5MB per file.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Generation Settings & Preview */}
        <div className="lg:col-span-2">
          {/* Generation Settings */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiSettings className="mr-2" /> Generation Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={generationConfig.name}
                  onChange={handleConfigChange}
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Base URI
                </label>
                <input
                  type="text"
                  name="baseUri"
                  value={generationConfig.baseUri}
                  onChange={handleConfigChange}
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Amount to Generate
                </label>
                <input
                  type="number"
                  name="amount"
                  min="1"
                  max="100"
                  value={generationConfig.amount}
                  onChange={handleConfigChange}
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    name="width"
                    min="100"
                    max="2048"
                    step="8"
                    value={generationConfig.width}
                    onChange={handleConfigChange}
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    name="height"
                    min="100"
                    max="2048"
                    step="8"
                    value={generationConfig.height}
                    onChange={handleConfigChange}
                    className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={generationConfig.description}
                  onChange={handleConfigChange}
                  rows={3}
                  className="w-full bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={generateNFTs}
                disabled={isLoading || layers.length === 0}
                className="w-full bg-primary text-white rounded-lg px-4 py-3 font-medium hover:bg-primary-dark disabled:opacity-50"
              >
                {isLoading ? <LoadingIndicator /> : 'Generate NFTs'}
              </button>
            </div>
          </div>
          
          {/* Preview */}
          <div className="bg-gray-900 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FiImage className="mr-2" /> Preview
            </h2>
            
            {previewNFTs.length > 0 ? (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewNFTs.map((nft) => (
                    <div key={nft.dna} className="bg-gray-800 rounded-lg overflow-hidden">
                      <img
                        src={nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                        alt={nft.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-2">
                        <p className="text-sm font-medium truncate">{nft.name}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {nft.attributes.length} traits
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => router.push('/create/deploy-contract')}
                    className="bg-primary text-white rounded-lg px-6 py-2 font-medium hover:bg-primary-dark"
                  >
                    Continue to Deployment
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <FiImage className="mx-auto text-4xl mb-2" />
                <p>No preview available</p>
                <p className="text-sm mt-2">
                  Generate your NFTs to see a preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 