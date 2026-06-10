import React from 'react';
import { FilterIcon } from './icons';

interface FiltersProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
}

export const Filters = ({ count, className = "", ...props }: FiltersProps) => {
  return (
    <button
      className={`cursor-pointer flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-gray-700 font-medium text-[15px] hover:bg-gray-50 transition-colors ${className}`}
      {...props}
    >
      <FilterIcon className="w-5 h-5 text-gray-400" />
      <span>Filters</span>
      {count !== undefined && count > 0 && (
        <span className="bg-gray-100 text-black text-xs font-bold px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};
