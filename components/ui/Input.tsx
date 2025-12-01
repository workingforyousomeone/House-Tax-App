import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ icon, label, className = '', ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-pink-300 transition-colors duration-300 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full 
            bg-black/20 hover:bg-black/30
            border border-white/10 group-focus-within:border-white/30
            rounded-xl 
            py-3.5 ${icon ? 'pl-11' : 'pl-4'} pr-4
            text-white placeholder-white/20
            focus:outline-none focus:ring-2 focus:ring-pink-500/20
            backdrop-blur-sm
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};