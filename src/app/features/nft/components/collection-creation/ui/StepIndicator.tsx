import React from 'react';
import { FiCheck } from 'react-icons/fi';
import { CreateCollectionStep } from '../../../providers/CreateCollectionProvider';

interface StepIndicatorProps {
  currentStep: CreateCollectionStep;
  stepNames: Record<CreateCollectionStep, string>;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, stepNames }) => {
  // Convert steps to an array for mapping
  const steps: CreateCollectionStep[] = ['type-selection', 'metadata', 'confirm', 'deploy', 'success'];
  
  const currentIndex = steps.indexOf(currentStep);
  
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between relative">
        {/* Progress bar background */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-oracle-orange/20"></div>
        
        {/* Active progress bar */}
        <div 
          className="absolute top-4 left-0 h-1 bg-cosmic-combustion transition-all duration-500"
          style={{ width: `${Math.min(100, (currentIndex / (steps.length - 1)) * 100)}%` }}
        ></div>
        
        {/* Step circles */}
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCompleted = index < currentIndex;
          
          return (
            <div 
              key={step} 
              className="flex flex-col items-center relative z-10"
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isActive ? 'bg-cosmic-combustion' : 'bg-oracle-orange/20'
                }`}
              >
                {isCompleted ? (
                  <FiCheck className="text-oracle-white" />
                ) : (
                  <span className="text-oracle-white">{index + 1}</span>
                )}
              </div>
              <span className={`text-xs mt-2 ${isActive ? 'text-cosmic-combustion' : 'text-oracle-white/60'}`}>
                {stepNames[step]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator; 