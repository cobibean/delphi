'use client';

import LoadingIndicator from "@/components/feedback/LoadingIndicator";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ERC721Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the metadata setup page
    router.push('/features/nft/create/deploy/ERC721/metadata');
  }, [router]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <LoadingIndicator size="large" />
        <p className="text-oracle-white/70 mt-4">Redirecting to ERC721 Collection Setup...</p>
      </div>
    </div>
  );
}
