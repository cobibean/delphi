"use client";

import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { SORT_OPTIONS, SortOption } from '../services/Sorting';

interface SortingDropdownProps {
  selectedSort: SortOption;
  onChange: (option: SortOption) => void;
  className?: string;
}

export default function SortingDropdown({ 
  selectedSort, 
  onChange,
  className = ""
}: SortingDropdownProps) {
  // Find the selected config, fall back to first option if not found
  const selectedConfig = SORT_OPTIONS.find(opt => opt.option === selectedSort) || SORT_OPTIONS[0];
  
  return (
    <div className={`relative w-full sm:w-auto sm:min-w-[200px] ${className}`}>
      <Listbox value={selectedSort} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-oracle-black-void rounded-lg border border-oracle-orange/20 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-oracle-orange shadow-card-normal hover:shadow-card-hover transition-all duration-300">
            <span className="block truncate text-oracle-white">
              {selectedConfig.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-oracle-orange" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Listbox.Button>
          
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 w-full mt-1 overflow-auto bg-ancient-wisdom rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none py-1 border border-oracle-orange/30">
              {SORT_OPTIONS.map((option) => (
                <Listbox.Option
                  key={option.option}
                  value={option.option}
                  className={({ active }) =>
                    `${active ? 'text-oracle-white bg-cosmic-combustion' : 'text-oracle-white'}
                    cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-cosmic-combustion/80`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {option.label}
                      </span>
                      
                      {option.description && (
                        <span className={`${active ? 'text-oracle-white/80' : 'text-oracle-white/60'} block text-xs mt-0.5`}>
                          {option.description}
                        </span>
                      )}
                      
                      {option.icon && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-oracle-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
                          </svg>
                        </span>
                      )}
                      
                      {selected && !option.icon && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-oracle-orange">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 