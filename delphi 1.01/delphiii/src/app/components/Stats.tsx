"use client";

import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatsProps {
  icon?: ReactNode;
  value: number;
  label: string;
  trend?: number[];
  dimensionalDepth?: 1 | 2 | 3 | 4 | 5;
  energyOutput?: number;
  pulseEffect?: boolean;
  orbitalEffect?: boolean;
}

export default function Stats({
  icon,
  value,
  label,
  trend = [],
  dimensionalDepth = 2,
  energyOutput = 0.5,
  pulseEffect = true,
  orbitalEffect = true
}: StatsProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Animate count up effect
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value]);
  
  // Dimensional depth effects
  const dimensionalLayers = {
    1: 'dimension-1',
    2: 'dimension-2',
    3: 'dimension-3',
    4: 'dimension-4',
    5: 'dimension-5'
  };
  
  // Energy output effects
  const energyStyles = {
    boxShadow: `0 0 ${10 + energyOutput * 20}px ${energyOutput * 10}px rgba(255, 95, 31, ${energyOutput * 0.3})`,
    transition: 'box-shadow 0.5s ease-in-out'
  };
  
  return (
    <motion.div
      className={`
        relative p-6 rounded-lg bg-gradient-to-b from-oracle-black-matter to-oracle-black-void
        border border-oracle-orange/30 ${dimensionalLayers[dimensionalDepth]}
      `}
      style={energyOutput > 0 ? energyStyles : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon with pulse effect */}
      {icon && (
        <motion.div 
          className="text-oracle-orange text-3xl mb-4"
          animate={pulseEffect ? {
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1]
          } : {}}
          transition={pulseEffect ? {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        >
          {icon}
        </motion.div>
      )}
      
      {/* Value with count up effect */}
      <motion.div 
        className="text-4xl font-impact text-oracle-white mb-2"
        animate={pulseEffect ? {
          scale: [1, 1.03, 1],
          color: ['#F8F5F0', '#FFD700', '#F8F5F0']
        } : {}}
        transition={pulseEffect ? {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      >
        {displayValue.toLocaleString()}
      </motion.div>
      
      {/* Label with orbital effect */}
      <motion.div 
        className="text-oracle-white/70 mb-4"
        animate={orbitalEffect ? {
          x: [0, 2, 0, -2, 0],
          y: [0, -1, 0, 1, 0]
        } : {}}
        transition={orbitalEffect ? {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
      >
        {label}
      </motion.div>
      
      {/* Trend graph with fluid animation */}
      {trend.length > 0 && (
        <div className="h-16 w-full relative mt-4">
          <div className="absolute inset-0 flex items-end">
            {trend.map((point, index) => {
              const height = `${Math.max(5, Math.min(100, point))}%`;
              
              return (
                <motion.div
                  key={index}
                  className="flex-1 mx-0.5 bg-gradient-to-t from-oracle-orange to-oracle-orange-hot rounded-t"
                  style={{ height: '0%' }}
                  animate={{ height }}
                  transition={{ 
                    duration: 1,
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </div>
          
          {/* Fluid overlay effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-oracle-turquoise/30 to-transparent"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      )}
      
      {/* Energy particles */}
      {energyOutput > 0 && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: Math.floor(energyOutput * 10) }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-oracle-orange rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%',
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
} 