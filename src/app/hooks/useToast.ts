"use client";

// This is a simple toast notification system
// In a production app, consider using a library like react-hot-toast, sonner, or toast from shadcn/ui

export interface ToastOptions {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    // In a real app, we would show a UI toast
    console.log(`${options.variant || 'default'} toast: ${options.title} - ${options.description}`);
    
    // For development, let's also alert for better visibility
    if (options.variant === 'destructive') {
      alert(`Error: ${options.title}\n${options.description}`);
    }
  };
  
  return { toast };
} 