import React, { useState } from 'react';
import { ArrowLeft, Ruler, IndianRupee, Phone, User, Compass, Map, Building2, ScrollText, ChevronDown, Receipt } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Household } from '../types';
import { COLLECTION_RECORDS } from '../data/mockData';

interface HouseholdDetailProps {
  household: Household;
  onBack: () => void;
}

// Helper component for collapsible sections
interface ExpandableSectionProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
    accentColor?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({ title, icon, children, defaultOpen = false, accentColor = "text-blue-400" }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <GlassCard className="overflow-hidden transition-all duration-300 ease-out">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
            >
                <div className="flex items-center gap-4">
                    <div className={`
                        p-2.5 rounded-xl transition-all duration-300
                        ${isOpen ? 'bg-blue-600/20 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/80'}
                    `}>
                        {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
                    </div>
                    <div>
                        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                            {title}
                        </span>
                        {!isOpen && <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Click to view details</p>}
                    </div>
                </div>
                <div className={`
                    p-2 rounded-full transition-all duration-500
                    ${isOpen ? 'bg-white/10 rotate-180 text-white' : 'text-white/30 group-hover:text-white/60'}
                `}>
                    <ChevronDown size={20} />
                </div>
            </button>
            
            <div 
                className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
               <div className="px-6 pb-6 pt-2 border-t border-white/5">
                   <div className="animate-fade-in pt-2">
                     {children}
                   </div>
               </div>
            </div>
        </GlassCard>
    );
};

