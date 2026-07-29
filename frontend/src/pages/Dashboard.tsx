import { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import VehicleCard, { type Vehicle } from '../components/VehicleCard';
import { useLocation } from 'wouter';
import api from '../utils/axiosInstance';

const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterMake, setFilterMake] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500000);
  
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLocation('/login');
          return;
        }

        const response = await api.get('/api/vehicles');
        const data = response.data;

        setVehicles(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [setLocation]);

  // Derived filter logic
  const uniqueMakes = ['All', ...new Set(vehicles.map(v => v.make))];
  
  const filteredVehicles = vehicles
    .filter(v => {
      const matchesSearch = v.make.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            v.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMake = filterMake === 'All' || v.make === filterMake;
      const matchesPrice = v.price <= maxPrice;
      
      return matchesSearch && matchesMake && matchesPrice;
    })
    .sort((a, b) => {
      // Push out-of-stock items to the very end
      if (a.quantity > 0 && b.quantity === 0) return -1;
      if (a.quantity === 0 && b.quantity > 0) return 1;
      return 0; // maintain relative order otherwise
    });

  const handlePurchaseSuccess = (vehicleId: string, newQuantity: number) => {
    setVehicles(prevVehicles => 
      prevVehicles.map(v => 
        v._id === vehicleId ? { ...v, quantity: newQuantity } : v
      )
    );
  };

  return (
    <div className="min-h-screen relative pt-28 pb-12 px-6 overflow-hidden ">
      
      {/* Page-Specific High Opacity Orbs */}
      <div className="absolute top-[5%] right-[10%] w-[30rem] h-[30rem] bg-incubyte-teal/40 rounded-full blur-[60px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute bottom-[20%] left-[5%] w-[40rem] h-[40rem] bg-emerald-500/30 rounded-full blur-[80px] pointer-events-none animate-float-slower z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-serif font-black mb-2 text-[#202020]">Inventory Dashboard</h1>
            <p className="text-gray-500 font-medium tracking-wide">Manage and browse the exclusive KataMD fleet.</p>
          </div>

          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white border border-gray-200 shadow-sm rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-incubyte-teal transition-all"
                placeholder="Search make or model..."
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 rounded-xl transition-colors border shadow-sm ${showFilters ? 'bg-incubyte-teal/5 border-incubyte-teal/30 text-incubyte-teal' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-600'}`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        {showFilters && (
          <div className="glass-card p-6 mb-8 animate-in slide-in-from-top-4 fade-in duration-200">
            <h3 className="text-lg font-serif font-bold mb-4 text-[#202020]">Refine Search</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Manufacturer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Manufacturer</label>
                <div className="flex flex-wrap gap-2">
                  {uniqueMakes.map(make => (
                    <button
                      key={make}
                      onClick={() => setFilterMake(make)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filterMake === make 
                          ? 'bg-incubyte-teal text-white shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                      }`}
                    >
                      {make}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-500">Maximum Price</label>
                  <span className="text-incubyte-teal font-bold">${maxPrice.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-incubyte-teal"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>$10k</span>
                  <span>$500k+</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-incubyte-teal animate-spin mb-4" />
            <p className="text-gray-500">Loading exquisite vehicles...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-sm">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Retry
            </button>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-12 text-center">
            <h3 className="text-xl font-serif font-bold text-[#202020] mb-2">No vehicles found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map(vehicle => (
              <VehicleCard 
                key={vehicle._id} 
                vehicle={vehicle} 
                onPurchaseSuccess={handlePurchaseSuccess}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
