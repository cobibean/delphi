"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

// Define the Profile context state type
interface ProfileContextState {
  activeTab: string;
  setActiveTab: (newTab: string) => void;
  isLoading: boolean;
  nftCount: number;
  listingCount: number;
  totalValue: string;
  profilePictureUrl: string;
  setProfilePictureUrl: (newUrl: string) => void;
}

// Create the context with default values
const ProfileContext = createContext<ProfileContextState>({
  activeTab: "overview",
  setActiveTab: (_: string) => {
    // This will be implemented by the provider
    console.warn("setActiveTab called outside of ProfileProvider");
  },
  isLoading: false,
  nftCount: 0,
  listingCount: 0,
  totalValue: "0",
  profilePictureUrl: "",
  setProfilePictureUrl: (_: string) => {
    // This will be implemented by the provider
    console.warn("setProfilePictureUrl called outside of ProfileProvider");
  },
});

// Provider props type
interface ProfileProviderProps {
  children: ReactNode;
}

// Profile Provider component
export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  // Get initial tab from sessionStorage if available, otherwise use 'overview'
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [listingCount, setListingCount] = useState(0);
  const [totalValue, setTotalValue] = useState("0");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const account = useActiveAccount();

  // Check for stored active tab on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTab = sessionStorage.getItem("profileActiveTab");
      if (storedTab) {
        setActiveTab(storedTab);
        // Clear the stored tab after using it
        sessionStorage.removeItem("profileActiveTab");
      }
    }
  }, []);

  // Save active tab to sessionStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("profileActiveTab", activeTab);
    }
  }, [activeTab]);

  // When wallet connects/disconnects, reset relevant state
  useEffect(() => {
    if (!account) {
      // Reset state when wallet disconnects
      setNftCount(0);
      setListingCount(0);
      setTotalValue("0");
      setProfilePictureUrl("");
    }
  }, [account]);

  const value = {
    activeTab,
    setActiveTab,
    isLoading,
    nftCount,
    listingCount,
    totalValue,
    profilePictureUrl,
    setProfilePictureUrl,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for accessing the profile context
export const useProfile = () => useContext(ProfileContext); 