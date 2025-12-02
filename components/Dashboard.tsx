import React, { useState } from 'react';
import { LogOut, Home, Layers, IndianRupee, Users, ArrowRight, Search, ArrowLeft } from 'lucide-react';
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

type ViewState = 'DASHBOARD' | 'CLUSTER_VIEW' | 'HOUSEHOLD_DETAIL';

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      setCurrentView('CLUSTER_VIEW');
      setSelectedHousehold(null);
    } else {
      setCurrentView('DASHBOARD');
      setSelectedCluster(null);
    }
  };

  // Render Logic
  const renderDashboard = () => {
    return (
      <div className="animate-fade-in space-y-4 md:space-y-8 w-full">
        {/* Top Stats Row - Grid 2x2 on mobile to save vertical space */}
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
      {currentView === 'HOUSEHOLD_DETAIL' && selectedHousehold && (
        <HouseholdDetail household={selectedHousehold} onBack={handleBack} />
      )}
    </div>
  );
};
