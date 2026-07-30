import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Plus, Pencil, Trash2, X, Loader2, RefreshCw, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Vehicle } from '../components/VehicleCard';
import api from '../utils/axiosInstance';

const initialFormState = {
  make: '',
  model: '',
  category: '',
  powertrain: 'Electric',
  year: new Date().getFullYear(),
  price: 0,
  quantity: 1,
  imageUrl: '',
  description: '',
  horsepower: '',
  zeroToSixty: '',
  topSpeed: ''
};

const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(initialFormState);
  const [_, setLocation] = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      toast.error('Access Denied. Admin privileges required.');
      setLocation('/dashboard');
      return;
    }
    fetchVehicles();
  }, [setLocation]);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/vehicles');
      const data = response.data;
      
      setVehicles(Array.isArray(data) ? data : []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout failed on backend', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Admin session terminated securely');
    window.dispatchEvent(new Event('auth-change'));
    setLocation('/');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      await api.delete(`/api/vehicles/${id}`);
      
      toast.success('Vehicle deleted successfully');
      setVehicles(vehicles.filter(v => v._id !== id));
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    }
  };

  const handleRestock = async (id: string) => {
    try {
      await api.post(`/api/vehicles/${id}/restock`);
      toast.success('Restock successful (+1)');
      fetchVehicles();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingId(vehicle._id);
    setFormData({ ...vehicle });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = editingId ? `/api/vehicles/${editingId}` : '/api/vehicles';
      
      if (editingId) {
        await api.put(url, formData);
      } else {
        await api.post(url, formData);
      }

      toast.success(`Vehicle ${editingId ? 'updated' : 'added'} successfully!`);
      setIsModalOpen(false);
      fetchVehicles(); // Refresh the list
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-28 pb-12 px-6 overflow-hidden ">

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-serif font-black mb-2 text-[#202020]">Dealership Admin</h1>
            <p className="text-gray-500 font-medium">Manage vehicle inventory, stock, and pricing.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={fetchVehicles} 
              className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 hover:text-incubyte-teal shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gradient-brand px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(1,77,67,0.2)] hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Add Vehicle
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-bold transition-all border border-red-200 shadow-sm"
              title="Secure Logout"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="glass-card overflow-x-auto border-white/50">
          {isLoading ? (
            <div className="p-12 flex justify-center items-center text-incubyte-teal">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : (
            <table className="w-full min-w-[800px] text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Vehicle</th>
                  <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wide hidden md:table-cell">Category</th>
                  <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Price</th>
                  <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wide">Stock</th>
                  <th className="p-5 text-sm font-bold text-gray-600 uppercase tracking-wide text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <img src={v.imageUrl} alt={v.model} className="w-16 h-12 object-cover rounded-md border border-gray-200" />
                        <div>
                          <div className="font-bold text-[#202020] font-serif text-lg leading-tight">{v.make} {v.model}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">{v.year} • {v.powertrain}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-gray-600 font-medium hidden md:table-cell">{v.category}</td>
                    <td className="p-5 font-bold text-incubyte-teal">${v.price.toLocaleString()}</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${v.quantity > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {v.quantity > 0 ? `${v.quantity} Available` : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleRestock(v._id)} title="Restock (+1)" className="p-2 bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-600 rounded-lg transition-colors border border-transparent">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                        <button onClick={() => handleEdit(v)} title="Edit" className="p-2 bg-gray-100 hover:bg-incubyte-teal hover:text-white text-gray-500 rounded-lg transition-colors border border-transparent">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(v._id)} title="Delete" className="p-2 bg-gray-100 hover:bg-red-500 hover:text-white text-gray-500 rounded-lg transition-colors border border-transparent">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {vehicles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">No vehicles found in database.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95">
            <div className="sticky top-0 bg-white/90 backdrop-blur-md p-6 border-b border-gray-100 flex justify-between items-center z-10">
              <h2 className="text-2xl font-serif font-bold text-[#202020]">{editingId ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#202020] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Make</label><input required type="text" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Model</label><input required type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Category</label><input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Powertrain</label><input required type="text" value={formData.powertrain} onChange={e => setFormData({...formData, powertrain: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Price ($)</label><input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-incubyte-teal font-bold focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Quantity in Stock</label><input required type="number" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Year</label><input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: Number(e.target.value)})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Image URL</label><input required type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                
                {/* Performance Stats */}
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Horsepower</label><input type="text" value={formData.horsepower} onChange={e => setFormData({...formData, horsepower: e.target.value})} placeholder="e.g. 500 HP" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">0-60 MPH Time</label><input type="text" value={formData.zeroToSixty} onChange={e => setFormData({...formData, zeroToSixty: e.target.value})} placeholder="e.g. 3.2s" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Top Speed</label><input type="text" value={formData.topSpeed} onChange={e => setFormData({...formData, topSpeed: e.target.value})} placeholder="e.g. 190 mph" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Description</label><textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[#202020] focus:border-incubyte-teal focus:outline-none"></textarea></div>
              </div>
              
              <div className="flex justify-end gap-4 border-t border-gray-100 pt-6 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-[#202020] hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-gradient-brand px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:-translate-y-0.5 disabled:opacity-50">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                  {editingId ? 'Save Changes' : 'Create Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
