import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, containerClassName = "", className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <label className="text-[13px] font-semibold text-gray-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[#f6f6f6] border-none outline-none rounded-lg px-4 py-3 text-[15px] text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-gray-200 transition-shadow ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
