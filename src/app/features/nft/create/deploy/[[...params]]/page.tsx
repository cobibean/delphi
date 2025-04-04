'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DeployRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the new unified flow
    router.replace('/features/nft/create');
  }, [router]);
  
  // Show loading state while redirecting
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="w-16 h-16 border-4 border-oracle-orange/30 border-t-oracle-orange rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-oracle-white">Redirecting to the new collection creation flow...</p>
    </div>
  );
} 