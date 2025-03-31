"use client";

import { Button } from "@/app/components/ui/Button";
import { Minus, Plus } from "lucide-react";

// Since there's no Input component, let's use a basic input element
interface IQuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ 
  quantity, 
  setQuantity,
  min = 1,
  max = 100
}: IQuantitySelectorProps) {
  const decreaseQuantity = () => {
    setQuantity(Math.max(min, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(Math.min(max, quantity + 1));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!Number.isNaN(value)) {
      setQuantity(Math.min(max, Math.max(min, value)));
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        onClick={decreaseQuantity}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="rounded-r-none border-r-0 bg-oracle-black/60 hover:bg-oracle-black/80"
      >
        <Minus className="h-4 w-4 text-oracle-white" />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="w-28 text-center rounded-none border-oracle-orange/30 pl-6 py-0 h-10
                  bg-white text-sinister-black font-anton focus:outline-none focus:border-oracle-orange"
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={increaseQuantity}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="rounded-l-none border-l-0 bg-oracle-black/60 hover:bg-oracle-black/80"
      >
        <Plus className="h-4 w-4 text-oracle-white" />
      </Button>
    </div>
  );
} 