"use client";

import { useEffect, useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { getSocialProfiles } from "thirdweb/social";
import { useProfile } from "../context/ProfileContext";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onConnectClick?: () => void;
}

export default function ProfileAvatar({ 
  size = "lg", 
  className = "",
  onConnectClick
}: ProfileAvatarProps) {
  const account = useActiveAccount();
  const { profilePictureUrl, setProfilePictureUrl } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [socialProfiles, setSocialProfiles] = useState<any[]>([]);

  // Size classes for different avatar sizes
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  // Fetch social profiles when account changes
  useEffect(() => {
    const fetchSocialProfiles = async () => {
      if (!account) {
        setSocialProfiles([]);
        return;
      }

      setIsLoading(true);
      try {
        const client = createThirdwebClient({
          clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
        });

        const profiles = await getSocialProfiles({
          address: account.address,
          client,
        });

        setSocialProfiles(profiles);
        
        // Set profile picture from the first social profile with an avatar
        if (profiles.length > 0 && profiles[0]?.avatar && !profilePictureUrl) {
          setProfilePictureUrl(profiles[0].avatar);
        }
      } catch (error) {
        console.error("Error fetching social profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocialProfiles();
  }, [account, setProfilePictureUrl, profilePictureUrl]);

  // Handle image error
  const handleImageError = () => {
    // Fallback to default avatar
    setProfilePictureUrl("");
  };

  // Determine which avatar to display
  const renderAvatar = () => {
    if (profilePictureUrl) {
      return (
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      );
    }

    // Default avatar
    return (
      <div className="w-full h-full bg-oracle-orange/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-oracle-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    );
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full border-4 border-oracle-orange overflow-hidden flex-shrink-0 shadow-card-hover ${className}`}
      onClick={onConnectClick}
    >
      {isLoading ? (
        <div className="w-full h-full bg-oracle-orange/20 flex items-center justify-center animate-pulse">
          <div className="w-12 h-12 border-t-4 border-oracle-orange rounded-full animate-spin"></div>
        </div>
      ) : (
        renderAvatar()
      )}
    </div>
  );
} 