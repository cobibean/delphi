// Toast type definitions

"use client";

// Toast variants
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

// Toast position options
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

// Toast action (e.g., a clickable button within the toast)
export interface ToastAction {
  label: string;
  onClick: () => void;
}

// Properties for a toast notification
export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: ToastAction;
  duration?: number;
  onDismiss?: () => void;
}

// Toast convenience methods
export interface ToastMethods {
  success: (title: string, description?: string, duration?: number) => void;
  error: (title: string, description?: string, duration?: number) => void;
  info: (title: string, description?: string, duration?: number) => void;
  warning: (title: string, description?: string, duration?: number) => void;
  custom: (props: Omit<ToastProps, "id">) => void;
}

// Toast state management store type
export interface ToastState {
  toasts: ToastProps[];
  add: (toast: Omit<ToastProps, "id">) => void;
  remove: (id: string) => void;
  update: (id: string, toast: Partial<ToastProps>) => void;
  dismiss: (id: string) => void;
  reset: () => void;
  toast: ToastMethods;
}

// Default configurations
export const defaultConfig = {
  position: 'bottom-left' as ToastPosition,
  maxToasts: 3,
  dismissDuration: 5000,
  pauseOnHover: true,
  swipeToClose: true,
};

// Toast styling configurations by variant
export const toastStyles = {
  success: {
    gradient: 'from-[#00D1C1] to-[#00FFF0]',
    icon: '✓',
  },
  error: {
    gradient: 'from-[#FF3000] to-[#FF7A00]',
    icon: '!',
  },
  warning: {
    gradient: 'from-[#FFD700] to-[#FFEA80]',
    icon: '⚠',
  },
  info: {
    gradient: 'from-[#6B46C1] to-[#9B4DFF]',
    icon: 'i',
  },
};

// Animation configurations for toasts
export const toastAnimations = {
  initial: { opacity: 0, x: -100, scale: 0.8 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -100, scale: 0.8 },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 40,
    mass: 1,
  },
}; 