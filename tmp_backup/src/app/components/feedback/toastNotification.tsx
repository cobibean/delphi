"use client";

import React from 'react';

interface ToastNotificationProps {
  children: React.ReactNode;
}

/**
 * A component that provides toast notification capabilities to its children
 * This wrapper can be used to provide toast context to any part of the application
 */
const ToastNotification: React.FC<ToastNotificationProps> = ({ children }) => {
  // The actual toast functionality is implemented in the useToast hook
  // This component just provides a wrapper for organization purposes
  
  return (
    <>
      {children}
    </>
  );
};

export default ToastNotification; 