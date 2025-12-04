import React, { useState } from 'react';
import { LogOut, Home, Layers, IndianRupee, Users, ArrowRight, Search, ArrowLeft, Fingerprint, Smartphone, AlertCircle, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { StatsCard } from './ui/StatsCard';
import { HouseholdDetail } from './HouseholdDetail';
import { Input } from './ui/Input';
import { User, Household } from '../types';
import { HOUSEHOLDS, USERS } from '../data/mockData';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type ViewState = 'DASHBOARD' | 'CLUSTER_VIEW' | 'HOUSEHOLD_DETAIL' | 'DATA_FILTER_VIEW';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for Data Insight Filter View
  const [filterTitle, setFilterTitle] = useState('');
  const [filteredData, setFilteredData] = useState<Household[]>([]);

  // Data Filtering
  const accessibleClusters = user.role === 'ADMIN' 
    ? Array.from(new Set(USERS.flatMap(u => u.clusters))).sort((a, b) => {
        const numA = parseInt(a.replace('C', ''));
        const numB = parseInt(b.replace('C', ''));
        return numA - numB;
    })
    : user.clusters;

  const filteredHouseholds = HOUSEHOLDS.filter(h => accessibleClusters.includes(h.clusterNo));
  
  // Dashboard Stats Calculation
  const totalStats = filteredHouseholds.reduce((acc, curr) => ({
    households: acc.households + 1,
    totalTax: acc.totalTax + curr.totalTax,
    collected: acc.collected + curr.taxCollected,
    pending: acc.pending + (curr.totalTax - curr.taxCollected)
  }), { households: 0, totalTax: 0, collected: 0, pending: 0 });

  // Navigation Handlers
  const handleClusterClick = (cluster: string) => {
    setSelectedCluster(cluster);
    setCurrentView('CLUSTER_VIEW');
    setSearchTerm('');
  };

  const handleHouseholdClick = (household: Household) => {
    setSelectedHousehold(household);
    setCurrentView('HOUSEHOLD_DETAIL');
  };

  const handleBack = () => {
    if (currentView === 'HOUSEHOLD_DETAIL') {
       // Check history logic roughly
       if (selectedCluster) {
           setCurrentView('CLUSTER_VIEW');
       } else if (filterTitle) {
           setCurrentView('DATA_FILTER_VIEW');
       } else {
           setCurrentView('DASHBOARD');
       }
       setSelectedHousehold(null);
    } else if (currentView === 'CLUSTER_VIEW') {
      setCurrentView('DASHBOARD');
      setSelectedCluster(null);
    } else if (currentView === 'DATA_FILTER_VIEW') {
      setCurrentView('DASHBOARD');
      setFilterTitle('');
      setFilteredData([]);
    }
  };

  const getHouseholdsByCount = (key: 'aadhaarNo' | 'phoneNo', countType: 'missing' | number) => {
      if (countType === 'missing') {
          return filteredHouseholds.filter(h => !h[key] || h[key] === '' || String(h[key]).length < 5);
      }
      
      const validHouseholds = filteredHouseholds.filter(h => h[key] && h[key] !== '' && String(h[key]).length >= 5);
      const freqMap: Record<string, number> = {};
      
      validHouseholds.forEach(h => {
           const val = String(h[key]);
           freqMap[val] = (freqMap[val] || 0) + 1;
      });
      
      if (countType === 5) {
           // 5+ logic
           return validHouseholds.filter(h => freqMap[String(h[key])] >= 5);
      }
      
      return validHouseholds.filter(h => freqMap[String(h[key])] === countType);
  };

  const handleInsightClick = (title: string, households: Household[]) => {
      setFilterTitle(title);
      setFilteredData(households);
      setCurrentView('DATA_FILTER_VIEW');
      setSearchTerm('');
  };

  // Render Logic
  const renderDashboard = () => {
    const calculateDuplicationStats = (key: 'aadhaarNo' | 'phoneNo') => {
        const missingList = getHouseholdsByCount(key, 'missing');
        const oneList = getHouseholdsByCount(key, 1);
        const twoList = getHouseholdsByCount(key, 2);
        const threeList = getHouseholdsByCount(key, 3);
        const fourList = getHouseholdsByCount(key, 4);
        const fivePlusList = getHouseholdsByCount(key, 5);

        return {
            missing: missingList,
            one: oneList,
            two: twoList,
            three: threeList,
            four: fourList,
            fivePlus: fivePlusList,
        };
    };

    const aadhaarStats = calculateDuplicationStats('aadhaarNo');
    const mobileStats = calculateDuplicationStats('phoneNo');

    return (
      <div className="animate-fade-in space-y-4 md:space-y-8 w-full">
        {/* Top Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <StatsCard 
            title="Households" 
            value={totalStats.households} 
            icon={<Home className="text-blue-400" size={18} />}
            colorClass="bg-blue-500/20"
          />
          <StatsCard 
            title="Demand" 
            value={`₹${totalStats.totalTax.toLocaleString()}`}
            icon={<IndianRupee className="text-white" size={18} />}
            colorClass="bg-white/10"
          />
          <StatsCard 
            title="Collected" 
            value={`₹${totalStats.collected.toLocaleString()}`}
            icon={<IndianRupee className="text-cyan-400" size={18} />}
            colorClass="bg-cyan-500/20"
          />
          <StatsCard 
            title="Pending" 
            value={`₹${totalStats.pending.toLocaleString()}`}
            icon={<IndianRupee className="text-red-400" size={18} />}
            colorClass="bg-red-500/20"
          />
        </div>

        {/* Data Insights Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aadhaar Stats Card */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                        <Fingerprint size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Aadhaar Coverage</h3>
                </div>
                <div className="space-y-3">
                    {aadhaarStats.missing.length > 0 && (
                        <div 
                            onClick={() => handleInsightClick('Not having Aadhaar', aadhaarStats.missing)}
                            className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/10 cursor-pointer hover:bg-red-500/20 transition-colors"
                        >
                             <div className="flex items-center gap-2 text-red-200">
                                <AlertCircle size={16} />
                                <span className="text-sm font-medium">Not having Aadhaar</span>
                             </div>
                             <span className="text-lg font-bold text-red-400">{aadhaarStats.missing.length}</span>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                        {aadhaarStats.one.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('1 HH per Aadhaar', aadhaarStats.one)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">1 HH per Aadhaar</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-400" />
                                    <span className="text-lg font-bold text-white">{aadhaarStats.one.length}</span>
                                </div>
                            </div>
                        )}
                        {aadhaarStats.two.length > 0 && (
                             <div 
                                onClick={() => handleInsightClick('2 HH per Aadhaar', aadhaarStats.two)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                             >
                                <p className="text-[10px] text-white/40 uppercase mb-1">2 HH per Aadhaar</p>
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-blue-400" />
                                    <span className="text-lg font-bold text-white">{aadhaarStats.two.length}</span>
                                </div>
                            </div>
                        )}
                        {aadhaarStats.three.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('3 HH per Aadhaar', aadhaarStats.three)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">3 HH per Aadhaar</p>
                                <span className="text-lg font-bold text-white">{aadhaarStats.three.length}</span>
                            </div>
                        )}
                        {aadhaarStats.four.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('4 HH per Aadhaar', aadhaarStats.four)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">4 HH per Aadhaar</p>
                                <span className="text-lg font-bold text-white">{aadhaarStats.four.length}</span>
                            </div>
                        )}
                        {aadhaarStats.fivePlus.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('5+ HH per Aadhaar', aadhaarStats.fivePlus)}
                                className="col-span-2 p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase">5+ HH per Aadhaar</p>
                                <span className="text-lg font-bold text-white">{aadhaarStats.fivePlus.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </GlassCard>

            {/* Mobile Stats Card */}
            <GlassCard className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                        <Smartphone size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Mobile Coverage</h3>
                </div>
                <div className="space-y-3">
                    {mobileStats.missing.length > 0 && (
                        <div 
                            onClick={() => handleInsightClick('Not having Mobile', mobileStats.missing)}
                            className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/10 cursor-pointer hover:bg-red-500/20 transition-colors"
                        >
                             <div className="flex items-center gap-2 text-red-200">
                                <AlertCircle size={16} />
                                <span className="text-sm font-medium">Not having Mobile</span>
                             </div>
                             <span className="text-lg font-bold text-red-400">{mobileStats.missing.length}</span>
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-2">
                        {mobileStats.one.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('1 HH per Mobile', mobileStats.one)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">1 HH per Mobile</p>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={14} className="text-green-400" />
                                    <span className="text-lg font-bold text-white">{mobileStats.one.length}</span>
                                </div>
                            </div>
                        )}
                         {mobileStats.two.length > 0 && (
                             <div 
                                onClick={() => handleInsightClick('2 HH per Mobile', mobileStats.two)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                             >
                                <p className="text-[10px] text-white/40 uppercase mb-1">2 HH per Mobile</p>
                                <div className="flex items-center gap-2">
                                    <Users size={14} className="text-blue-400" />
                                    <span className="text-lg font-bold text-white">{mobileStats.two.length}</span>
                                </div>
                            </div>
                        )}
                        {mobileStats.three.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('3 HH per Mobile', mobileStats.three)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">3 HH per Mobile</p>
                                <span className="text-lg font-bold text-white">{mobileStats.three.length}</span>
                            </div>
                        )}
                        {mobileStats.four.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('4 HH per Mobile', mobileStats.four)}
                                className="p-3 rounded-lg bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase mb-1">4 HH per Mobile</p>
                                <span className="text-lg font-bold text-white">{mobileStats.four.length}</span>
                            </div>
                        )}
                        {mobileStats.fivePlus.length > 0 && (
                            <div 
                                onClick={() => handleInsightClick('5+ HH per Mobile', mobileStats.fivePlus)}
                                className="col-span-2 p-3 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors"
                            >
                                <p className="text-[10px] text-white/40 uppercase">5+ HH per Mobile</p>
                                <span className="text-lg font-bold text-white">{mobileStats.fivePlus.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </GlassCard>
        </div>

        {/* Cluster Grid */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 px-1">
            <Layers size={18} className="text-blue-500" /> 
            {user.role === 'ADMIN' ? 'All Clusters' : 'Your Clusters'}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {accessibleClusters.map(cluster => {
              const clusterHouses = filteredHouseholds.filter(h => h.clusterNo === cluster);
              const clusterTotal = clusterHouses.reduce((sum, h) => sum + h.totalTax, 0);
              const clusterCollected = clusterHouses.reduce((sum, h) => sum + h.taxCollected, 0);
              const clusterPending = clusterTotal - clusterCollected;
              
              return (
                <GlassCard 
                  key={cluster} 
                  className="group hover:bg-blue-600/20 cursor-pointer transition-all duration-300 relative overflow-hidden p-3 md:p-4"
                  onClick={() => handleClusterClick(cluster)}
                >
                   <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">{cluster}</h3>
                          <div className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-white/60 font-medium group-hover:bg-blue-500/20 group-hover:text-blue-100 transition-colors">
                             {clusterHouses.length} H
                          </div>
                      </div>

                      <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                              <span className="text-white/40">Dem</span>
                              <span className="text-white font-medium">₹{(clusterTotal/1000).toFixed(1)}k</span>
                          </div>
                           <div className="flex justify-between text-xs">
                              <span className="text-white/40">Pen</span>
                              <span className="text-red-300 font-medium">₹{(clusterPending/1000).toFixed(1)}k</span>
                          </div>
                      </div>
                   </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderDataFilterView = () => {
      const displayData = filteredData.filter(h => 
          h.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
          h.assessmentNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          h.aadhaarNo.includes(searchTerm) ||
          h.phoneNo.includes(searchTerm)
      );

      const isAadhaarView = filterTitle.toLowerCase().includes('aadhaar');
      const dynamicHeader = isAadhaarView ? 'Aadhaar No' : 'Mobile No';

      return (
        <div className="animate-fade-in space-y-4 md:space-y-6 w-full">
            <div className="flex items-center justify-between">
                <button onClick={handleBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium p-2 -ml-2">
                    <ArrowLeft className="" size={18} /> Back to Dashboard
                </button>
            </div>

            <GlassCard className="p-4 md:p-6 min-h-[50vh]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                        {filterTitle} <span className="text-sm font-normal text-white/50 ml-2">({displayData.length} Found)</span>
                    </h2>
                    <div className="w-full md:w-72">
                        <Input 
                            placeholder="Search in list..." 
                            icon={<Search size={16}/>} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="!bg-black/30 !py-2.5 !text-sm"
                        />
                    </div>
                </div>

                <div className="-mx-4 md:mx-0">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead>
                            <tr className="text-xs text-white/40 uppercase border-b border-white/10">
                                <th className="py-3 pl-4 pr-1 w-[95px] md:w-[130px] whitespace-nowrap">Assess No</th>
                                <th className="py-3 px-1 w-auto">Owner</th>
                                <th className="py-3 px-1 w-[55px] md:w-[80px] text-center">Cluster</th>
                                <th className="py-3 pl-1 pr-4 w-[95px] md:w-[130px] text-right">{dynamicHeader}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {displayData.map(house => {
                                const displayValue = isAadhaarView ? house.aadhaarNo : house.phoneNo;
                                return (
                                    <tr 
                                        key={house.assessmentNo} 
                                        onClick={() => handleHouseholdClick(house)}
                                        className="border-b border-white/5 hover:bg-blue-500/10 transition-colors cursor-pointer group"
                                    >
                                        <td className="py-3 pl-4 pr-1 font-medium text-white group-hover:text-blue-300 transition-colors whitespace-nowrap text-xs md:text-sm">
                                            {house.assessmentNo}
                                        </td>
                                        <td className="py-3 px-1 text-white/80 truncate">
                                            {house.ownerName}
                                        </td>
                                        <td className="py-3 px-1 text-white/60 text-xs md:text-sm text-center">
                                            {house.clusterNo}
                                        </td>
                                        <td className="py-3 pl-1 pr-4 text-right text-white/80 text-xs md:text-sm font-mono">
                                            {displayValue ? displayValue : <span className="text-red-400/50 italic">Missing</span>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {displayData.length === 0 && (
                        <div className="text-center py-12 text-white/30">
                            No records found matching search.
                        </div>
                    )}
                </div>
            </GlassCard>
        </div>
      );
  };

  const renderClusterView = () => {
    const housesInCluster = filteredHouseholds.filter(h => 
      h.clusterNo === selectedCluster && 
      (h.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       h.assessmentNo.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const clusterTotal = housesInCluster.reduce((sum, h) => sum + h.totalTax, 0);
    const clusterPending = housesInCluster.reduce((sum, h) => sum + (h.totalTax - h.taxCollected), 0);

    return (
      <div className="animate-fade-in space-y-4 md:space-y-6 w-full">
        <div className="flex flex-col gap-4">
             <div className="flex items-center justify-between">
                <button onClick={handleBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium p-2 -ml-2">
                    <ArrowLeft className="" size={18} /> Back
                </button>
                <div className="md:hidden text-right">
                     <p className="text-[10px] text-white/40 uppercase">Cluster Pending</p>
                     <p className="text-sm text-red-300 font-bold">₹{clusterPending.toLocaleString()}</p>
                </div>
             </div>

             <div className="hidden md:flex items-center gap-4 justify-end bg-white/5 p-3 rounded-xl border border-white/5">
                 <div className="text-right">
                     <p className="text-xs text-white/40 uppercase">Cluster Total</p>
                     <p className="text-lg text-white font-bold">₹{clusterTotal.toLocaleString()}</p>
                 </div>
                 <div className="h-8 w-px bg-white/10"></div>
                 <div className="text-right">
                     <p className="text-xs text-white/40 uppercase">Cluster Pending</p>
                     <p className="text-lg text-red-300 font-bold">₹{clusterPending.toLocaleString()}</p>
                 </div>
             </div>
        </div>

        <GlassCard className="p-4 md:p-6 min-h-[50vh]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    Cluster {selectedCluster} <span className="text-sm font-normal text-white/50 ml-2">({housesInCluster.length} Houses)</span>
                </h2>
                <div className="w-full md:w-72">
                    <Input 
                        placeholder="Search..." 
                        icon={<Search size={16}/>} 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="!bg-black/30 !py-2.5 !text-sm"
                    />
                </div>
            </div>

            <div className="-mx-4 md:mx-0">
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="text-xs text-white/40 uppercase border-b border-white/10">
                            {/* Adjusted width for fixed table layout to prevent scroll */}
                            <th className="py-3 pl-4 pr-1 w-[105px] md:w-auto whitespace-nowrap">Assess No</th>
                            <th className="py-3 px-1 w-auto">Owner</th>
                            <th className="py-3 pl-1 pr-4 w-[70px] md:w-auto text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {housesInCluster.map(house => {
                            return (
                                <tr 
                                    key={house.assessmentNo} 
                                    onClick={() => handleHouseholdClick(house)}
                                    className="border-b border-white/5 hover:bg-blue-500/10 transition-colors cursor-pointer group"
                                >
                                    <td className="py-3 pl-4 pr-1 font-medium text-white group-hover:text-blue-300 transition-colors whitespace-nowrap text-xs md:text-sm">
                                        {house.assessmentNo}
                                    </td>
                                    <td className="py-3 px-1 text-white/80 truncate">
                                        {house.ownerName}
                                    </td>
                                    <td className="py-3 pl-1 pr-4 text-right text-white/80 text-xs md:text-sm">
                                        ₹{house.totalTax.toLocaleString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {housesInCluster.length === 0 && (
                    <div className="text-center py-12 text-white/30">
                        No households found in this cluster.
                    </div>
                )}
            </div>
        </GlassCard>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 pb-20">
      {/* Header */}
      <header className="flex flex-row items-center justify-between gap-2 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Tax App
            {user.role === 'ADMIN' && (
                <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold self-center shadow-[0_0_10px_rgba(37,99,235,0.5)]">ADMIN</span>
            )}
          </h1>
          <p className="text-blue-200/60 text-xs md:text-sm mt-0.5 truncate max-w-[200px] md:max-w-none">
            {user.name}
          </p>
        </div>
        
        <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-xs md:text-sm"
        >
            <LogOut size={14} /> <span className="hidden md:inline">Sign Out</span>
        </button>
      </header>

      {/* View Switcher */}
      {currentView === 'DASHBOARD' && renderDashboard()}
      {currentView === 'CLUSTER_VIEW' && renderClusterView()}
      {currentView === 'DATA_FILTER_VIEW' && renderDataFilterView()}
      {currentView === 'HOUSEHOLD_DETAIL' && selectedHousehold && (
        <HouseholdDetail household={selectedHousehold} onBack={handleBack} />
      )}
    </div>
  );
};