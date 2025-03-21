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
        className="rounded-r-none"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        className="w-28 text-center rounded-none border-x-0 pl-6 py-2 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={increaseQuantity}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="rounded-l-none"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
} 