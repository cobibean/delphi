'use client';

import { Button } from '@/app/components/ui/Button';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useActiveAccount } from 'thirdweb/react';
import { useNFTFactory } from '../../hooks/useNFTFactory';
import { CreateCollectionStep, useCreateCollection } from '../../providers/CreateCollectionProvider';

// Import step components
import { ConfirmStep } from './steps/ConfirmStep';
import { DeployStep } from './steps/DeployStep';
import { MetadataStep } from './steps/MetadataStep';
import { SuccessStep } from './steps/SuccessStep';
import { TypeSelectionStep } from './steps/TypeSelectionStep';
import { StepIndicator } from './ui/StepIndicator';

export default function CreateCollectionStepper() {
  const { 
    state, 
    setStep, 
    updateMetadata,
    setTokenStandard,
    getDeployParams 
  } = useCreateCollection();
  
  const account = useActiveAccount();
  const { 
    deployERC721Collection, 
    deployERC1155Collection, 
    fetchDeploymentFee,
    isDeploying,
    deploymentFee
  } = useNFTFactory();
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // Step names for the indicator
  const stepNames: Record<CreateCollectionStep, string> = {
    'type-selection': 'Choose Type',
    'metadata': 'Collection Details',
    'confirm': 'Review',
    'deploy': 'Deploy',
    'success': 'Success'
  };
  
  // Fetch deployment fee on mount
  useEffect(() => {
    fetchDeploymentFee();
  }, []);
  
  // Prepare wallet address if connected
  useEffect(() => {
    if (account && account.address) {
      // Prefill primary sale recipient with connected wallet
      if (!state.metadata.primarySaleRecipient) {
        updateMetadata({
          primarySaleRecipient: account.address
        });
      }
      
      // Prefill royalty recipient with connected wallet
      if (!state.metadata.royaltyRecipient) {
        updateMetadata({
          royaltyRecipient: account.address
        });
      }
    }
  }, [account]);
  
  // Handle next button click
  const handleNext = () => {
    if (state.step === 'type-selection') {
      // Validate token standard selection
      if (!state.tokenStandard) {
        // Show some validation error or toast
        return;
      }
    }
    
    if (state.step === 'metadata') {
      // Validate metadata before proceeding
      const errors: Record<string, string> = {};
      
      if (!state.metadata.name.trim()) {
        errors.name = 'Collection name is required';
      }
      
      if (!state.metadata.symbol.trim()) {
        errors.symbol = 'Symbol is required';
      }
      
      if (!state.metadata.coverImage) {
        errors.coverImage = 'Cover image is required';
      }
      
      if (!state.metadata.primarySaleRecipient) {
        errors.primarySaleRecipient = 'Primary sale recipient is required';
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
    }
    
    // Find current step index and move to next
    const steps: CreateCollectionStep[] = ['type-selection', 'metadata', 'confirm', 'deploy', 'success'];
    const currentIndex = steps.indexOf(state.step);
    
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    const steps: CreateCollectionStep[] = ['type-selection', 'metadata', 'confirm', 'deploy', 'success'];
    const currentIndex = steps.indexOf(state.step);
    
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };
  
  // Handle deployment
  const handleDeploy = async () => {
    if (!account) return;
    
    const params = getDeployParams();
    if (!params) return;
    
    try {
      if (state.tokenStandard === 'ERC721') {
        await deployERC721Collection(params);
      } else if (state.tokenStandard === 'ERC1155') {
        await deployERC1155Collection(params);
      }
      
      // Move to success step
      setStep('success');
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Step Indicator */}
      <StepIndicator currentStep={state.step} stepNames={stepNames} />
      
      {/* Step Content */}
      <div className="bg-ancient-wisdom border border-oracle-orange/20 rounded-xl p-8 shadow-card-normal">
        {/* Type Selection Step */}
        {state.step === 'type-selection' && (
          <TypeSelectionStep 
            tokenStandard={state.tokenStandard}
            setTokenStandard={setTokenStandard}
          />
        )}
        
        {/* Metadata Step */}
        {state.step === 'metadata' && (
          <MetadataStep 
            tokenStandard={state.tokenStandard}
            metadata={state.metadata}
            updateMetadata={updateMetadata}
            validationErrors={validationErrors}
          />
        )}
        
        {/* Confirmation Step */}
        {state.step === 'confirm' && (
          <ConfirmStep 
            tokenStandard={state.tokenStandard}
            metadata={state.metadata}
            deploymentFee={deploymentFee}
          />
        )}
        
        {/* Deploy Step */}
        {state.step === 'deploy' && (
          <DeployStep 
            tokenStandard={state.tokenStandard}
            deploymentFee={deploymentFee}
            isDeploying={isDeploying}
            onDeploy={handleDeploy}
          />
        )}
        
        {/* Success Step */}
        {state.step === 'success' && (
          <SuccessStep 
            tokenStandard={state.tokenStandard}
            deployedAddress={state.deployedAddress}
          />
        )}
        
        {/* Navigation buttons */}
        {state.step !== 'success' && (
          <div className="flex justify-between mt-10">
            {state.step !== 'type-selection' ? (
              <Button
                variant="secondary"
                onClick={handleBack}
                leftIcon={<FiChevronLeft />}
                disabled={isDeploying}
              >
                Back
              </Button>
            ) : (
              <div></div> /* Empty div for spacing */
            )}
            
            {state.step !== 'deploy' && (
              <Button
                variant="primary"
                rightIcon={<FiChevronRight />}
                onClick={handleNext}
              >
                {state.step === 'confirm' ? 'Continue to Deploy' : 'Next'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 