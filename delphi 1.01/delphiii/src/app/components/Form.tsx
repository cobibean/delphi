"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  dimensionalLayer?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

export default function Form({
  children,
  onSubmit,
  dimensionalLayer = 2,
  className = ''
}: FormProps) {
  // Dimensional layer effects
  const dimensionalLayers = {
    1: 'dimension-1',
    2: 'dimension-2',
    3: 'dimension-3',
    4: 'dimension-4',
    5: 'dimension-5'
  };
  
  return (
    <form 
      onSubmit={onSubmit}
      className={`
        relative p-6 rounded-lg bg-gradient-to-b from-oracle-black-matter to-oracle-black-void
        border border-oracle-orange/30 ${dimensionalLayers[dimensionalLayer]} ${className}
      `}
    >
      {/* Energy streams connecting form sections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-full w-[1px] left-[20%] top-0 bg-gradient-to-b from-oracle-orange/0 via-oracle-orange/30 to-oracle-orange/0" />
        <div className="absolute h-full w-[1px] left-[80%] top-0 bg-gradient-to-b from-oracle-orange/0 via-oracle-orange/30 to-oracle-orange/0" />
        <div className="absolute w-full h-[1px] left-0 top-[30%] bg-gradient-to-r from-oracle-orange/0 via-oracle-orange/20 to-oracle-orange/0" />
        <div className="absolute w-full h-[1px] left-0 top-[70%] bg-gradient-to-r from-oracle-orange/0 via-oracle-orange/20 to-oracle-orange/0" />
      </div>
      
      {/* Form content */}
      <div className="relative z-10 space-y-6">
        {children}
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  orbitalEffect?: boolean;
}

export function FormField({
  label,
  children,
  error,
  orbitalEffect = false
}: FormFieldProps) {
  return (
    <div className="relative">
      <motion.label 
        className={`block text-oracle-white mb-2 font-bold ${orbitalEffect ? 'animate-quantum-fluctuation' : ''}`}
        animate={orbitalEffect ? {
          x: [0, 2, 0, -2, 0],
          y: [0, -1, 0, 1, 0],
          transition: { repeat: Infinity, duration: 5, ease: "easeInOut" }
        } : {}}
      >
        {label}
      </motion.label>
      
      {children}
      
      {error && (
        <motion.div 
          className="text-oracle-error text-sm mt-1 animate-quantum-fluctuation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rippleEffect?: boolean;
  dimensionalState?: 'stable' | 'unstable' | 'quantum';
  className?: string;
  required?: boolean;
  name?: string;
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  rippleEffect = true,
  dimensionalState = 'stable',
  className = '',
  required = false,
  name
}: InputProps) {
  // Dimensional state effects
  const dimensionalStates = {
    'stable': '',
    'unstable': 'animate-quantum-fluctuation',
    'quantum': 'text-glitch'
  };
  
  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        className={`
          w-full bg-oracle-black border border-oracle-orange/30 text-oracle-white px-4 py-3 rounded-md
          focus:outline-none focus:border-oracle-orange focus:ring-1 focus:ring-oracle-orange
          transition-all duration-300 ${dimensionalStates[dimensionalState]} ${className}
        `}
      />
      
      {/* Ripple effect on focus */}
      {rippleEffect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-oracle-orange/0 hover:bg-oracle-orange/5 transition-colors duration-300" />
          <div className="absolute -inset-1 bg-oracle-orange/0 focus-within:bg-oracle-orange/10 transition-colors duration-500" />
        </div>
      )}
    </div>
  );
}

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rippleEffect?: boolean;
  dimensionalState?: 'stable' | 'unstable' | 'quantum';
  className?: string;
  required?: boolean;
  name?: string;
  rows?: number;
}

export function Textarea({
  placeholder,
  value,
  onChange,
  rippleEffect = true,
  dimensionalState = 'stable',
  className = '',
  required = false,
  name,
  rows = 4
}: TextareaProps) {
  // Dimensional state effects
  const dimensionalStates = {
    'stable': '',
    'unstable': 'animate-quantum-fluctuation',
    'quantum': 'text-glitch'
  };
  
  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        rows={rows}
        className={`
          w-full bg-oracle-black border border-oracle-orange/30 text-oracle-white px-4 py-3 rounded-md
          focus:outline-none focus:border-oracle-orange focus:ring-1 focus:ring-oracle-orange
          transition-all duration-300 ${dimensionalStates[dimensionalState]} ${className}
        `}
      />
      
      {/* Ripple effect on focus */}
      {rippleEffect && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-md">
          <div className="absolute inset-0 bg-oracle-orange/0 hover:bg-oracle-orange/5 transition-colors duration-300" />
          <div className="absolute -inset-1 bg-oracle-orange/0 focus-within:bg-oracle-orange/10 transition-colors duration-500" />
        </div>
      )}
    </div>
  );
} 