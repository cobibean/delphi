"use client";

import React, { useState, useEffect } from "react";

export type NotificationType = "success" | "error" | "info" | "loading";

interface TransactionNotificationProps {
  type: NotificationType;
  message: string;
  txHash?: string;
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export default function TransactionNotification({
  type,
  message,
  txHash,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: TransactionNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && type !== "loading") {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, onClose, type]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case "error":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      case "info":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "loading":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin text-turquoise-400">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
        );
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "success": return "bg-green-50 dark:bg-green-900/20";
      case "error": return "bg-red-50 dark:bg-red-900/20";
      case "info": return "bg-blue-50 dark:bg-blue-900/20";
      case "loading": return "bg-gray-50 dark:bg-gray-800";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "success": return "border-green-200 dark:border-green-800";
      case "error": return "border-red-200 dark:border-red-800";
      case "info": return "border-blue-200 dark:border-blue-800";
      case "loading": return "border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 max-w-md w-full md:w-96 p-4 rounded-lg shadow-lg border ${getBgColor()} ${getBorderColor()} transition-all duration-300`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{message}</h3>
          {txHash && (
            <div className="mt-1">
              <a 
                href={`https://explorer.metis.io/tx/${txHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-turquoise-500 hover:text-turquoise-600 underline"
              >
                View on Explorer
              </a>
            </div>
          )}
        </div>
        <button 
          onClick={handleClose}
          className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
} 