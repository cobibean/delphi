"use client";

import { createContext, ReactNode, useContext, useState } from 'react';
import { ERC1155DeployParams, ERC721DeployParams } from '../services/nftFactoryService';

// Types
export type TokenStandard = 'ERC721' | 'ERC1155';

export type CreateCollectionStep = 'type-selection' | 'metadata' | 'confirm' | 'deploy' | 'success';

export interface CollectionMetadata {
  name: string;
  symbol: string;
  description: string;
  coverImage: File | null;
  coverImageUrl: string;
  royaltyPercentage: number;
  royaltyRecipient: string;
  primarySaleRecipient: string;
}

export interface CreateCollectionState {
  step: CreateCollectionStep;
  tokenStandard: TokenStandard | null;
  metadata: CollectionMetadata;
  deployedAddress: string | null;
  error: string | null;
}

interface CreateCollectionContextProps {
  state: CreateCollectionState;
  setStep: (step: CreateCollectionStep) => void;
  setTokenStandard: (standard: TokenStandard) => void;
  updateMetadata: (updates: Partial<CollectionMetadata>) => void;
  setDeployedAddress: (address: string | null) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  getDeployParams: () => Omit<ERC721DeployParams, 'defaultAdmin'> | Omit<ERC1155DeployParams, 'defaultAdmin'> | null;
}

// Default state
const defaultMetadata: CollectionMetadata = {
  name: '',
  symbol: '',
  description: '',
  coverImage: null,
  coverImageUrl: '',
  royaltyPercentage: 5, // Default 5%
  royaltyRecipient: '',
  primarySaleRecipient: '',
};

const defaultState: CreateCollectionState = {
  step: 'type-selection',
  tokenStandard: null,
  metadata: defaultMetadata,
  deployedAddress: null,
  error: null,
};

// Create the context
const CreateCollectionContext = createContext<CreateCollectionContextProps | undefined>(undefined);

// Provider component
export function CreateCollectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CreateCollectionState>(defaultState);

  // Helper functions to update state
  const setStep = (step: CreateCollectionStep) => {
    setState(prev => ({ ...prev, step }));
  };

  const setTokenStandard = (tokenStandard: TokenStandard) => {
    setState(prev => ({ ...prev, tokenStandard }));
  };

  const updateMetadata = (updates: Partial<CollectionMetadata>) => {
    setState(prev => ({ 
      ...prev, 
      metadata: { ...prev.metadata, ...updates } 
    }));
  };

  const setDeployedAddress = (deployedAddress: string | null) => {
    setState(prev => ({ ...prev, deployedAddress }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const reset = () => {
    setState(defaultState);
  };

  // Convert state to deployment parameters
  const getDeployParams = () => {
    if (!state.tokenStandard) return null;

    const { metadata } = state;
    
    // Convert royalty percentage to basis points (e.g., 5% -> 500 bps)
    const royaltyBps = Math.round(metadata.royaltyPercentage * 100);
    
    // Use recipient's address or connected wallet if not set
    const royaltyRecipient = metadata.royaltyRecipient || metadata.primarySaleRecipient;
    
    const params = {
      name: metadata.name,
      symbol: metadata.symbol,
      royaltyRecipient,
      royaltyBps,
      primarySaleRecipient: metadata.primarySaleRecipient,
    };

    return params;
  };

  const value = {
    state,
    setStep,
    setTokenStandard,
    updateMetadata,
    setDeployedAddress,
    setError,
    reset,
    getDeployParams,
  };

  return (
    <CreateCollectionContext.Provider value={value}>
      {children}
    </CreateCollectionContext.Provider>
  );
}

// Custom hook to use the context
export function useCreateCollection() {
  const context = useContext(CreateCollectionContext);
  if (context === undefined) {
    throw new Error('useCreateCollection must be used within a CreateCollectionProvider');
  }
  return context;
} 