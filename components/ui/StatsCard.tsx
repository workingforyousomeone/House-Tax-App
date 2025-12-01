import React from 'react';
import { GlassCard } from './GlassCard';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  colorClass?: string;
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  colorClass = "bg-emerald-500/10",
  onClick 
}) => {
  return (
    <GlassCard 
      className={`p-4 flex flex-col h-full justify-between transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/10 hover:scale-[1.02]' : ''}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-xl ${colorClass} backdrop-blur-md flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex flex-col">
           <h3 className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wider">{title}</h3>
           {trend && (
            <span className="text-[10px] text-emerald-400 font-medium">
                {trend}
            </span>
           )}
        </div>
      </div>
      
      <div>
        <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </GlassCard>
  );
};