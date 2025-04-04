import { Button } from '@/app/components/ui/Button';
import Link from 'next/link';
import React from 'react';
import { FiCheck, FiChevronRight } from 'react-icons/fi';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';

interface SuccessStepProps {
  tokenStandard: TokenStandard | null;
  deployedAddress: string | null;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  tokenStandard,
  deployedAddress,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-heading text-oracle-orange mb-6">Collection Deployed!</h1>
      
      <div className="w-24 h-24 mx-auto bg-cosmic-connection rounded-full flex items-center justify-center mb-8">
        <FiCheck className="h-12 w-12 text-oracle-white" />
      </div>
      
      <p className="text-oracle-white mb-8 max-w-lg mx-auto">
        Your {tokenStandard} collection has been successfully deployed to the blockchain.
        You can now manage your collection and mint NFTs.
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/dashboard/collections">
          <Button
            variant="secondary"
            size="lg"
            rightIcon={<FiChevronRight />}
          >
            View My Collections
          </Button>
        </Link>
        
        {deployedAddress && (
          <Link href={`/dashboard/collections/${deployedAddress}`}>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<FiChevronRight />}
              animation="pulse"
              withShine
            >
              Manage Collection
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SuccessStep; 