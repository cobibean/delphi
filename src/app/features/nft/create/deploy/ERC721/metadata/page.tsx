'use client';

import { Button } from '@/app/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import { FiChevronRight, FiInfo, FiPackage, FiUpload, FiX } from 'react-icons/fi';

// Form field component for consistent styling
const FormField = ({ 
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  tooltip,
  maxLength,
}: { 
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  tooltip?: string;
  maxLength?: number;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label htmlFor={name} className="block text-oracle-white font-medium">
          {label} {required && <span className="text-cosmic-combustion">*</span>}
        </label>
        {tooltip && (
          <div className="relative ml-2">
            <FiInfo 
              className="text-oracle-orange/60 hover:text-oracle-orange cursor-pointer transition-colors"
              size={16}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute z-10 w-60 p-2 mt-2 bg-ancient-wisdom border border-oracle-orange/20 rounded-md shadow-lg -left-28 top-6">
                <p className="text-xs text-oracle-white/90">{tooltip}</p>
              </div>
            )}
          </div>
        )}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="w-full bg-sinister-black border border-oracle-orange/20 focus:border-cosmic-combustion rounded-lg px-4 py-3 text-oracle-white placeholder-oracle-white/40 focus:outline-none focus:ring-1 focus:ring-cosmic-combustion transition-colors"
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className="w-full bg-sinister-black border border-oracle-orange/20 focus:border-cosmic-combustion rounded-lg px-4 py-3 text-oracle-white placeholder-oracle-white/40 focus:outline-none focus:ring-1 focus:ring-cosmic-combustion transition-colors"
        />
      )}
      {maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-oracle-white/40">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

// NumberInput component for royalty percentage
const NumberInput = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  required = false,
  tooltip,
}: {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  required?: boolean;
  tooltip?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label htmlFor={name} className="block text-oracle-white font-medium">
          {label} {required && <span className="text-cosmic-combustion">*</span>}
        </label>
        {tooltip && (
          <div className="relative ml-2">
            <FiInfo 
              className="text-oracle-orange/60 hover:text-oracle-orange cursor-pointer transition-colors"
              size={16}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute z-10 w-60 p-2 mt-2 bg-ancient-wisdom border border-oracle-orange/20 rounded-md shadow-lg -left-28 top-6">
                <p className="text-xs text-oracle-white/90">{tooltip}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="flex-grow h-2 bg-sinister-black rounded-lg appearance-none cursor-pointer accent-cosmic-combustion focus:outline-none focus:ring-1 focus:ring-cosmic-combustion"
        />
        <div className="flex items-center justify-center ml-4 w-16 h-10 bg-sinister-black border border-oracle-orange/20 rounded-lg">
          <span className="text-oracle-white">{value}%</span>
        </div>
      </div>
    </div>
  );
};

export default function ERC721MetadataSetup() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    coverImage: null as File | null,
    coverImagePreview: '',
    name: '',
    symbol: '',
    description: '',
    royaltyPercentage: 5,
    royaltyRecipient: '',
  });

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle royalty percentage change
  const handleRoyaltyChange = (value: number) => {
    setFormData({
      ...formData,
      royaltyPercentage: value,
    });
  };

  // Handle file upload
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      
      setFormData({
        ...formData,
        coverImage: file,
        coverImagePreview: previewUrl,
      });
    }
  };

  // Handle file removal
  const handleRemoveFile = () => {
    setFormData({
      ...formData,
      coverImage: null,
      coverImagePreview: '',
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleContinue = () => {
    // Here you would typically validate the form
    // and process the data before proceeding
    
    // Navigate to the next step (deployment confirmation)
    router.push('/nft/create/deploy/ERC721/confirm');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading text-oracle-orange mb-4">Set Up Your Collection</h1>
        <p className="text-oracle-white/70 max-w-2xl mx-auto">
          Configure the metadata and settings for your ERC721 NFT collection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column - Input Form */}
        <div className="space-y-8">
          {/* Cover Image Upload */}
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <label className="block text-oracle-white font-medium">
                Cover Image <span className="text-cosmic-combustion">*</span>
              </label>
              <div className="relative ml-2">
                <FiInfo 
                  className="text-oracle-orange/60 hover:text-oracle-orange cursor-pointer transition-colors"
                  size={16}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <div className="absolute z-10 w-60 p-2 mt-2 bg-ancient-wisdom border border-oracle-orange/20 rounded-md shadow-lg -left-28 top-6">
                    <p className="text-xs text-oracle-white/90">
                      This image will be used as the main visual representation of your collection.
                      Recommended size: 1000x1000px or larger, square aspect ratio.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {formData.coverImagePreview ? (
              <div className="relative">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image 
                    src={formData.coverImagePreview} 
                    alt="Collection cover" 
                    fill 
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
                <button 
                  onClick={handleRemoveFile}
                  className="absolute top-2 right-2 bg-oracle-black/80 p-2 rounded-full text-oracle-white/80 hover:text-oracle-white hover:bg-oracle-black transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-oracle-orange/30 rounded-lg p-8 text-center cursor-pointer hover:border-oracle-orange/50 transition-colors"
              >
                <FiUpload className="mx-auto text-oracle-orange/50 mb-4" size={32} />
                <p className="text-oracle-white/60 mb-2">Click to upload collection cover image</p>
                <p className="text-xs text-oracle-white/40">Recommended: 1000x1000px (PNG, JPG, WEBP)</p>
              </div>
            )}
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          
          {/* Collection Name */}
          <FormField
            label="Collection Name"
            name="name"
            placeholder="My Awesome NFT Collection"
            value={formData.name}
            onChange={handleInputChange}
            required
            tooltip="The name of your NFT collection as it will appear in marketplaces and wallets."
            maxLength={50}
          />
          
          {/* Token Symbol */}
          <FormField
            label="Token Symbol"
            name="symbol"
            placeholder="NFT"
            value={formData.symbol}
            onChange={handleInputChange}
            required
            tooltip="A short identifier for your collection (3-5 uppercase letters recommended)."
            maxLength={10}
          />
          
          {/* Description */}
          <FormField
            label="Description"
            name="description"
            type="textarea"
            placeholder="Describe your collection..."
            value={formData.description}
            onChange={handleInputChange}
            tooltip="A detailed description of your collection. This will appear on marketplaces and helps collectors understand your project."
            maxLength={500}
          />
          
          {/* Royalty Settings */}
          <div className="pt-4 border-t border-oracle-orange/10">
            <h2 className="text-xl font-heading text-oracle-orange mb-6">Royalty Settings</h2>
            
            {/* Royalty Percentage */}
            <NumberInput
              label="Royalty Percentage"
              name="royaltyPercentage"
              value={formData.royaltyPercentage}
              onChange={handleRoyaltyChange}
              min={0}
              max={15}
              step={0.5}
              tooltip="Percentage of the sale price you'll receive for secondary sales. Industry standard is 5-10%."
            />
            
            {/* Royalty Recipient */}
            <FormField
              label="Royalty Recipient"
              name="royaltyRecipient"
              placeholder="0x..."
              value={formData.royaltyRecipient}
              onChange={handleInputChange}
              required
              tooltip="The wallet address that will receive royalty payments from secondary sales."
            />
          </div>
        </div>
        
        {/* Right Column - Preview */}
        <div className="bg-sinister-black/40 border border-oracle-orange/20 rounded-xl p-6 lg:sticky lg:top-8 h-fit">
          <h2 className="text-xl font-heading text-oracle-orange mb-6">Collection Preview</h2>
          
          <div className="space-y-6">
            <div className="bg-ancient-wisdom/10 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-sinister-black/60 rounded-lg overflow-hidden flex-shrink-0">
                  {formData.coverImagePreview ? (
                    <div className="relative w-full h-full">
                      <Image 
                        src={formData.coverImagePreview} 
                        alt="Collection preview" 
                        fill 
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiPackage className="text-oracle-orange/40" size={32} />
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-heading text-oracle-white">
                    {formData.name || "Collection Name"}
                  </h3>
                  <p className="text-sm text-oracle-white/60 mb-2">
                    {formData.symbol ? `$${formData.symbol}` : "$SYMBOL"}
                  </p>
                  <p className="text-xs text-oracle-white/50 line-clamp-3">
                    {formData.description || "Your collection description will appear here."}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-oracle-white mb-2">Royalty Information</h3>
              <div className="bg-ancient-wisdom/10 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-oracle-white/60">Percentage:</span>
                  <span className="text-sm text-oracle-white">{formData.royaltyPercentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-oracle-white/60">Recipient:</span>
                  <span className="text-sm text-oracle-white break-all">
                    {formData.royaltyRecipient || "0x..."}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-oracle-white mb-2">Deployment Information</h3>
              <div className="bg-ancient-wisdom/10 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-oracle-white/60">Network:</span>
                  <span className="text-sm text-cosmic-combustion">Metis Mainnet</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-oracle-white/60">Standard:</span>
                  <span className="text-sm text-oracle-white">ERC-721</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-oracle-white/60">Admin:</span>
                  <span className="text-sm text-oracle-white">Connected Wallet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-12">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<FiChevronRight />}
          onClick={handleContinue}
          animation="pulse"
          withShine
        >
          Continue to Deployment
        </Button>
      </div>
    </div>
  );
} 