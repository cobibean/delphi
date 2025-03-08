"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NFTCardProps {
  nft: {
    id: string;
    title: string;
    image: string;
    price: number;
    creator: {
      name: string;
      avatar: string;
    };
  };
  dimensionEffect?: 'reality-warp' | 'quantum-shift' | 'time-echo';
  energyField?: 'orange-quantum' | 'turquoise-pulse' | 'purple-void';
  glitchIntensity?: number;
}

export default function NFTCard({ 
  nft, 
  dimensionEffect = 'reality-warp',
  energyField = 'orange-quantum',
  glitchIntensity = 0.5
}: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handle 3D rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    setIsHovered(false);
  };
  
  const dimensionEffects = {
    'reality-warp': 'animate-reality-distortion',
    'quantum-shift': 'animate-quantum-fluctuation',
    'time-echo': 'dimensional-echo',
  };
  
  const energyFields = {
    'orange-quantum': 'before:absolute before:inset-0 before:border-2 before:border-oracle-orange before:rounded-lg before:animate-energy-field before:z-[-1]',
    'turquoise-pulse': 'before:absolute before:inset-0 before:border-2 before:border-oracle-turquoise before:rounded-lg before:animate-energy-field before:z-[-1]',
    'purple-void': 'before:absolute before:inset-0 before:border-2 before:border-oracle-purple before:rounded-lg before:animate-energy-field before:z-[-1]',
  };
  
  // Random glitch effect
  const shouldGlitch = Math.random() < glitchIntensity / 10;
  
  return (
    <motion.div
      ref={cardRef}
      className={`hypercard relative w-[300px] h-[360px] ${dimensionEffects[dimensionEffect]} ${energyFields[energyField]}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <Link href={`/nft/${nft.id}`}>
        <div className="relative w-full h-[200px] overflow-hidden rounded-t-lg">
          <Image
            src={nft.image}
            alt={nft.title}
            fill
            className={`object-cover transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'} ${shouldGlitch ? 'animate-quantum-fluctuation' : ''}`}
            style={{ 
              filter: isHovered ? 'hue-rotate(15deg) contrast(1.1)' : 'none',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-oracle-black to-transparent opacity-50" />
        </div>
        
        <div className="p-4 relative z-10">
          <h3 className={`text-xl font-impact text-oracle-white mb-2 ${shouldGlitch ? 'text-glitch' : ''}`}>
            {nft.title}
          </h3>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={nft.creator.avatar}
                  alt={nft.creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-oracle-white/70 text-sm">{nft.creator.name}</span>
            </div>
            
            <div className="text-oracle-orange font-bold animate-cosmic-pulsation">
              {nft.price} METIS
            </div>
          </div>
          
          <button className="cosmic-button w-full">
            View Details
          </button>
        </div>
      </Link>
      
      {/* Energy field effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 rounded-lg opacity-10 mix-blend-overlay bg-gradient-to-br from-oracle-orange/20 via-oracle-turquoise/20 to-oracle-purple/20" />
      </div>
      
      {/* Dimensional echo */}
      <div className="absolute inset-0 -z-10 transform translate-x-2 translate-y-2 rounded-lg bg-oracle-orange/10 blur-sm" />
    </motion.div>
  );
} 