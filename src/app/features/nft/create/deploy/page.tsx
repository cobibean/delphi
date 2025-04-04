'use client';

import { Button } from '@/app/components/ui/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronRight, FiPackage } from 'react-icons/fi';

// Token Standard Card component
const TokenStandardCard = ({ 
  type, 
  title, 
  description, 
  points,
  selected, 
  onSelect 
}: { 
  type: 'ERC721' | 'ERC1155'; 
  title: string; 
  description: string;
  points: string[];
  selected: boolean; 
  onSelect: () => void; 
}) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
        selected 
          ? 'border-cosmic-combustion bg-sinister-black/40' 
          : 'border-oracle-orange/20 bg-sinister-black/20 hover:border-oracle-orange/40'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-lg mr-4 ${selected ? 'bg-cosmic-combustion/20' : 'bg-cosmic-combustion/10'}`}>
          <FiPackage className={`${selected ? 'text-cosmic-combustion' : 'text-oracle-orange'}`} size={24} />
        </div>
        <div>
          <h3 className={`font-heading text-xl ${selected ? 'text-cosmic-combustion' : 'text-oracle-white'}`}>{title}</h3>
          <p className="text-sm text-oracle-white/60">{description}</p>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-2 mt-1 text-xs ${selected ? 'text-cosmic-combustion' : 'text-oracle-orange'}`}>•</span>
              <span className="text-sm text-oracle-white/80">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function TokenStandardSelection() {
  const router = useRouter();
  const [selectedStandard, setSelectedStandard] = useState<'ERC721' | 'ERC1155'>('ERC721');

  const handleContinue = () => {
    if (selectedStandard === 'ERC721') {
      router.push('/features/nft/create/deploy/ERC721/metadata');
    } else {
      router.push('/features/nft/create/deploy/ERC1155/metadata');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading text-oracle-orange mb-4">Choose Your NFT Type</h1>
        <p className="text-oracle-white/70 max-w-2xl mx-auto">
          Select the token standard that best fits your NFT collection needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <TokenStandardCard
          type="ERC721"
          title="ERC721"
          description="Unique, one-of-one NFTs"
          points={[
            "Best for art, PFPs, single-edition collectibles",
            "Each token is completely unique",
            "Higher gas cost per mint than ERC1155",
            "The most widely adopted NFT standard"
          ]}
          selected={selectedStandard === 'ERC721'}
          onSelect={() => setSelectedStandard('ERC721')}
        />
        
        <TokenStandardCard
          type="ERC1155"
          title="ERC1155"
          description="Multi-edition or semi-fungible NFTs"
          points={[
            "Ideal for membership passes, in-game items, etc.",
            "Create multiple copies of the same NFT efficiently",
            "Lower gas costs for multiple mints",
            "Great for collections with tiered rarities"
          ]}
          selected={selectedStandard === 'ERC1155'}
          onSelect={() => setSelectedStandard('ERC1155')}
        />
      </div>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          rightIcon={<FiChevronRight />}
          onClick={handleContinue}
          animation="pulse"
          withShine
        >
          Continue
        </Button>
      </div>
    </div>
  );
} 