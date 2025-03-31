"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyNFTsRouter() {
  const router = useRouter();
  
  // Redirect to the profile page with NFTs tab active
  useEffect(() => {
    // Store the active tab in sessionStorage
    sessionStorage.setItem("profileActiveTab", "nfts");
    router.push('/profile');
  }, [router]);
  
  return null;
} 