import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';
import { FormField } from '../ui/FormField';
import { NumberInput } from '../ui/NumberInput';

interface MetadataStepProps {
  tokenStandard: TokenStandard | null;
  metadata: {
    name: string;
    symbol: string;
    description: string;
    coverImage: File | null;
    coverImageUrl: string;
    royaltyPercentage: number;
    royaltyRecipient: string;
    primarySaleRecipient: string;
  };
  updateMetadata: (data: Partial<MetadataStepProps['metadata']>) => void;
  validationErrors: Record<string, string>;
}

export const MetadataStep: React.FC<MetadataStepProps> = ({
  tokenStandard,
  metadata,
  updateMetadata,
  validationErrors,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateMetadata({ [name]: value });
  };

  const handleRoyaltyChange = (value: number) => {
    updateMetadata({ royaltyPercentage: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      updateMetadata({
        coverImage: file,
        coverImageUrl: previewUrl
      });
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-heading text-oracle-orange">Collection Details</h1>
      <p className="text-oracle-white/70">
        Configure the metadata and settings for your {tokenStandard} collection.
      </p>
      
      <div className="mt-6">
        {/* Cover Image Upload */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <label className="block text-oracle-white font-medium">
              Cover Image <span className="text-cosmic-combustion">*</span>
            </label>
          </div>
          
          {metadata.coverImageUrl ? (
            <div className="relative w-full h-40 rounded-lg overflow-hidden mb-2">
              <img 
                src={metadata.coverImageUrl} 
                alt="Collection cover" 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => updateMetadata({ coverImage: null, coverImageUrl: '' })}
                className="absolute top-2 right-2 bg-sinister-black/80 rounded-full p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-oracle-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div 
              className={`border-2 border-dashed ${validationErrors.coverImage ? 'border-red-500' : 'border-oracle-orange/30'} rounded-xl p-8 flex flex-col items-center justify-center bg-oracle-black/20 cursor-pointer`}
              onClick={() => document.getElementById('coverImageInput')?.click()}
            >
              <div className="w-16 h-16 bg-cosmic-connection rounded-full flex items-center justify-center mb-4">
                <FiUpload className="h-8 w-8 text-oracle-white" />
              </div>
              <h3 className="font-heading text-lg text-oracle-turquoise mb-2">Upload Cover Image</h3>
              <p className="text-oracle-white/70 text-center mb-4 text-sm">
                Drag and drop or click to upload your image (PNG, JPG, GIF)
              </p>
              <input 
                id="coverImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
          {validationErrors.coverImage && (
            <p className="mt-1 text-sm text-red-500">{validationErrors.coverImage}</p>
          )}
        </div>
        
        {/* Collection Name */}
        <FormField
          label="Collection Name"
          name="name"
          placeholder="Enter your collection name"
          value={metadata.name}
          onChange={handleInputChange}
          required
          maxLength={50}
          error={validationErrors.name}
        />
        
        {/* Collection Symbol */}
        <FormField
          label="Symbol"
          name="symbol"
          placeholder="3-5 letter symbol (e.g. DLPH)"
          value={metadata.symbol}
          onChange={handleInputChange}
          required
          maxLength={10}
          tooltip="A short symbol for your collection, typically 3-5 uppercase letters"
          error={validationErrors.symbol}
        />
        
        {/* Description */}
        <FormField
          label="Description"
          name="description"
          type="textarea"
          placeholder="Describe your collection..."
          value={metadata.description}
          onChange={handleInputChange}
          maxLength={500}
        />
        
        {/* Royalty Percentage */}
        <NumberInput
          label="Royalty Percentage"
          name="royaltyPercentage"
          value={metadata.royaltyPercentage}
          onChange={handleRoyaltyChange}
          min={0}
          max={10}
          step={0.5}
          tooltip="Percentage of secondary sales you'll receive as royalties (max 10%)"
        />
        
        {/* Royalty Recipient */}
        <FormField
          label="Royalty Recipient"
          name="royaltyRecipient"
          placeholder="Wallet address to receive royalties"
          value={metadata.royaltyRecipient}
          onChange={handleInputChange}
          tooltip="Address that will receive royalty payments from secondary sales"
        />
        
        {/* Primary Sale Recipient */}
        <FormField
          label="Primary Sale Recipient"
          name="primarySaleRecipient"
          placeholder="Wallet address to receive primary sales"
          value={metadata.primarySaleRecipient}
          onChange={handleInputChange}
          required
          tooltip="Address that will receive funds from primary sales"
          error={validationErrors.primarySaleRecipient}
        />
      </div>
    </div>
  );
};

export default MetadataStep; 