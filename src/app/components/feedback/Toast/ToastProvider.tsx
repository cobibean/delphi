"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { type ToastProps, defaultConfig } from "./types";
import { ToastContextProvider, useToast } from "./useToast";
import Toast from "./Toast";

interface ToastProviderProps {
  children: React.ReactNode;
}

// Separate component for the toast container/UI
const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  const getPositionClasses = (position = defaultConfig.position): string => {
    switch (position) {
      case "top-right":
        return "top-0 right-0";
      case "top-left":
        return "top-0 left-0";
      case "bottom-right":
        return "bottom-0 right-0";
      case "bottom-left":
      default:
        return "bottom-0 left-0";
    }
  };

  return (
    <div
      className={`fixed z-[100] flex max-h-screen w-full max-w-[420px] flex-col-reverse p-4 ${getPositionClasses()}`}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="mt-4">
            <Toast
              {...toast}
              onDismiss={() => dismiss(toast.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Main provider component
export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <ToastContextProvider>
      {children}
      <ToastContainer />
    </ToastContextProvider>
  );
};

export default ToastProvider; 