import { create } from 'zustand';
import { StateCreator } from 'zustand';

export type ErrorType = 'error' | 'success' | 'warning' | 'info';

export interface ErrorMessage {
  id: string;
  type: ErrorType;
  message: string;
  recoveryAction?: {
    label: string;
    action: () => void;
  };
  timestamp: number;
}

interface ErrorStore {
  errors: ErrorMessage[];
  addError: (error: Omit<ErrorMessage, 'id' | 'timestamp'>) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
}

type ErrorStoreCreator = StateCreator<ErrorStore>;

export const useErrorStore = create<ErrorStore>((set: ErrorStoreCreator) => ({
  errors: [],
  addError: (error: Omit<ErrorMessage, 'id' | 'timestamp'>) => {
    const id = Math.random().toString(36).substring(7);
    const newError = {
      ...error,
      id,
      timestamp: Date.now(),
    };
    set((state: ErrorStore) => ({
      errors: [...state.errors, newError],
    }));
    // Auto-clear after 5 seconds unless it's an error with recovery action
    if (!error.recoveryAction) {
      setTimeout(() => {
        set((state: ErrorStore) => ({
          errors: state.errors.filter((e: ErrorMessage) => e.id !== id),
        }));
      }, 5000);
    }
  },
  removeError: (id: string) =>
    set((state: ErrorStore) => ({
      errors: state.errors.filter((error: ErrorMessage) => error.id !== id),
    })),
  clearErrors: () => set({ errors: [] }),
})); 