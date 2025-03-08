"use client";

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: 'quantum-portal' | 'reality-breach' | 'void-gate';
  dimensionalDepth?: 1 | 2 | 3 | 4 | 5;
  feature?: string;
  glitchEffect?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  variant = 'quantum-portal',
  dimensionalDepth = 3,
  feature,
  glitchEffect = false
}: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Variants for modal animations
  const variants = {
    'quantum-portal': {
      background: 'bg-gradient-to-br from-oracle-black-void to-oracle-black-matter',
      border: 'border-2 border-oracle-orange animate-energy-field',
      shadow: 'shadow-[0_0_30px_rgba(255,95,31,0.3)]'
    },
    'reality-breach': {
      background: 'bg-gradient-to-br from-oracle-purple/20 to-oracle-black-void',
      border: 'border-2 border-oracle-purple animate-energy-field',
      shadow: 'shadow-[0_0_30px_rgba(107,70,193,0.3)]'
    },
    'void-gate': {
      background: 'bg-gradient-to-br from-oracle-black-matter to-oracle-black-void',
      border: 'border-2 border-oracle-turquoise animate-energy-field',
      shadow: 'shadow-[0_0_30px_rgba(0,209,193,0.3)]'
    }
  };
  
  // Dimensional depth effects
  const depthEffects = {
    1: 'translate-z-0',
    2: 'translate-z-[10px]',
    3: 'translate-z-[20px]',
    4: 'translate-z-[30px]',
    5: 'translate-z-[40px]'
  };
  
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      rotateX: 10,
      filter: 'brightness(2) blur(10px)'
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotateX: 0,
      filter: 'brightness(1) blur(0px)',
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      rotateX: -10,
      filter: 'brightness(0.5) blur(10px)',
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="reality-modal"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-1 h-1 bg-oracle-orange rounded-full opacity-0 animate-cosmic-pulsation"
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          <motion.div
            className={`
              reality-modal-content max-w-md w-full mx-4 relative perspective-[1000px]
              ${variants[variant].background}
              ${variants[variant].border}
              ${variants[variant].shadow}
            `}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: `perspective(1000px) ${depthEffects[dimensionalDepth]}`
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Close button with implosion effect */}
            <motion.button
              className="absolute top-4 right-4 text-oracle-white hover:text-oracle-orange z-10"
              onClick={onClose}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.8 }}
            >
              <IoClose size={24} />
            </motion.button>
            
            {/* Modal title with optional glitch effect */}
            <h2 className={`text-2xl font-impact text-oracle-orange mb-4 ${glitchEffect ? 'text-glitch' : ''}`}>
              {title}
            </h2>
            
            {/* Feature badge if provided */}
            {feature && (
              <div className="absolute -top-3 -left-3 bg-oracle-purple text-oracle-white text-xs px-3 py-1 rounded-full animate-cosmic-pulsation">
                {feature}
              </div>
            )}
            
            {/* Modal content with floating effect */}
            <div className="relative z-10 animate-quantum-fluctuation">
              {children}
            </div>
            
            {/* Background energy effects */}
            <div className="absolute inset-0 -z-10 opacity-10 bg-gradient-to-br from-oracle-orange/20 via-oracle-turquoise/20 to-oracle-purple/20 rounded-lg" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 