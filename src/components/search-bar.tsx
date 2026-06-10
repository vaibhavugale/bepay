import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
    theme?: "light" | "dark";
    icon?: React.ReactNode;
}

export const SearchBar = ({ containerClassName = "", className = "", theme = "dark", icon, ...props }: SearchBarProps) => {
    const isLight = theme === "light";
    const containerClasses = isLight 
        ? "border-gray-200 text-gray-700 bg-white rounded-lg" 
        : "border-white/50 text-white rounded-full";
    
    const inputClasses = isLight
        ? "text-gray-700 placeholder-gray-400"
        : "text-white placeholder-white";

    return (
        <div className={`flex items-center border px-4 py-2.5 gap-2 ${containerClasses} ${containerClassName}`}>
            {icon && <div className="text-current flex-shrink-0">{icon}</div>}
            <input
                type="text"
                className={`bg-transparent outline-none w-full text-[15px] tracking-wide ${inputClasses} ${className}`}
                {...props}
            />
        </div>
    );
};
