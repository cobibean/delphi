"use client";

import { useActiveAccount } from "thirdweb/react";
import { useProfile } from "../context/ProfileContext";

interface TabProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function ProfileTabs() {
  const { activeTab, setActiveTab } = useProfile();
  const account = useActiveAccount();

  const tabs: TabProps[] = [
    {
      label: "Overview",
      value: "overview",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      label: "My NFTs",
      value: "nfts",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "My Listings",
      value: "listings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-wrap justify-center md:justify-start space-x-2 mb-8 border-b border-oracle-orange/20 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          disabled={!account && tab.value !== "overview"}
          className={`
            flex items-center space-x-2 py-2 px-4 rounded-lg transition-all
            ${activeTab === tab.value 
              ? "bg-cosmic-connection text-oracle-white shadow-md" 
              : "bg-ancient-wisdom/20 text-oracle-white/70 hover:bg-ancient-wisdom/40"}
            ${!account && tab.value !== "overview" ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
} 