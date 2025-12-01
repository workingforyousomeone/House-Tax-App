import React from 'react';
import { ArrowLeft, Home, Ruler, IndianRupee, MapPin, Phone, User, FileText } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Household } from '../types';

interface HouseholdDetailProps {
  household: Household;
  onBack: () => void;
}

export const HouseholdDetail: React.FC<HouseholdDetailProps> = ({ household, onBack }) => {
  const pending = household.totalTax - household.taxCollected;
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">Assessment # {household.assessmentNo}</h2>
          <p className="text-white/50 text-sm">Cluster: {household.clusterNo} • Old Assessment: {household.oldAssessmentNo}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info */}
        <GlassCard className="p-6 md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <User size={18} className="text-blue-400" /> Owner Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="text-xs text-white/40 uppercase block mb-1">Owner Name</label>
                    <p className="text-lg text-white font-medium">{household.ownerName}</p>
                </div>
                <div>
                    <label className="text-xs text-white/40 uppercase block mb-1">Parent Name</label>
                    <p className="text-lg text-white font-medium">{household.parentName}</p>
                </div>
                <div>
                    <label className="text-xs text-white/40 uppercase block mb-1">Phone Number</label>
                    <p className="text-lg text-white font-medium flex items-center gap-2">
                        <Phone size={14} className="text-white/40"/> {household.phoneNo}
                    </p>
                </div>
                <div>
                    <label className="text-xs text-white/40 uppercase block mb-1">Aadhaar Number</label>
                    <p className="text-lg text-white font-medium">{household.aadhaarNo}</p>
                </div>
                 <div>
                    <label className="text-xs text-white/40 uppercase block mb-1">House No</label>
                    <p className="text-lg text-white font-medium">{household.hNo}</p>
                </div>
            </div>
        </GlassCard>

        {/* Tax Status */}
        <GlassCard className="p-6 bg-gradient-to-b from-white/5 to-white/0">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <IndianRupee size={18} className="text-cyan-400" /> Tax Summary
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="text-white/60 text-sm">Total Demand</span>
                    <span className="text-white font-bold">₹{household.totalTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <span className="text-cyan-200 text-sm">Collected</span>
                    <span className="text-cyan-400 font-bold">₹{household.taxCollected.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <span className="text-red-200 text-sm">Pending</span>
                    <span className="text-red-400 font-bold">₹{pending.toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                 {household.tax2023_24 > 0 && (
                    <div className="flex justify-between text-xs text-white/40">
                        <span>2023-24</span>
                        <span>₹{household.tax2023_24}</span>
                    </div>
                 )}
                 {household.tax2024_25 > 0 && (
                    <div className="flex justify-between text-xs text-white/40">
                        <span>2024-25</span>
                        <span>₹{household.tax2024_25}</span>
                    </div>
                 )}
                 {household.tax2025_26 > 0 && (
                    <div className="flex justify-between text-xs text-white/40">
                        <span>2025-26</span>
                        <span>₹{household.tax2025_26}</span>
                    </div>
                 )}
            </div>
        </GlassCard>

        {/* Measurement Details */}
        <GlassCard className="p-6 md:col-span-3">
             <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Ruler size={18} className="text-indigo-400" /> Measurements & Floor Details
            </h3>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-xs text-white/40 uppercase border-b border-white/10">
                            <th className="py-3 px-2">Floor No</th>
                            <th className="py-3 px-2">Type</th>
                            <th className="py-3 px-2">Length (ft)</th>
                            <th className="py-3 px-2">Width (ft)</th>
                            <th className="py-3 px-2">Area (sq ft)</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {household.floors.length > 0 ? (
                            household.floors.map((floor) => (
                                <tr key={floor.floorNo} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-2 font-medium text-white">Floor {floor.floorNo}</td>
                                    <td className="py-4 px-2 text-white/70">{floor.houseType}</td>
                                    <td className="py-4 px-2 text-white/70">{floor.length}</td>
                                    <td className="py-4 px-2 text-white/70">{floor.width}</td>
                                    <td className="py-4 px-2 text-white/70">{floor.length * floor.width}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-6 text-center text-white/30">No specific floor details available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};