import { Car, Fuel, Zap, Calendar, Tag, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  category: string;
  powertrain: string;
  description?: string;
  horsepower?: string;
  zeroToSixty?: string;
  topSpeed?: string;
  year: number;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onPurchaseSuccess?: (vehicleId: string, newQuantity: number) => void;
}

const VehicleCard = ({ vehicle, onPurchaseSuccess }: VehicleCardProps) => {
  const [isPurchasing, setIsPurchasing] = useState(false);

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('You must be logged in to purchase.');
        return;
      }
      
      const response = await fetch(`/api/vehicles/${vehicle._id}/purchase`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: 1 })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to purchase vehicle');
      }
      
      toast.success(`🎉 🏎️ VROOM! You just bought a ${vehicle.make} ${vehicle.model}!`);
      
      // Trigger a luxury-colored confetti explosion
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#014D43', '#003642', '#FFFFFF']
      });
      
      if (onPurchaseSuccess && data.vehicle) {
        onPurchaseSuccess(vehicle._id, data.vehicle.quantity);
      }
    } catch (err: any) {
      toast.error(err.message || 'Purchase failed.');
    } finally {
      setIsPurchasing(false);
    }
  };
  return (
    <div className="glass-card group relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(1,77,67,0.12)] hover:border-incubyte-teal/40">
      
      <div className="relative h-56 w-full overflow-hidden bg-gray-100 border-b border-gray-100">
        <img 
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 ${vehicle.quantity > 0 ? 'group-hover:scale-105' : ''}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop`;
          }}
        />

        {vehicle.quantity === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center backdrop-blur-sm z-20">
            <span className="bg-red-50 text-red-600 px-6 py-2 rounded-full font-bold tracking-widest uppercase text-sm border border-red-200 shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 relative z-20">
        <div className="flex justify-between items-start mb-5">
          <div>
            <h3 className="text-xl font-serif font-black text-[#202020] tracking-tight group-hover:text-incubyte-teal transition-colors duration-300">
              {vehicle.make} {vehicle.model}
            </h3>
            <div className="flex items-center gap-1.5 text-gray-500 mt-1.5 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              <span>{vehicle.year}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-[#202020] group-hover:text-incubyte-teal transition-colors duration-300">
              ${vehicle.price.toLocaleString()}
            </div>
            <div className={`text-xs mt-1.5 font-bold uppercase tracking-wider ${vehicle.quantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
              {vehicle.quantity} in stock
            </div>
          </div>
        </div>

        {/* Vertical layout ensures long powertrain names are fully visible */}
        <div className="flex flex-col gap-3 mb-6 text-sm">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 transition-colors duration-300">
            <Car className="w-4 h-4 text-incubyte-teal shrink-0" />
            <span className="font-semibold text-gray-700">{vehicle.category}</span>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border border-gray-100 transition-colors duration-300">
            {vehicle.powertrain.includes('Electric') || vehicle.powertrain.includes('PHEV') ? (
              <Zap className="w-4 h-4 text-incubyte-teal shrink-0" />
            ) : (
              <Fuel className="w-4 h-4 text-incubyte-teal shrink-0" />
            )}
            <span className="font-semibold text-gray-700">{vehicle.powertrain}</span>
          </div>
        </div>

        <button 
          onClick={handlePurchase}
          className="w-full relative overflow-hidden bg-gradient-brand font-bold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          disabled={vehicle.quantity === 0 || isPurchasing}
        >
          {isPurchasing ? (
            <Loader2 className="w-4 h-4 animate-spin relative z-10" />
          ) : (
            <Tag className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300 relative z-10" />
          )}
          
          <span className="relative z-10 tracking-wide">
            {isPurchasing 
              ? 'Processing...' 
              : (vehicle.quantity > 0 ? 'Purchase Vehicle' : 'Unavailable')}
          </span>
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;
