"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { metisChain } from '@/config/chain';
import { TransactionStatus } from '@/features/marketplace/components/TransactionStatus';

export type TransactionStatusType = 'loading' | 'success' | 'error' | 'info';

export interface TransactionNotification {
  id: string;
  type: TransactionStatusType;
  message: string;
  transactionHash?: string;
  timestamp: number;
}

interface TransactionNotificationProps {
  notification: TransactionNotification;
  onClose: (id: string) => void;
}

export const TransactionNotification: React.FC<TransactionNotificationProps> = ({ 
  notification, 
  onClose 
}) => {
  const [timeoutProgress, setTimeoutProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Determine auto-close duration based on notification type
  const getAutoCloseDuration = () => {
    switch (notification.type) {
      case 'success':
        return 8000; // 8 seconds for success notifications
      case 'error':
        return 10000; // 10 seconds for error notifications
      case 'info':
        return 5000; // 5 seconds for info notifications
      case 'loading':
        return null; // Loading notifications don't auto-close
      default:
        return 6000; // Default timeout
    }
  };
  
  const duration = getAutoCloseDuration();
  
  // Handle auto-close countdown
  useEffect(() => {
    if (!duration || isPaused) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const progress = (remaining / duration) * 100;
      
      setTimeoutProgress(progress);
      
      if (progress <= 0) {
        onClose(notification.id);
      } else {
        requestAnimationFrame(updateProgress);
      }
    };
    
    const animationId = requestAnimationFrame(updateProgress);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [duration, notification.id, isPaused, onClose]);
  
  // Get icon based on notification type
  const getIcon = () => {
    switch (notification.type) {
      case 'loading':
        return (
          <div className="animate-spin h-6 w-6 border-2 border-sinister-teal border-t-transparent rounded-full"></div>
        );
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  // Get background color based on notification type
  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'loading':
        return 'bg-sinister-black/90 border-l-sinister-teal';
      case 'success':
        return 'bg-sinister-black/90 border-l-green-500';
      case 'error':
        return 'bg-sinister-black/90 border-l-red-500';
      case 'info':
        return 'bg-sinister-black/90 border-l-blue-500';
      default:
        return 'bg-sinister-black/90 border-l-sinister-teal';
    }
  };
  
  // Format relative time
  const getRelativeTime = () => {
    const now = Date.now();
    const diff = now - notification.timestamp;
    
    if (diff < 60000) {
      return 'just now';
    } else if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      const hours = Math.floor(diff / 3600000);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className={`w-full max-w-md p-4 mb-3 border-l-4 shadow-xl rounded-r-lg ${getBackgroundColor()}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {getIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <p className="text-sm font-medium text-sinister-scroll">
                {notification.message}
              </p>
              <button
                onClick={() => onClose(notification.id)}
                className="text-sinister-scroll/50 hover:text-sinister-scroll ml-3"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <p className="text-xs text-sinister-scroll/70 mt-1">
              {getRelativeTime()}
            </p>
            
            {notification.transactionHash && (
              <div className="mt-2">
                <TransactionStatus transactionHash={notification.transactionHash} />
                <Link 
                  href={`https://explorer.metis.io/tx/${notification.transactionHash}`}
                  target="_blank"
                  className="text-xs text-sinister-teal hover:text-sinister-teal/80 mt-1 inline-block"
                >
                  View transaction →
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Progress bar for auto-close */}
        {duration && (
          <div className="relative h-1 mt-2 bg-sinister-scroll/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-sinister-scroll/30 rounded-full"
              style={{ width: `${timeoutProgress}%` }}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}; 