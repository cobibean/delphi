import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  tooltip?: string;
  maxLength?: number;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ 
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  tooltip,
  maxLength,
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
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`w-full bg-sinister-black border ${error ? 'border-red-500' : 'border-oracle-orange/20'} focus:border-cosmic-combustion rounded-lg px-4 py-3 text-oracle-white placeholder-oracle-white/40 focus:outline-none focus:ring-1 focus:ring-cosmic-combustion transition-colors`}
          rows={4}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`w-full bg-sinister-black border ${error ? 'border-red-500' : 'border-oracle-orange/20'} focus:border-cosmic-combustion rounded-lg px-4 py-3 text-oracle-white placeholder-oracle-white/40 focus:outline-none focus:ring-1 focus:ring-cosmic-combustion transition-colors`}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
      {maxLength && (
        <div className="flex justify-end mt-1">
          <span className="text-xs text-oracle-white/40">
            {value.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default FormField; 