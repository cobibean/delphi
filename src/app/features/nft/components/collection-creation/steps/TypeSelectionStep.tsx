import React from 'react';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';
import { TokenTypeCard } from '../ui/TokenTypeCard';

interface TypeSelectionStepProps {
  tokenStandard: TokenStandard | null;
  setTokenStandard: (standard: TokenStandard) => void;
}

export const TypeSelectionStep: React.FC<TypeSelectionStepProps> = ({
  tokenStandard,
  setTokenStandard,
}) => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-heading text-oracle-orange">Choose NFT Standard</h1>
      <p className="text-oracle-white/70">
        Select the token standard that best fits your NFT collection needs.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <TokenTypeCard 
          type="ERC721"
          title="ERC-721"
          description="Traditional 1-of-1 NFTs. Each token is unique and individually owned."
          features={[
            "Unique collectibles",
            "Digital art pieces",
            "1-of-1 items",
            "Individual ownership"
          ]}
          isSelected={tokenStandard === 'ERC721'}
          onClick={() => setTokenStandard('ERC721')}
        />
        
        <TokenTypeCard 
          type="ERC1155"
          title="ERC-1155"
          description="Multi-token standard. Create editions with multiple copies of the same NFT."
          features={[
            "Multiple copies of each item",
            "Edition-based collections",
            "More gas efficient",
            "Trading card style collections"
          ]}
          isSelected={tokenStandard === 'ERC1155'}
          onClick={() => setTokenStandard('ERC1155')}
        />
      </div>
      
      <div className="mt-8 bg-oracle-black/20 rounded-lg p-5 border border-oracle-orange/10">
        <h3 className="text-lg font-heading text-oracle-orange mb-2">Not sure which to choose?</h3>
        <p className="text-oracle-white/70 text-sm mb-3">
          Choose ERC-721 for unique one-of-a-kind NFTs where each piece is distinct.
          Choose ERC-1155 for editions or collections where you want multiple copies of the same NFT.
        </p>
        <p className="text-oracle-white/70 text-sm">
          Both standards are widely supported across marketplaces, but have different trade-offs for gas costs and ownership models.
        </p>
      </div>
    </div>
  );
};

export default TypeSelectionStep; 