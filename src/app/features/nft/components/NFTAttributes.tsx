"use client";

import { INFTAttribute } from "@/interfaces/interfaces";

interface NFTAttributesProps {
  attributes: INFTAttribute[];
  className?: string;
}

export function NFTAttributes({ attributes, className = "" }: NFTAttributesProps) {
  if (!attributes || attributes.length === 0) {
    return null;
  }

  return (
    <div className={`mt-8 ${className}`}>
      <h3 className="font-heading text-xl text-sinister-orange mb-4 uppercase tracking-wider">Attributes</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {attributes.map((attr, index) => (
          <div 
            key={`${attr.trait_type}-${index}`}
            className="bg-sinister-black/60 border-l border-t border-sinister-orange/20 p-3"
          >
            <div className="text-sinister-scroll/60 text-xs uppercase font-heading">{attr.trait_type}</div>
            <div className="text-sinister-scroll font-medium mt-1">{attr.value.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 