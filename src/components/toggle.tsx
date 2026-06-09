import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Toggle = ({ checked, onChange, className = "" }: ToggleProps) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[28px] w-[50px] items-center rounded-lg transition-colors focus:outline-none ${
        checked ? 'bg-blue-500' : 'bg-[#999999]'
      } ${className}`}
    >
      <span
        className={`inline-block h-[22px] w-[22px] transform rounded-md bg-[#e5e5e5] shadow-sm transition-transform ${
          checked ? 'translate-x-[24px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  );
};
