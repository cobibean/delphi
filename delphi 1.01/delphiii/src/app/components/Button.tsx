"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: ReactNode;
  variant?: 'hyper-primary' | 'hyper-secondary';
  energyField?: 'cosmic-flare' | 'quantum-pulse' | 'void-ripple';
  dimensionRift?: boolean;
  realityBend?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'hyper-primary',
  energyField = 'cosmic-flare',
  dimensionRift = false,
  realityBend = false,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  // Energy field effects
  const energyFields = {
    'cosmic-flare': 'before:absolute before:inset-0 before:rounded-md before:bg-oracle-orange/20 before:blur-md before:scale-110 before:z-[-1]',
    'quantum-pulse': 'before:absolute before:inset-0 before:rounded-md before:bg-oracle-turquoise/20 before:blur-md before:scale-110 before:z-[-1]',
    'void-ripple': 'before:absolute before:inset-0 before:rounded-md before:bg-oracle-purple/20 before:blur-md before:scale-110 before:z-[-1]',
  };
  
  // Button variants
  const variants = {
    'hyper-primary': 'bg-gradient-to-r from-oracle-orange-hot via-oracle-orange-solar to-oracle-orange text-oracle-white',
    'hyper-secondary': 'bg-transparent border-2 border-oracle-orange text-oracle-orange',
  };
  
  // Special effects
  const dimensionRiftClass = dimensionRift ? 'after:content-[""] after:absolute after:inset-0 after:rounded-md after:opacity-0 hover:after:opacity-30 after:bg-oracle-turquoise after:blur-md after:scale-90 after:z-[-1] after:transition-all after:duration-300' : '';
  const realityBendClass = realityBend ? 'hover:skew-x-2 hover:translate-x-0.5 hover:-translate-y-0.5' : '';
  
  // Animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden font-bold py-2 px-6 rounded-md
        transition-all duration-300 transform
        focus:outline-none focus:ring-2 focus:ring-oracle-orange focus:ring-opacity-50
        ${variants[variant]}
        ${energyFields[energyField]}
        ${dimensionRiftClass}
        ${realityBendClass}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
    >
      {/* Particle effects */}
      {variant === 'hyper-primary' && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 animate-cosmic-pulsation" 
               style={{ left: '10%', top: '20%', animationDelay: '0s' }} />
          <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 animate-cosmic-pulsation" 
               style={{ left: '30%', top: '50%', animationDelay: '0.5s' }} />
          <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 animate-cosmic-pulsation" 
               style={{ left: '70%', top: '30%', animationDelay: '1s' }} />
          <div className="absolute top-0 left-0 w-1 h-1 bg-white rounded-full opacity-0 animate-cosmic-pulsation" 
               style={{ left: '90%', top: '70%', animationDelay: '1.5s' }} />
        </div>
      )}
      
      {/* Button text with potential glitch effect */}
      <span className={`relative z-10 ${Math.random() > 0.9 ? 'text-glitch' : ''}`}>
        {children}
      </span>
    </motion.button>
  );
} 