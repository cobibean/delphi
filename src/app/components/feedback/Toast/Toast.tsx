"use client";

import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { type ToastProps, toastStyles, toastAnimations } from "./types";

const Toast: React.FC<ToastProps> = ({ 
  id, 
  title, 
  description, 
  variant = "info", 
  action, 
  duration = 5000, 
  onDismiss 
}) => {
  // Auto-dismiss toast after duration (if specified)
  React.useEffect(() => {
    if (onDismiss && typeof window !== "undefined" && duration) {
      const timer = setTimeout(() => {
        onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  return (
    <div
      className={`group pointer-events-auto relative flex w-full items-center justify-between 
                space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all
                bg-gradient-to-r ${toastStyles[variant].gradient}`}
    >
      <motion.div
        initial={toastAnimations.initial}
        animate={toastAnimations.animate}
        exit={toastAnimations.exit}
        transition={toastAnimations.transition}
        className="grid gap-1 w-full"
      >
        {title && (
          <div className="text-sm font-semibold">
            <span className="mr-2">{toastStyles[variant].icon}</span>
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90">
            {description}
          </div>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm underline hover:opacity-80"
          >
            {action.label}
          </button>
        )}
      </motion.div>
      <button
        onClick={() => onDismiss?.()}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast; 