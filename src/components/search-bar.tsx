import React from 'react';

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
    containerClassName?: string;
}

export const SearchBar = ({ containerClassName = "", className = "", ...props }: SearchBarProps) => {
    return (
        <div className={`flex items-center border border-white/50 rounded-full px-5 py-2.5 ${containerClassName}`}>
            <input
                type="text"
                className={`bg-transparent outline-none text-white placeholder-white w-full text-[15px]  tracking-wide ${className}`}
                {...props}
            />
        </div>
    );
};
