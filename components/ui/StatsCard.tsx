import React from 'react';
import { GlassCard } from './GlassCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  trend?: string;
  colorClass?: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  subValue, 
  icon, 
  trend, 
  colorClass = "bg-white/5",
  onClick 
}) => {
  return (
    <GlassCard 
      className={`p-4 md:p-6 flex flex-col justify-between h-full transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/10 hover:scale-[1.02]' : ''}`}
    >
      <div className="flex justify-between items-start mb-2 md:mb-4">
        <div className={`p-2 md:p-3 rounded-2xl ${colorClass} backdrop-blur-md`}>
          {icon}
        </div>
        {trend && (
          <span className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-white/70">
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5 truncate">{title}</h3>
        <p className="text-xl md:text-3xl font-bold text-white tracking-tight truncate">{value}</p>
        {subValue && (
          <p className="text-white/40 text-[10px] md:text-sm mt-1 truncate">{subValue}</p>
        )}
      </div>
    </GlassCard>
  );
};