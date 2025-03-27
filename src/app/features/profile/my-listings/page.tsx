"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyListingsRouter() {
  const router = useRouter();
  
  // Redirect to the profile page with listings tab active
  useEffect(() => {
    // Store the active tab in sessionStorage
    sessionStorage.setItem("profileActiveTab", "listings");
    router.push('/profile');
  }, [router]);
  
  return null;
} 