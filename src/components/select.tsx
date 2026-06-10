import React from 'react';
import { ChevronDownIcon } from './icons';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, containerClassName = "", className = "", children, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-[13px] font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full appearance-none bg-[#f6f6f6] border-none outline-none rounded-lg px-4 py-3 text-[15px] text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-gray-200 transition-shadow cursor-pointer ${className}`}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';
