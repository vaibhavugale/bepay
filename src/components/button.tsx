import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const Button = ({ children, icon, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer flex items-center justify-center gap-2 bg-white text-black font-semibold text-[17px] rounded-xl px-6 py-2.5 transition-colors hover:bg-gray-100 ${className}`}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
