"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { type ToastProps, type ToastState, type ToastVariant } from './types';

// Create a context for the toast state
const ToastContext = createContext<ToastState | undefined>(undefined);

// Global variable to store toast state outside of React
let globalToasts: ToastProps[] = [];
let listeners: Array<(toasts: ToastProps[]) => void> = [];

// Function to update global state and notify listeners
const updateGlobalToasts = (newToasts: ToastProps[]) => {
  globalToasts = newToasts;
  listeners.forEach(listener => listener(globalToasts));
};

// Standalone version of toast methods for use outside of React components
export const standalone = {
  success: (title: string, description?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, description, variant: "success" as ToastVariant, duration };
    updateGlobalToasts([...globalToasts, newToast]);
    return id;
  },
  error: (title: string, description?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, description, variant: "error" as ToastVariant, duration: duration || 10000 };
    updateGlobalToasts([...globalToasts, newToast]);
    return id;
  },
  info: (title: string, description?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, description, variant: "info" as ToastVariant, duration };
    updateGlobalToasts([...globalToasts, newToast]);
    return id;
  },
  warning: (title: string, description?: string, duration?: number) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { id, title, description, variant: "warning" as ToastVariant, duration };
    updateGlobalToasts([...globalToasts, newToast]);
    return id;
  },
  custom: (props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...props, id };
    updateGlobalToasts([...globalToasts, newToast]);
    return id;
  },
  dismiss: (id: string) => {
    updateGlobalToasts(globalToasts.filter(toast => toast.id !== id));
  },
  reset: () => {
    updateGlobalToasts([]);
  }
};

// Create a provider component that doesn't use JSX
export const ToastContextProvider = (props: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>(globalToasts);

  // Register this component as a listener
  useEffect(() => {
    const listener = (updatedToasts: ToastProps[]) => {
      setToasts([...updatedToasts]);
    };
    
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  const add = useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    updateGlobalToasts([...globalToasts, newToast]);
  }, []);

  const remove = useCallback((id: string) => {
    updateGlobalToasts(globalToasts.filter(toast => toast.id !== id));
  }, []);

  const update = useCallback((id: string, toast: Partial<ToastProps>) => {
    updateGlobalToasts(
      globalToasts.map(t => t.id === id ? { ...t, ...toast } : t)
    );
  }, []);

  const dismiss = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  const reset = useCallback(() => {
    updateGlobalToasts([]);
  }, []);

  // Convenience methods
  const toast = {
    success: (title: string, description?: string, duration?: number) => {
      add({ title, description, variant: "success" as ToastVariant, duration });
    },
    error: (title: string, description?: string, duration?: number) => {
      add({ title, description, variant: "error" as ToastVariant, duration: duration || 10000 }); // Errors show longer by default
    },
    info: (title: string, description?: string, duration?: number) => {
      add({ title, description, variant: "info" as ToastVariant, duration });
    },
    warning: (title: string, description?: string, duration?: number) => {
      add({ title, description, variant: "warning" as ToastVariant, duration });
    },
    custom: (props: Omit<ToastProps, "id">) => {
      add(props);
    }
  };

  const value = {
    toasts,
    add,
    remove,
    update,
    dismiss,
    reset,
    toast
  };

  // Use createElement instead of JSX
  return /*#__PURE__*/React.createElement(ToastContext.Provider, {
    value: value
  }, props.children);
};

// Hook to use the toast context
export const useToast = (): ToastState => {
  const context = useContext(ToastContext);
  
  // If context is undefined, provide a fallback that uses the global state directly
  if (context === undefined) {
    // Return a dummy implementation that just logs warnings
    console.warn("Toast used outside provider context - notifications suppressed");
    return {
      toasts: [],
      add: () => { console.warn("Toast used outside provider - notification suppressed"); },
      remove: () => { console.warn("Toast remove called outside provider"); },
      update: () => { console.warn("Toast update called outside provider"); },
      dismiss: () => { console.warn("Toast dismiss called outside provider"); },
      reset: () => { console.warn("Toast reset called outside provider"); },
      toast: {
        success: () => { console.warn("Toast success called outside provider - notification suppressed"); },
        error: () => { console.warn("Toast error called outside provider - notification suppressed"); },
        info: () => { console.warn("Toast info called outside provider - notification suppressed"); },
        warning: () => { console.warn("Toast warning called outside provider - notification suppressed"); },
        custom: () => { console.warn("Toast custom called outside provider - notification suppressed"); }
      }
    };
  }
  
  return context;
}; 