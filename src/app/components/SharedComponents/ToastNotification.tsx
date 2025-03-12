import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useErrorStore, ErrorType } from '@/app/stores/errorStore';

const getToastColors = (type: ErrorType) => {
  switch (type) {
    case 'success':
      return 'bg-gradient-to-r from-[#00D1C1] to-[#00FFF0]';
    case 'error':
      return 'bg-gradient-to-r from-[#FF3000] to-[#FF7A00]';
    case 'warning':
      return 'bg-gradient-to-r from-[#FFD700] to-[#FFEA80]';
    case 'info':
      return 'bg-gradient-to-r from-[#6B46C1] to-[#9B4DFF]';
  }
};

const ToastNotification = () => {
  const { errors, removeError } = useErrorStore();

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-4">
      <AnimatePresence>
        {errors.map((error) => (
          <motion.div
            key={error.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              mass: 1
            }}
            className={`
              ${getToastColors(error.type)}
              p-4 rounded-lg shadow-xl
              min-w-[300px] max-w-md
              border border-opacity-20 border-[#F8F5F0]
              backdrop-blur-sm
              transform hover:scale-105 transition-transform
              cursor-pointer
              text-[#F8F5F0]
            `}
            onClick={() => removeError(error.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold mb-1">{error.message}</p>
                {error.recoveryAction && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      error.recoveryAction?.action();
                      removeError(error.id);
                    }}
                    className="underline text-sm hover:text-opacity-80"
                  >
                    {error.recoveryAction.label}
                  </button>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeError(error.id);
                }}
                className="opacity-70 hover:opacity-100 ml-4"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastNotification; 