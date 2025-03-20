"use client";

import { useActiveAccount } from "thirdweb/react";
import { formatAddress } from "@/app/utils/formatting";

interface ActivityItem {
  type: "listing" | "minted" | "sale" | "transfer";
  address: string;
  price?: string;
  timestamp: Date;
}

interface ProfileActivityProps {
  activities?: ActivityItem[];
}

export default function ProfileActivity({ activities = [] }: ProfileActivityProps) {
  const account = useActiveAccount();

  return (
    <div className="mb-8">
      <h3 className="font-heading text-xl text-sinister-orange mb-4 uppercase tracking-wider">Transaction History</h3>
      <div className="space-y-3">
        {account ? (
          activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex justify-between items-center py-3 border-b border-sinister-orange/10">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === "listing" ? "bg-sinister-teal" :
                    activity.type === "minted" ? "bg-sinister-orange" :
                    activity.type === "sale" ? "bg-sinister-violet" :
                    "bg-sinister-scroll"
                  }`}></div>
                  <span className="text-sinister-scroll capitalize">{activity.type}</span>
                </div>
                <div className="text-sinister-scroll/70 text-sm">
                  by <span className="text-sinister-teal">{formatAddress(activity.address)}</span>
                </div>
                <div className="text-sinister-scroll/70 text-sm">
                  {activity.price ? `${activity.price} METIS` : "-"}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-sinister-scroll/70">
              No transaction history available.
            </div>
          )
        ) : (
          <div className="text-center py-8 text-sinister-scroll/70">
            Connect your wallet to view transaction history.
          </div>
        )}
      </div>
    </div>
  );
} 