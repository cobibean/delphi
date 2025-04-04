import React from 'react';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';

interface ConfirmStepProps {
  tokenStandard: TokenStandard | null;
  metadata: {
    name: string;
    symbol: string;
    description: string;
    coverImageUrl: string;
    royaltyPercentage: number;
    royaltyRecipient: string;
    primarySaleRecipient: string;
  };
  deploymentFee: string | null;
}

export const ConfirmStep: React.FC<ConfirmStepProps> = ({
  tokenStandard,
  metadata,
  deploymentFee,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-heading text-oracle-orange mb-6">Confirm Collection Details</h1>
      
      <div className="bg-sinister-black/40 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-heading text-oracle-turquoise mb-4">Collection Preview</h2>
        
        <div className="flex items-start space-x-4 mb-6">
          {metadata.coverImageUrl && (
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={metadata.coverImageUrl} 
                alt="Collection cover" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div>
            <h3 className="text-xl text-oracle-white font-semibold">{metadata.name}</h3>
            <p className="text-oracle-orange">{metadata.symbol}</p>
            {metadata.description && (
              <p className="text-oracle-white/70 text-sm mt-2">{metadata.description}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-oracle-white/60 text-sm">Collection Type</h4>
            <p className="text-oracle-white">{tokenStandard}</p>
          </div>
          
          <div>
            <h4 className="text-oracle-white/60 text-sm">Royalties</h4>
            <p className="text-oracle-white">{metadata.royaltyPercentage}%</p>
          </div>
          
          <div>
            <h4 className="text-oracle-white/60 text-sm">Royalty Recipient</h4>
            <p className="text-oracle-white truncate">{metadata.royaltyRecipient || "Not set (defaults to creator)"}</p>
          </div>
          
          <div>
            <h4 className="text-oracle-white/60 text-sm">Primary Sale Recipient</h4>
            <p className="text-oracle-white truncate">{metadata.primarySaleRecipient}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-sinister-black/40 rounded-lg p-6">
        <h2 className="text-xl font-heading text-oracle-turquoise mb-4">Deployment Fee</h2>
        <div className="flex justify-between items-center">
          <span className="text-oracle-white">One-time contract creation fee</span>
          <span className="text-oracle-white font-semibold">{deploymentFee || "Loading..."}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmStep; 