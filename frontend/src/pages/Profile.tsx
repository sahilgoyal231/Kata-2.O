import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { LogOut, User as UserIcon, Calendar, DollarSign, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Purchase {
  _id: string;
  vehicleId: string;
  make: string;
  model: string;
  price: number;
  imageUrl: string;
  purchaseDate: string;
}

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  purchaseHistory: Purchase[];
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLocation('/login');
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
      setProfile(data);
    } catch (err: any) {
      toast.error(err.message);
      if (err.message === 'Unauthorized') {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Successfully logged out');
    window.dispatchEvent(new Event('auth-change'));
    setLocation('/');
  };

  return (
    <div className="min-h-screen relative pt-28 pb-12 px-6 overflow-hidden ">

      <div className="max-w-4xl mx-auto relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-incubyte-teal animate-spin" />
          </div>
        ) : profile ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Header & User Info */}
            <div className="glass-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(1,77,67,0.06)]">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-md overflow-hidden border border-incubyte-teal/30">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={`${profile.name}'s Avatar`} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-serif font-black text-[#202020] mb-1">{profile.name}</h1>
                  <p className="text-gray-500 font-medium">{profile.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-incubyte-teal border border-gray-200 text-xs font-bold rounded-full uppercase tracking-wider">
                    {profile.role} Account
                  </span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all border border-red-200 shadow-sm"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>

            {/* Purchase History */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#202020] mb-6 flex items-center gap-2">
                <DollarSign className="text-incubyte-teal" />
                Purchase History
              </h2>
              
              {profile.purchaseHistory && profile.purchaseHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profile.purchaseHistory.map((purchase, idx) => (
                    <div key={idx} className="glass-card overflow-hidden rounded-2xl border border-white/50 hover:border-incubyte-teal/40 hover:shadow-[0_12px_40px_rgba(1,77,67,0.12)] transition-all group">
                      <div className="h-40 overflow-hidden relative border-b border-gray-100">
                        <img 
                          src={purchase.imageUrl} 
                          alt={purchase.model} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <div className="text-xl font-serif font-black text-white tracking-tight">{purchase.make} {purchase.model}</div>
                        </div>
                      </div>
                      <div className="p-5 bg-white/40 backdrop-blur-md">
                        <div className="flex justify-between items-center">
                          <div className="text-incubyte-teal font-bold text-lg">
                            ${purchase.price.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                            <Calendar className="w-4 h-4" />
                            {new Date(purchase.purchaseDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-12 text-center border border-white/50 rounded-3xl">
                  <p className="text-gray-500 text-lg">You haven't made any purchases yet.</p>
                  <button 
                    onClick={() => setLocation('/dashboard')}
                    className="mt-6 px-8 py-3 bg-gradient-brand text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5"
                  >
                    Browse Vehicles
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
