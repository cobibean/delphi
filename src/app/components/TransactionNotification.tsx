"use client";

import { useState, useEffect } from "react";

export type NotificationType = "success" | "error" | "info" | "warning" | "loading";

interface TransactionNotificationProps {
  type: NotificationType;
  message: string;
  txHash?: string;
  onClose: () => void;
}

export default function TransactionNotification({
  type,
  message,
  txHash,
  onClose,
}: TransactionNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  
  // Auto-close notification after 5 seconds, but not for loading type
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (type !== 'loading') {
      timer = setTimeout(() => {
        handleClose();
      }, 5000);
    }
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    }, 2000);
    
    return () => {
      if (timer) clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, [type]);
  
  // Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };
  
  // If not visible, don't render
  if (!isVisible) return null;
  
  // Get the appropriate icon and colors based on notification type
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          bgColor: "bg-sinister-teal/10",
          borderColor: "border-sinister-teal",
          iconColor: "text-sinister-teal",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case "error":
        return {
          bgColor: "bg-sinister-red/10",
          borderColor: "border-sinister-red",
          iconColor: "text-sinister-red",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case "warning":
        return {
          bgColor: "bg-sinister-orange/10",
          borderColor: "border-sinister-orange",
          iconColor: "text-sinister-orange",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case "loading":
        return {
          bgColor: "bg-sinister-violet/10",
          borderColor: "border-sinister-violet",
          iconColor: "text-sinister-violet",
          icon: (
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ),
        };
      case "info":
      default:
        return {
          bgColor: "bg-sinister-violet/10",
          borderColor: "border-sinister-violet",
          iconColor: "text-sinister-violet",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };
  
  const { bgColor, borderColor, iconColor, icon } = getTypeStyles();
  
  return (
    <div 
      className={`fixed bottom-4 right-4 max-w-md w-full sm:w-96 ${
        isClosing ? 'opacity-0 translate-x-4' : 'opacity-100'
      } transition-all duration-300 z-50 ${glitchEffect ? 'animate-glitch' : ''}`}
    >
      <div className={`${bgColor} border-l-4 ${borderColor} shadow-dark p-4 flex items-start`}>
        <div className={`flex-shrink-0 ${iconColor}`}>
          {icon}
        </div>
        
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-sinister-scroll">{message}</p>
          
          {txHash && (
            <div className="mt-2">
              <a
                href={`https://explorer.metis.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sinister-teal hover:text-sinister-teal/80 underline"
              >
                View on Metis Explorer
              </a>
            </div>
          )}
        </div>
        
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleClose}
            className="bg-transparent rounded-md inline-flex text-sinister-scroll/60 hover:text-sinister-scroll focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 