import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';

interface TokenTypeCardProps {
  type: TokenStandard;
  title: string;
  description: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}

export const TokenTypeCard: React.FC<TokenTypeCardProps> = ({
  type,
  title,
  description,
  features,
  isSelected,
  onClick,
}) => {
  return (
    <div 
      className={`bg-ancient-wisdom border-2 ${isSelected ? 'border-cosmic-combustion' : 'border-oracle-orange/20'} rounded-xl p-6 cursor-pointer transition-all hover:border-cosmic-combustion`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className={`w-6 h-6 rounded-full ${isSelected ? 'bg-cosmic-combustion' : 'bg-oracle-orange/20'} flex items-center justify-center mr-3`}>
          {isSelected && <FiCheck className="text-oracle-white" size={14} />}
        </div>
        <h3 className="text-xl font-heading text-oracle-orange">{title}</h3>
      </div>
      
      <p className="text-oracle-white/70 mb-4 text-sm">{description}</p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <FiCheck className="text-cosmic-combustion mt-1 mr-2 flex-shrink-0" />
            <span className="text-oracle-white text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenTypeCard; 