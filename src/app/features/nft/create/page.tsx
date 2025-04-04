"use client";

import { CreateCollectionStepper } from '../components';
import { NFTPageLayout } from '../layout/NFTPageLayout';
import { CreateCollectionProvider } from '../providers/CreateCollectionProvider';

export default function CreateCollectionPage() {
  return (
    <NFTPageLayout
      title="Create a Collection"
      description="Deploy your own NFT collection contract to the blockchain"
      showBackButton={true}
      backButtonUrl="/dashboard"
    >
      <div className="w-full">
        <CreateCollectionProvider>
          <CreateCollectionStepper />
        </CreateCollectionProvider>
      </div>
    </NFTPageLayout>
  );
} 