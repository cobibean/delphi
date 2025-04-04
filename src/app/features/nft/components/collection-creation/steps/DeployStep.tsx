import { Button } from '@/app/components/ui/Button';
import React from 'react';
import { FiUpload } from 'react-icons/fi';
import { TokenStandard } from '../../../providers/CreateCollectionProvider';

interface DeployStepProps {
  tokenStandard: TokenStandard | null;
  deploymentFee: string | null;
  isDeploying: boolean;
  onDeploy: () => Promise<void>;
}

export const DeployStep: React.FC<DeployStepProps> = ({
  tokenStandard,
  deploymentFee,
  isDeploying,
  onDeploy,
}) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-heading text-oracle-orange mb-6">Deploy Your Collection</h1>
      
      <div className="w-24 h-24 mx-auto bg-cosmic-connection rounded-full flex items-center justify-center mb-8 animate-pulse">
        <FiUpload className="h-12 w-12 text-oracle-white" />
      </div>
      
      <p className="text-oracle-white mb-10 max-w-lg mx-auto">
        Ready to deploy your {tokenStandard} collection to the blockchain? 
        This will create a smart contract for your NFT collection.
      </p>
      
      <p className="text-oracle-white/70 mb-2">Total cost:</p>
      <p className="text-2xl text-oracle-orange mb-8">{deploymentFee || "Loading..."}</p>
      
      <Button
        variant="primary"
        size="lg"
        onClick={onDeploy}
        disabled={isDeploying}
        isLoading={isDeploying}
        animation="pulse"
        withShine
      >
        {isDeploying ? "Deploying..." : "Deploy Collection Now"}
      </Button>
      
      <p className="text-oracle-white/60 text-sm mt-4">
        You'll be asked to confirm this transaction in your wallet.
      </p>
    </div>
  );
};

export default DeployStep; 