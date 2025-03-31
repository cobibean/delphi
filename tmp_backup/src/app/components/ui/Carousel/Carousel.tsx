"use client";

import React, { useState, useEffect, ReactNode } from "react";

export interface CarouselProps {
  /** Array of React nodes to display as slides */
  children: ReactNode[];
  
  /** Optional title for the carousel */
  title?: string;
  
  /** Callback function when slide changes */
  onSlideChange?: (index: number) => void;
  
  /** Configuration settings */
  settings?: {
    /** Enable auto-rotation of slides */
    autoplay?: boolean;
    
    /** Time between slide transitions in milliseconds */
    autoplaySpeed?: number;
    
    /** Whether to loop back to the first slide after the last */
    loop?: boolean;
    
    /** Number of items to show at once (for future multi-item carousels) */
    itemsToShow?: number;
    
    /** Duration of transition animation in milliseconds */
    transitionDuration?: number;
    
    /** Whether to pause autoplay on hover */
    pauseOnHover?: boolean;
    
    /** Whether to show navigation arrows */
    showArrows?: boolean;
    
    /** Whether to show indicator dots */
    showIndicators?: boolean;
    
    /** Whether to enable swipe on touch devices */
    enableSwipe?: boolean;
  };
  
  /** Classes to apply to container */
  className?: string;
  
  /** Custom styles for various carousel elements */
  styles?: {
    /** Container styles */
    container?: React.CSSProperties;
    
    /** Slide styles */
    slide?: React.CSSProperties;
    
    /** Navigation arrow styles */
    arrows?: React.CSSProperties;
    
    /** Indicator dot styles */
    indicators?: React.CSSProperties;
  };
  
  /** Custom components */
  components?: {
    /** Custom previous arrow component */
    PrevArrow?: React.ComponentType<{ onClick: () => void }>;
    
    /** Custom next arrow component */
    NextArrow?: React.ComponentType<{ onClick: () => void }>;
    
    /** Custom indicator component */
    Indicator?: React.ComponentType<{ active: boolean; onClick: () => void; index: number }>;
  };
}

export default function Carousel({ 
  children, 
  title, 
  onSlideChange,
  className = "",
  styles = {},
  components = {},
  settings = {
    autoplay: false,
    autoplaySpeed: 5000,
    loop: true,
    itemsToShow: 1,
    transitionDuration: 500,
    pauseOnHover: true,
    showArrows: true,
    showIndicators: true,
    enableSwipe: true
  } 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  // Handle autoplay
  useEffect(() => {
    if (settings.autoplay && !(settings.pauseOnHover && isHovered)) {
      const interval = setInterval(() => {
        goToNext();
      }, settings.autoplaySpeed);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, settings.autoplay, isHovered, settings.pauseOnHover]);

  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!settings.enableSwipe) return;
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!settings.enableSwipe || touchStart === null) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!settings.enableSwipe || touchStart === null || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (settings.loop ? children.length - 1 : 0) : prevIndex - 1
    );
  };

  const goToNext = () => {
    const newIndex = currentIndex === children.length - 1 
      ? (settings.loop ? 0 : children.length - 1) 
      : currentIndex + 1;
      
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  };

  // Custom components or default ones
  const PrevArrow = components.PrevArrow || DefaultPrevArrow;
  const NextArrow = components.NextArrow || DefaultNextArrow;
  const Indicator = components.Indicator || DefaultIndicator;

  return (
    <div 
      className={`relative w-full ${className}`}
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-cosmic-grey-100">{title}</h2>
      )}
      
      <div 
        className="relative overflow-hidden rounded-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transitionDuration: `${settings.transitionDuration}ms`,
            ...styles.slide
          }}
        >
          {children.map((child, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
        
        {/* Navigation buttons */}
        {settings.showArrows && children.length > 1 && (
          <>
            <div className="absolute left-4 top-1/2 -translate-y-1/2" style={styles.arrows}>
              <PrevArrow onClick={goToPrevious} />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2" style={styles.arrows}>
              <NextArrow onClick={goToNext} />
            </div>
          </>
        )}
      </div>
      
      {/* Pagination indicator */}
      {settings.showIndicators && children.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4" style={styles.indicators}>
          {children.map((_, index) => (
            <Indicator 
              key={index}
              index={index}
              active={index === currentIndex}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Default arrow and indicator components
const DefaultPrevArrow = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-oracle-black/70 text-white p-2 rounded-full hover:bg-oracle-orange hover:text-oracle-black transition-colors"
    aria-label="Previous slide"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const DefaultNextArrow = ({ onClick }: { onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-oracle-black/70 text-white p-2 rounded-full hover:bg-oracle-orange hover:text-oracle-black transition-colors"
    aria-label="Next slide"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const DefaultIndicator = ({ active, onClick }: { active: boolean; onClick: () => void; index: number }) => (
  <button
    onClick={onClick}
    className={`w-3 h-3 rounded-full transition-colors ${
      active ? 'bg-oracle-orange' : 'bg-oracle-white/30 hover:bg-oracle-white/50'
    }`}
    aria-label={active ? "Current slide" : "Go to slide"}
  ></button>
); 