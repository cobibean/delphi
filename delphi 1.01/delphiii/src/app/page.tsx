"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaShoppingCart, FaUsers } from 'react-icons/fa';
import Header from './components/Header';
import Footer from './components/Footer';
import NFTCard from './components/NFTCard';
import Button from './components/Button';
import Stats from './components/Stats';
import Modal from './components/Modal';

// Mock data for NFTs
const mockNFTs = [
  {
    id: '1',
    title: 'Cosmic Overload #001',
    image: 'https://picsum.photos/seed/nft1/400/400',
    price: 0.5,
    creator: {
      name: 'Dimension Shifter',
      avatar: 'https://picsum.photos/seed/creator1/100/100'
    }
  },
  {
    id: '2',
    title: 'Quantum Entanglement',
    image: 'https://picsum.photos/seed/nft2/400/400',
    price: 1.2,
    creator: {
      name: 'Reality Bender',
      avatar: 'https://picsum.photos/seed/creator2/100/100'
    }
  },
  {
    id: '3',
    title: 'Neural Nexus',
    image: 'https://picsum.photos/seed/nft3/400/400',
    price: 0.8,
    creator: {
      name: 'Void Walker',
      avatar: 'https://picsum.photos/seed/creator3/100/100'
    }
  },
  {
    id: '4',
    title: 'Dimensional Rift',
    image: 'https://picsum.photos/seed/nft4/400/400',
    price: 2.5,
    creator: {
      name: 'Cosmic Entity',
      avatar: 'https://picsum.photos/seed/creator4/100/100'
    }
  }
];

// Mock data for stats
const mockStats = [
  {
    icon: <FaShoppingCart />,
    value: 1337,
    label: 'Active Listings',
    trend: [20, 35, 25, 45, 30, 55, 40, 60, 35, 70, 50, 80]
  },
  {
    icon: <FaFire />,
    value: 42069,
    label: 'Total Volume',
    trend: [30, 40, 35, 60, 40, 70, 50, 80, 60, 90, 70, 100]
  },
  {
    icon: <FaUsers />,
    value: 8008,
    label: 'Unique Collectors',
    trend: [10, 25, 15, 35, 20, 45, 30, 55, 40, 65, 50, 75]
  }
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <main className="min-h-screen bg-oracle-black">
      <Header />
      
      {/* Hero Section with Dimensional Effects */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-oracle-orange rounded-full opacity-0"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 2 + 0.5
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                y: [0, -100],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Hero content with parallax effect */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ 
              transform: `translateY(${scrollY * 0.3}px)` 
            }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-impact text-oracle-orange mb-6 animate-reality-distortion"
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,95,31,0.5)',
                  '0 0 20px rgba(255,95,31,0.8)',
                  '0 0 10px rgba(255,95,31,0.5)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              DELPHI
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-oracle-white mb-8 max-w-3xl mx-auto"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              The Multidimensional Nexus - An Interdimensional Portal for Artists, Weirdos, and Degens Across the Omniverse
            </motion.p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                variant="hyper-primary" 
                energyField="cosmic-flare"
                dimensionRift={true}
                onClick={() => setIsModalOpen(true)}
              >
                Enter the Nexus
              </Button>
              
              <Button 
                variant="hyper-secondary"
                realityBend={true}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Dimensional overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-oracle-black-void/0 via-oracle-black-void/0 to-oracle-black pointer-events-none"
          style={{ 
            opacity: 0.5 + (scrollY * 0.001)
          }}
        />
      </section>
      
      {/* Featured NFTs Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-impact text-oracle-orange mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            FEATURED ARTIFACTS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {mockNFTs.map((nft, index) => (
              <NFTCard 
                key={nft.id} 
                nft={nft} 
                dimensionEffect={index % 3 === 0 ? 'reality-warp' : index % 3 === 1 ? 'quantum-shift' : 'time-echo'}
                energyField={index % 3 === 0 ? 'orange-quantum' : index % 3 === 1 ? 'turquoise-pulse' : 'purple-void'}
                glitchIntensity={index * 0.2}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="hyper-secondary">
              View All Artifacts
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-oracle-black to-oracle-black-matter relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-impact text-oracle-turquoise mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            INTERDIMENSIONAL METRICS
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockStats.map((stat, index) => (
              <Stats 
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                trend={stat.trend}
                dimensionalDepth={(index + 2) as 1 | 2 | 3 | 4 | 5}
                energyOutput={0.3 + (index * 0.2)}
              />
            ))}
          </div>
        </div>
        
        {/* Energy field effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-oracle-orange/30" />
          <div className="absolute top-0 left-0 right-0 h-px bg-oracle-orange/30" />
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-4xl font-impact text-oracle-purple mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              CREATE YOUR OWN REALITY
            </motion.h2>
            
            <motion.p 
              className="text-xl text-oracle-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Join the interdimensional marketplace and start trading artifacts from across the multiverse.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button 
                variant="hyper-primary" 
                energyField="cosmic-flare"
                dimensionRift={true}
              >
                Connect Wallet
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Background effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-oracle-purple/5 to-oracle-black-void" />
          
          {/* Animated circles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-oracle-purple/20"
              style={{ 
                width: `${200 + i * 100}px`, 
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                borderWidth: ['1px', '2px', '1px']
              }}
              transition={{
                duration: 8,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </section>
      
      <Footer />
      
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to the Multiverse"
        variant="quantum-portal"
        dimensionalDepth={3}
        feature="Beta"
        glitchEffect={true}
      >
        <p className="text-oracle-white mb-6">
          You're about to enter the interdimensional marketplace where reality bends and creativity transcends conventional boundaries.
        </p>
        
        <p className="text-oracle-white mb-6">
          Connect your wallet to start your journey across the omniverse.
        </p>
        
        <div className="flex justify-center">
          <Button variant="hyper-primary" onClick={() => setIsModalOpen(false)}>
            I'm Ready
          </Button>
        </div>
      </Modal>
    </main>
  );
}
