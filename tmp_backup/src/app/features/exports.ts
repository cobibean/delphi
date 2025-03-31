/**
 * Features Exports
 * 
 * This file provides explicit exports to avoid naming conflicts between modules.
 * Use this file when you need specific imports without ambiguity.
 */

// Marketplace exports
export * from './marketplace/components';
export * from './marketplace/hooks';
export * from './marketplace/providers';

// Wallet exports
export * from './wallet/components';
export * from './wallet/hooks';
export * from './wallet/utils';

// NFT exports
export * from './nft/components';
export * from './nft/hooks';

// Profile exports
export * from './profile';

// Note: For services that have conflicts like 'Chain', import them directly:
// import { functionName } from '@/app/features/marketplace/services'; 