import { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useLocation } from 'wouter';
import toast from 'react-hot-toast';
import api from '../utils/axiosInstance';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/api/auth/register', { name, email, password });
      
      const data = response.data;

      localStorage.setItem('token', (data as any).token);
      if ((data as any).user?.role) {
        localStorage.setItem('role', (data as any).user.role);
      }
      toast.success('Account created successfully!');
      window.dispatchEvent(new Event('auth-change'));
      if ((data as any).user?.role === 'admin') {
        setLocation('/admin');
      } else {
        setLocation('/dashboard');
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden ">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2000&auto=format&fit=crop" 
          alt="Register Background" 
          className="w-full h-full object-cover opacity-10 mix-blend-normal"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-[#E8F3F1]/90 to-[#E8F3F1]/30" />
      </div>


      <div className="relative z-10 w-full max-w-md px-6">
        <div className="glass-card p-10 shadow-[0_8px_32px_rgba(1,77,67,0.08)] animate-fade-in-up">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif font-black mb-2 text-[#202020]">Join KataMD</h2>
            <p className="text-gray-500">Create your dealership account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-incubyte-teal focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-incubyte-teal focus:border-transparent transition-all"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-[#202020] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-incubyte-teal focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-brand text-white px-6 py-4 rounded-xl font-bold text-lg transition-all group mt-6 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:-translate-y-0.5"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-bold text-incubyte-teal hover:text-incubyte-dark transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
