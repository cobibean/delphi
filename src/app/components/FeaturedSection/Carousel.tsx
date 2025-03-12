"use client";

import React from "react";

interface CarouselProps {
  children: React.ReactNode[];
  title?: string;
  onSlideChange?: (index: number) => void;
  settings?: {
    autoplay?: boolean;
    loop?: boolean;
    itemsToShow?: number; // Currently unused but can be future-proofed for custom item counts
  };
}

export default function Carousel({ children, title, onSlideChange, settings }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    const newIndex = currentIndex === children.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  if (!children || children.length === 0) {
    return <p className="text-center text-gray-500">No items to display</p>;
  }

  return (
    <div className="carousel-container w-full">
      {title && <h2 className="carousel-title text-xl font-semibold mb-4">{title}</h2>}
      <div className="carousel flex items-center justify-center space-x-4 relative h-[600px] overflow-hidden">
        <button
          onClick={goToPrevious}
          className="carousel-button z-10 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors"
          aria-label="Previous"
        >
          ◀
        </button>
        <div className="carousel-content relative w-full h-full">
          {children.map((child, index) => (
            <div
              key={index}
              className={`carousel-slide absolute inset-0 transition-transform duration-500 ${
                index === currentIndex 
                  ? "translate-x-0 z-10" 
                  : index < currentIndex 
                    ? "-translate-x-full" 
                    : "translate-x-full"
              }`}
              style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
            >
              <div className="flex items-center justify-center h-full">
                {child}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={goToNext}
          className="carousel-button z-10 bg-white/10 rounded-full p-3 hover:bg-white/20 transition-colors"
          aria-label="Next"
        >
          ▶
        </button>
      </div>
    </div>
  );
}