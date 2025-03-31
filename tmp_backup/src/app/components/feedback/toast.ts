// This file is a bridge to maintain backward compatibility
// It re-exports everything from the Toast directory with proper casing

import Toast from './Toast/Toast';
export { Toast as default };
export * from './Toast/types';
export { ToastProvider } from './Toast/ToastProvider';
export { useToast } from './Toast/useToast'; 