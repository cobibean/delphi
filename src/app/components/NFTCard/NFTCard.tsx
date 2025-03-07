"use client";

import React, { useState, useEffect, useRef } from "react";
import { IListingWithNFT } from "@/app/interfaces/interfaces";
import Link from "next/link";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

interface NFTCardProps {
  listing: IListingWithNFT;
  className?: string;
}

// Utility function to get a random number in a range
const getRandomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Random glitch text effect
const GlitchText = ({ text }: { text: string }) => (
  <span className="glitch-text relative inline-block" data-text={text}>
    <span className="relative z-10">{text}</span>
  </span>
);

export default function NFTCard({ listing, className }: NFTCardProps) {
  const { metadata, collectionName, tokenId, pricePerToken, listingId } = listing;
  
  // Dimensional state hooks
  const [dimensionalState, setDimensionalState] = useState<'stable' | 'unstable' | 'quantum' | 'rift'>('stable');
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [rotationValues, setRotationValues] = useState({ x: 0, y: 0 });
  const [hasQuantumFluctuated, setHasQuantumFluctuated] = useState(false);
  
  // Animation controls
  const cardControls = useAnimation();
  const particleControls = useAnimation();
  const energyFieldControls = useAnimation();
  
  // Card element ref for 3D effects
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Random price fluctuation for effect
  const [displayPrice, setDisplayPrice] = useState(pricePerToken);
  
  // Set mounted state on client and initialize effects
  useEffect(() => {
    setIsMounted(true);
    
    // Random dimensional state changes
    const dimensionInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // Sometimes destabilize the card
        const newState = Math.random() > 0.5 ? 'unstable' : 'quantum';
        setDimensionalState(newState);
        
        // Reset after a brief moment
        setTimeout(() => {
          setDimensionalState('stable');
        }, getRandomInRange(300, 800));
      }
    }, 5000);
    
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), getRandomInRange(200, 500));
      }
    }, 4000);
    
    // Random price fluctuations for quantum uncertainty
    const priceInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const variation = getRandomInRange(-0.08, 0.08);
        const newPrice = parseFloat(pricePerToken) * (1 + variation);
        setDisplayPrice(newPrice.toFixed(2));
        
        // Reset after a moment
        setTimeout(() => {
          setDisplayPrice(pricePerToken);
        }, getRandomInRange(700, 1200));
      }
    }, 7000);
    
    return () => {
      clearInterval(dimensionInterval);
      clearInterval(glitchInterval);
      clearInterval(priceInterval);
    };
  }, [pricePerToken]);
  
  // Update animations when hover state changes
  useEffect(() => {
    if (isHovering) {
      // Start energy build up
      setEnergyLevel(prev => Math.min(prev + 1, 5));
      
      // Start particle effects
      particleControls.start({
        opacity: [0.2, 0.5, 0.7, 0.5, 0.2],
        scale: [1, 1.2, 1.5, 1.2, 1],
        transition: { duration: 3, repeat: Infinity, repeatType: "loop" }
      });
      
      // Start energy field animation
      energyFieldControls.start({
        opacity: 1,
        scale: [1, 1.02, 0.98, 1.01, 1],
        boxShadow: [
          '0 0 5px rgba(255, 95, 31, 0.3), 0 0 15px rgba(255, 95, 31, 0.2)',
          '0 0 10px rgba(0, 209, 193, 0.3), 0 0 20px rgba(0, 209, 193, 0.2)', 
          '0 0 15px rgba(107, 70, 193, 0.3), 0 0 25px rgba(107, 70, 193, 0.2)',
          '0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)',
          '0 0 5px rgba(255, 95, 31, 0.3), 0 0 15px rgba(255, 95, 31, 0.2)'
        ],
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "loop"
        }
      });
      
      // Occasional quantum fluctuation
      if (!hasQuantumFluctuated && Math.random() > 0.7) {
        cardControls.start({
          x: [0, 5, -5, 3, -3, 0],
          y: [0, -3, 3, -2, 2, 0],
          filter: [
            'brightness(1) contrast(1) hue-rotate(0deg)',
            'brightness(1.2) contrast(1.1) hue-rotate(5deg)',
            'brightness(0.9) contrast(1.2) hue-rotate(-5deg)',
            'brightness(1.1) contrast(0.9) hue-rotate(2deg)',
            'brightness(1) contrast(1) hue-rotate(0deg)'
          ],
          transition: { duration: 0.5 }
        });
        setHasQuantumFluctuated(true);
        
        // Reset after some time
        setTimeout(() => {
          setHasQuantumFluctuated(false);
        }, 5000);
      }
    } else {
      // Reset energy when not hovering
      setEnergyLevel(prev => Math.max(prev - 1, 0));
      
      // Pause particle animations
      particleControls.stop();
      
      // Reduce energy field
      energyFieldControls.start({
        opacity: 0.3,
        boxShadow: '0 0 5px rgba(255, 95, 31, 0.1), 0 0 10px rgba(255, 95, 31, 0.05)',
        transition: { duration: 1 }
      });
    }
  }, [isHovering, energyFieldControls, particleControls, cardControls, hasQuantumFluctuated]);
  
  // Handle mouse move for 3D rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const cardRect = cardRef.current.getBoundingClientRect();
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;
    
    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - cardCenterX) / (cardRect.width / 2)) * 15; // -15 to +15 degrees
    const rotateX = ((e.clientY - cardCenterY) / (cardRect.height / 2)) * -15; // +15 to -15 degrees (inverted)
    
    setRotationValues({ x: rotateX, y: rotateY });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotationValues({ x: 0, y: 0 });
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className={`relative ${className} h-80 bg-oracle-black/60`}></div>;
  }
  
  // Convert energy level to style classes
  const energyFieldClass = `energy-field-${
    energyLevel <= 1 ? 'low' : 
    energyLevel <= 3 ? 'medium' : 
    'high'
  }`;
  
  // Get dimensional state classes
  const dimensionalStateClass = 
    dimensionalState === 'stable' ? 'dimension-1' :
    dimensionalState === 'unstable' ? 'dimension-2' :
    dimensionalState === 'quantum' ? 'dimension-3' :
    'dimension-4';

  return (
    <div 
      className={`relative group dimension-card ${className} ${dimensionalStateClass}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={cardRef}
    >
      <Link href={`/nft/${listingId}`} className="block relative z-20 overflow-visible">
        <motion.div 
          className={`hyperdimensional-card bg-event-horizon rounded-xl overflow-hidden
            transition-all duration-500 border-2 border-oracle-orange/30
            ${glitchEffect ? 'animate-quantum-fluctuation' : ''}
            ${dimensionalState === 'unstable' ? 'reality-warp' : ''}
            ${dimensionalState === 'quantum' ? 'quantum-glitch' : ''}
            ${dimensionalState === 'rift' ? 'dimensional-rift' : ''}
          `}
          animate={cardControls}
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateX(${rotationValues.x}deg) rotateY(${rotationValues.y}deg)`,
          }}
        >
          {/* Energy field effect */}
          <motion.div 
            className="absolute -inset-[2px] rounded-xl z-10 pointer-events-none"
            animate={energyFieldControls}
            initial={{ opacity: 0 }}
            style={{ transformStyle: "preserve-3d" }}
          />
          
          {/* Image Container with Reality Distortion */}
          <div className="card-image relative overflow-hidden" style={{ transformStyle: "preserve-3d", transform: `translateZ(20px)` }}>
            {/* Reality breach overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-oracle-black/60 to-transparent z-10 transition-opacity duration-300"></div>
            
            {/* Image with distortion effects */}
            <motion.img 
              src={metadata?.image} 
              alt={metadata?.name} 
              className={`w-full aspect-square object-cover will-change-transform`}
              animate={{
                filter: isHovering ? [
                  'hue-rotate(0deg) brightness(1) contrast(1)', 
                  'hue-rotate(5deg) brightness(1.1) contrast(1.05)',
                  'hue-rotate(-5deg) brightness(1.2) contrast(1.1)',
                  'hue-rotate(0deg) brightness(1) contrast(1)'
                ] : 'none',
                transition: { 
                  duration: 5, 
                  repeat: isHovering ? Infinity : 0,
                  repeatType: "reverse" 
                }
              }}
            />
            
            {/* Quantum distortion overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-oracle-turquoise/5 to-oracle-purple/5 mix-blend-overlay"
              animate={isHovering ? {
                opacity: [0, 0.2, 0, 0.3, 0],
                transition: { duration: 4, repeat: Infinity }
              } : { opacity: 0 }}
            />
            
            {/* Token ID Badge with Energy */}
            <div className="absolute top-3 right-3 z-20 flex items-center space-x-1">
              <motion.div 
                className="px-2 py-1 text-xs font-heading bg-oracle-black/70 border border-oracle-orange/50 text-oracle-orange"
                animate={isHovering ? {
                  borderColor: [
                    'rgba(255, 95, 31, 0.5)',
                    'rgba(0, 209, 193, 0.5)',
                    'rgba(255, 95, 31, 0.5)'
                  ],
                  transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                } : {}}
              >
                {dimensionalState === 'quantum' ? (
                  <GlitchText text={`#${tokenId}`} />
                ) : (
                  `#${tokenId}`
                )}
              </motion.div>
            </div>
            
            {/* Collection Label with Dimensional Echo */}
            <motion.div 
              className="absolute bottom-3 left-3 z-20 text-xs font-heading tracking-wider bg-oracle-black/70 px-2 py-1 border-l border-b"
              animate={isHovering ? {
                borderColor: [
                  'rgba(0, 209, 193, 0.4)',
                  'rgba(107, 70, 193, 0.4)',
                  'rgba(0, 209, 193, 0.4)'
                ],
                transition: { duration: 3, repeat: Infinity }
              } : {}}
            >
              <span className="text-oracle-white">
                {collectionName}
              </span>
              
              {/* Echo effect for collection name */}
              {isHovering && (
                <motion.span 
                  className="absolute left-0 top-0 right-0 bottom-0 flex items-center justify-center text-oracle-turquoise/30 overflow-hidden"
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [0, 3, 0],
                    transition: { 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "loop"
                    }
                  }}
                >
                  {collectionName}
                </motion.span>
              )}
            </motion.div>
          </div>
          
          {/* NFT Details with Parallax Effect */}
          <div className="p-4 relative" style={{ transformStyle: "preserve-3d", transform: `translateZ(10px)` }}>
            {/* NFT Title with Reality Distortion */}
            <motion.h3 
              className="font-heading text-xl text-oracle-orange mb-2 truncate uppercase will-change-transform"
              animate={isHovering ? {
                textShadow: [
                  '0 0 0px rgba(255,95,31,0)',
                  '0 0 2px rgba(255,95,31,0.5)',
                  '0 0 0px rgba(255,95,31,0)'
                ],
                transition: { duration: 2, repeat: Infinity }
              } : {}}
            >
              {dimensionalState === 'quantum' ? (
                <GlitchText text={metadata?.name || `PROPHECY #${tokenId}`} />
              ) : (
                metadata?.name || `PROPHECY #${tokenId}`
              )}
            </motion.h3>
            
            {/* Price and View Button */}
            <div className="flex justify-between items-center mt-4" style={{ transformStyle: "preserve-3d", transform: `translateZ(5px)` }}>
              <div className="flex flex-col">
                <span className="text-oracle-white/70 text-xs font-accent">price:</span>
                <motion.span 
                  className="text-dimensional-gold font-bold"
                  animate={isHovering ? {
                    color: [
                      'rgba(255, 215, 0, 1)',
                      'rgba(255, 196, 0, 1)',
                      'rgba(255, 234, 128, 1)',
                      'rgba(255, 215, 0, 1)'
                    ],
                    textShadow: [
                      '0 0 0px rgba(255,215,0,0)',
                      '0 0 3px rgba(255,215,0,0.5)',
                      '0 0 0px rgba(255,215,0,0)'
                    ],
                    transition: { duration: 3, repeat: Infinity }
                  } : {}}
                >
                  {displayPrice} <span className="text-sm">METIS</span>
                </motion.span>
              </div>
              
              <motion.button 
                className="bg-cosmic-combustion text-oracle-white py-2 px-4 text-sm font-heading rounded-md overflow-hidden relative"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.95,
                  transition: { duration: 0.1 }
                }}
              >
                {/* Button energy effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-oracle-orange-hot via-oracle-orange to-oracle-orange-solar"
                  animate={{
                    x: ['-100%', '100%'],
                    transition: { 
                      duration: 2, 
                      repeat: Infinity,
                      repeatType: "loop" 
                    }
                  }}
                  style={{ 
                    opacity: 0.3,
                    mixBlendMode: 'overlay'
                  }}
                />
                
                <span className="relative z-10">
                  SEAL THE DEAL
                </span>
              </motion.button>
            </div>
          </div>
          
          {/* Glitch particles effect */}
          <AnimatePresence>
            {glitchEffect && (
              <>
                <motion.div 
                  className="absolute top-[20%] left-[15%] w-1 h-1 bg-oracle-error rounded-full blur-[1px]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0], x: [0, 10, 0], y: [0, -5, 0] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute bottom-[30%] right-[25%] w-1 h-1 bg-oracle-turquoise rounded-full blur-[1px]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.7, 0], scale: [0, 1, 0], x: [0, -10, 0], y: [0, 5, 0] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
                <motion.div 
                  className="absolute bottom-[70%] left-[60%] w-2 h-2 bg-oracle-purple/60 rounded-full blur-[2px]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0], x: [0, 15, 0], y: [0, 10, 0] }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                />
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>
      
      {/* Cosmic energy field around card */}
      <motion.div 
        className={`absolute -inset-1 rounded-xl transition-all duration-500 pointer-events-none ${energyFieldClass}`}
        style={{ 
          background: `
            radial-gradient(
              400px circle at ${isHovering ? '50% 50%' : '-100% -100%'}, 
              rgba(255, 95, 31, 0.15), 
              transparent 70%
            )
          `,
          opacity: isHovering ? 1 : 0,
          transformStyle: "preserve-3d",
        }}
        animate={isHovering ? {
          background: [
            'radial-gradient(400px circle at 50% 50%, rgba(255, 95, 31, 0.15), transparent 70%)',
            'radial-gradient(400px circle at 50% 50%, rgba(0, 209, 193, 0.15), transparent 70%)',
            'radial-gradient(400px circle at 50% 50%, rgba(107, 70, 193, 0.15), transparent 70%)',
            'radial-gradient(400px circle at 50% 50%, rgba(255, 95, 31, 0.15), transparent 70%)'
          ],
          transition: { duration: 4, repeat: Infinity }
        } : {}}
      />
      
      {/* Dimensional particles */}
      {isHovering && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-oracle-orange/40 blur-[1px] pointer-events-none"
            animate={particleControls}
            style={{ 
              top: '20%',
              left: '80%',
            }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-oracle-turquoise/40 blur-[0.5px] pointer-events-none"
            animate={particleControls}
            style={{ 
              top: '70%',
              left: '10%',
              animationDelay: '0.5s'
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-oracle-purple/30 blur-[1px] pointer-events-none"
            animate={particleControls}
            style={{ 
              top: '40%',
              left: '15%',
              animationDelay: '1s'
            }}
          />
          <motion.div
            className="absolute w-1 h-1 rounded-full bg-oracle-gold/50 blur-[0.5px] pointer-events-none"
            animate={particleControls}
            style={{ 
              top: '85%',
              left: '75%',
              animationDelay: '1.5s'
            }}
          />
        </>
      )}
      
      {/* Dimensional echo afterimage */}
      {isHovering && (
        <motion.div 
          className="absolute inset-0 bg-transparent border-2 border-oracle-orange/10 rounded-xl pointer-events-none"
          initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [1, 1.05, 1.1],
            x: [0, 5, 10],
            y: [0, -5, -10],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
    </div>
  );
} 