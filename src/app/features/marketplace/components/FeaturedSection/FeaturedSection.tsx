"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/feedback/Toast/useToast";

export default function FeaturedSection() {
  const [glitchText, setGlitchText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  // Trigger glitch text effect randomly
  useEffect(() => {
    setIsMounted(true);
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 500);
      }
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);
  
  const handleExplore = () => {
    try {
      router.push("/marketplace/explore");
      toast.custom({
        title: "Entering the Unknown",
        description: "Prepare to discover unique digital artifacts in the marketplace.",
        variant: "success"
      });
    } catch (error) {
      console.error("Navigation error:", error);
      toast.custom({
        title: "Navigation Failed",
        description: "Failed to navigate to the explore page. Please try again.",
        variant: "error"
      });
    }
  };
  
  const handleConsult = () => {
    toast.custom({
      title: "Oracle Consultation",
      description: "The Oracle is preparing to reveal its wisdom. This feature will be available soon.",
      variant: "info",
      action: {
        label: "Learn More",
        onClick: () => window.open("/about", "_blank")
      }
    });
  };
  
  // Simple placeholder during SSR
  if (!isMounted) {
    return <div className="h-screen bg-sinister-black"></div>;
  }
  
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className={`text-5xl md:text-6xl lg:text-7xl font-heading uppercase mb-8 ${
              glitchText ? 'glitch-text' : 'text-gradient-oracle'
            }`}
            data-text="DARK DEGEN ORACLE"
          >
            DARK DEGEN ORACLE
          </h1>
          
          <p className="text-xl text-cosmic-grey-300 mb-10 max-w-3xl mx-auto">
            A mysterious marketplace where digital fortunes are foretold. The Oracle reveals authentic digital artistry from beyond the veil.
          </p>
          
          <div className="flex justify-center space-x-6">
            <button 
              className="btn-primary-glow text-lg px-8 py-3"
              onClick={handleExplore}
            >
              Explore the Unknown
            </button>
            <button 
              className="btn-secondary text-lg px-8 py-3"
              onClick={handleConsult}
            >
              Consult the Oracle
            </button>
          </div>
        </div>
      </div>
      
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-oracle-orange blur-[150px] rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-turquoise-400 blur-[150px] -rotate-12"></div>
      </div>
    </section>
  );
} 