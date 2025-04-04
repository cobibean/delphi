import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

interface NumberInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  required?: boolean;
  tooltip?: string;
  error?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  value,
  onChange,
  min,
  max,
  step,
  required = false,
  tooltip,
  error,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <label htmlFor={name} className="block text-oracle-white font-medium">
          {label} {required && <span className="text-cosmic-combustion">*</span>}
        </label>
        {tooltip && (
          <div className="relative ml-2">
            <FiInfo 
              className="text-oracle-orange/60 hover:text-oracle-orange cursor-pointer transition-colors"
              size={16}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <div className="absolute z-10 w-60 p-2 mt-2 bg-ancient-wisdom border border-oracle-orange/20 rounded-md shadow-lg -left-28 top-6">
                <p className="text-xs text-oracle-white/90">{tooltip}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center">
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={`flex-grow h-2 bg-sinister-black rounded-lg appearance-none cursor-pointer accent-cosmic-combustion focus:outline-none focus:ring-1 focus:ring-cosmic-combustion ${error ? 'border-red-500' : ''}`}
        />
        <div className="flex items-center justify-center ml-4 w-16 h-10 bg-sinister-black border border-oracle-orange/20 rounded-lg">
          <span className="text-oracle-white">{value}%</span>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default NumberInput; 