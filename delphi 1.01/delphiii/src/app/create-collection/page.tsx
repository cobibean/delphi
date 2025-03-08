"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function CreateCollection() {
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
      
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-oracle-purple rounded-full opacity-0"
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{ 
                transform: `translateY(${scrollY * 0.2}px)` 
              }}
            >
              <motion.h1 
                className="text-6xl md:text-7xl font-impact text-oracle-purple mb-6 animate-reality-distortion"
                animate={{
                  textShadow: [
                    '0 0 10px rgba(107,70,193,0.5)',
                    '0 0 20px rgba(107,70,193,0.8)',
                    '0 0 10px rgba(107,70,193,0.5)'
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                CREATE COLLECTION
              </motion.h1>
              
              <motion.div
                className="text-glitch text-2xl md:text-3xl text-oracle-white mb-8"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                COMING SOON
              </motion.div>
              
              <motion.p 
                className="text-xl text-oracle-white/80 mb-12 max-w-2xl mx-auto"
                animate={{
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Our interdimensional engineers are weaving reality to bring you a no-code NFT collection creation tool. 
                Soon you'll be able to create your own collection without writing a single line of code.
              </motion.p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  variant="hyper-secondary"
                  realityBend={true}
                  onClick={() => window.history.back()}
                >
                  Return to Nexus
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Dimensional portal effect */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {/* Concentric circles */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2 border-oracle-purple/30"
              style={{ 
                width: `${300 + i * 150}px`, 
                height: `${300 + i * 150}px`,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%'
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                rotate: {
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                },
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                opacity: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }
              }}
            />
          ))}
          
          {/* Central glow */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-oracle-purple/30 to-oracle-turquoise/30 blur-3xl"
            style={{ 
              width: '300px', 
              height: '300px',
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>
      
      <Footer />
    </main>
  );
} 