export const HouseholdDetail: React.FC<HouseholdDetailProps> = ({ household, onBack }) => {
  const pending = household.totalTax - household.taxCollected;
  const householdPayments = COLLECTION_RECORDS.filter(record => record.assessmentNo === household.assessmentNo);
  
  return (
    <div className="animate-fade-in w-full max-w-4xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="self-start md:self-auto p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Assessment # {household.assessmentNo}</h2>
          <div className="flex items-center gap-3 mt-1 text-sm">
             <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-500/20">Cluster {household.clusterNo}</span>
             <span className="text-white/40">Old: <span className="text-white/70">{household.oldAssessmentNo}</span></span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Owner Details Section */}
        <ExpandableSection 
            title="Owner Information" 
            icon={<User />} 
            defaultOpen={true}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Owner Name</label>
                    <p className="text-xl text-white font-medium">{household.ownerName}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Parent Name</label>
                    <p className="text-xl text-white font-medium">{household.parentName}</p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Phone Number</label>
                    <p className="text-lg text-white font-medium flex items-center gap-2">
                        <Phone size={16} className="text-blue-400/70"/> 
                        {household.phoneNo || <span className="text-white/20 italic">Not Available</span>}
                    </p>
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Aadhaar Number</label>
                    <p className="text-lg text-white font-medium">
                        {household.aadhaarNo || <span className="text-white/20 italic">Not Available</span>}
                    </p>
                </div>
                 <div className="space-y-1">
                    <label className="text-xs text-white/40 uppercase tracking-wider">Door / House No</label>
                    <p className="text-lg text-white font-medium">{household.hNo}</p>
                </div>
            </div>
        </ExpandableSection>

        {/* Tax Summary Section */}
        <ExpandableSection 
            title="Tax Summary" 
            icon={<IndianRupee />}
        >
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center text-center">
                        <span className="text-white/50 text-xs uppercase mb-1">Total Demand</span>
                        <span className="text-2xl text-white font-bold tracking-tight">₹{household.totalTax.toLocaleString()}</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col justify-center text-center">
                        <span className="text-red-300/70 text-xs uppercase mb-1">Pending Amount</span>
                        <span className="text-2xl text-red-400 font-bold tracking-tight">₹{pending.toLocaleString()}</span>
                    </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-white/10">
                    <table className="w-full text-left">
                        <thead className="bg-white/5">
                            <tr className="text-xs text-white/40 uppercase">
                                <th className="py-3 px-4 font-medium">Financial Year</th>
                                <th className="py-3 px-4 text-right font-medium">Tax Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {household.tax2025_26 > 0 && (
                                <tr>
                                    <td className="py-3 px-4 text-white/80">2025 - 2026</td>
                                    <td className="py-3 px-4 text-right text-white font-mono">₹{household.tax2025_26}</td>
                                </tr>
                            )}
                            {household.tax2024_25 > 0 && (
                                <tr>
                                    <td className="py-3 px-4 text-white/80">2024 - 2025</td>
                                    <td className="py-3 px-4 text-right text-white font-mono">₹{household.tax2024_25}</td>
                                </tr>
                            )}
                            {household.tax2023_24 > 0 && (
                                <tr>
                                    <td className="py-3 px-4 text-white/80">2023 - 2024</td>
                                    <td className="py-3 px-4 text-right text-white font-mono">₹{household.tax2023_24}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </ExpandableSection>

        {/* Payment History Section */}
        <ExpandableSection 
            title="Payment History" 
            icon={<Receipt />}
        >
            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-white/5">
                        <tr className="text-xs text-white/40 uppercase">
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Receipt No</th>
                            <th className="py-3 px-4">Due Year</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4 text-right">Amount</th>
                            <th className="py-3 px-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {householdPayments.length > 0 ? (
                            householdPayments.map((record, index) => (
                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-white">{record.dateOfPayment}</td>
                                    <td className="py-3 px-4 text-white/70 font-mono text-xs">{record.receiptNo}</td>
                                    <td className="py-3 px-4 text-white/70">{record.dueYear}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${record.demandCategory === 'Current' ? 'bg-blue-500/20 text-blue-300' : 'bg-orange-500/20 text-orange-300'}`}>
                                            {record.demandCategory}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right text-white font-mono">₹{record.totalTax}</td>
                                    <td className="py-3 px-4 text-center">
                                         <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${record.receiptStatus === 'Success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                                            {record.receiptStatus}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-white/30 italic">No payment records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </ExpandableSection>

        {/* Measurements Section */}
        <ExpandableSection 
            title="Measurements & Floors" 
            icon={<Ruler />}
        >
            <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5">
                        <tr className="text-xs text-white/40 uppercase">
                            <th className="py-3 px-4 whitespace-nowrap">Floor</th>
                            <th className="py-3 px-4 whitespace-nowrap">Type</th>
                            <th className="py-3 px-4 whitespace-nowrap">L x W (ft)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {household.floors.length > 0 ? (
                            household.floors.map((floor) => (
                                <tr key={floor.floorNo} className="hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 font-medium text-white">Floor {floor.floorNo}</td>
                                    <td className="py-3 px-4 text-white/70">
                                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs">
                                            {floor.houseType}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-white/70 font-mono">{floor.length} x {floor.width}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-8 text-center text-white/30 italic">No floor details available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </ExpandableSection>

        {/* Property & Boundary Section */}
        <ExpandableSection 
            title="Property & Boundary" 
            icon={<Map />}
        >
            <div className="flex flex-col gap-8">
                {/* Properties Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-[10px] text-white/40 uppercase block mb-1">Nature of Property</label>
                        <p className="text-sm text-white font-medium flex items-center gap-2">
                             <Building2 size={14} className="text-blue-400"/> {household.natureOfProperty}
                        </p>
                    </div>
                     <div>
                        <label className="text-[10px] text-white/40 uppercase block mb-1">Land Use</label>
                        <p className="text-sm text-white font-medium">{household.natureOfLandUse}</p>
                    </div>
                     <div>
                        <label className="text-[10px] text-white/40 uppercase block mb-1">Usage</label>
                        <p className="text-sm text-white font-medium">{household.natureOfUsage}</p>
                    </div>
                    <div>
                        <label className="text-[10px] text-white/40 uppercase block mb-1">Ownership</label>
                        <p className="text-sm text-white font-medium">{household.natureOfOwnership}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="text-[10px] text-white/40 uppercase block mb-1">Acquisition</label>
                        <p className="text-sm text-white font-medium flex items-center gap-2">
                            <ScrollText size={14} className="text-purple-400"/> {household.modeOfAcquisition}
                        </p>
                    </div>
                </div>

                {/* Compass Boundaries */}
                <div className="bg-black/20 rounded-2xl p-6 relative border border-white/5">
                     <div className="absolute top-4 left-4 text-xs text-white/40 uppercase flex items-center gap-1.5">
                        <Compass size={14} /> Boundary Map
                     </div>
                     <div className="grid grid-cols-3 gap-4 text-center text-xs mt-4">
                        {/* Top Row */}
                        <div></div>
                        <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
                            <span className="text-[10px] text-blue-300 uppercase mb-1 tracking-wider">North</span>
                            <span className="text-white font-medium truncate w-full" title={household.boundaryNorth}>{household.boundaryNorth}</span>
                        </div>
                        <div></div>

                        {/* Middle Row */}
                        <div className="flex flex-col justify-center p-2 rounded-lg bg-white/5">
                            <span className="text-[10px] text-blue-300 uppercase mb-1 tracking-wider">West</span>
                            <span className="text-white font-medium truncate w-full" title={household.boundaryWest}>{household.boundaryWest}</span>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full border-2 border-blue-500/30 flex items-center justify-center bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_5px_#60a5fa]"></div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center p-2 rounded-lg bg-white/5">
                            <span className="text-[10px] text-blue-300 uppercase mb-1 tracking-wider">East</span>
                            <span className="text-white font-medium truncate w-full" title={household.boundaryEast}>{household.boundaryEast}</span>
                        </div>

                        {/* Bottom Row */}
                        <div></div>
                         <div className="flex flex-col items-center p-2 rounded-lg bg-white/5">
                            <span className="text-white font-medium truncate w-full" title={household.boundarySouth}>{household.boundarySouth}</span>
                            <span className="text-[10px] text-blue-300 uppercase mt-1 tracking-wider">South</span>
                        </div>
                        <div></div>
                     </div>
                </div>
            </div>
        </ExpandableSection>
      </div>
    </div>
  );
};