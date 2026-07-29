import { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'wouter';
import { Toaster } from 'react-hot-toast';
import { User } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

function App() {
  const [token, setToken] = useState(typeof window !== 'undefined' ? localStorage.getItem('token') : null);
  const [role, setRole] = useState(typeof window !== 'undefined' ? localStorage.getItem('role') : null);

  useEffect(() => {
    const handleAuthChange = () => {
      setToken(localStorage.getItem('token'));
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const isLoggedIn = !!token;
  const isAdmin = role === 'admin';



  return (
    <div className="min-h-screen bg-[#E8F3F1] bg-dot-pattern text-[#202020] font-sans selection:bg-incubyte-teal/30 relative overflow-hidden">
      
      {/* Global Animated Floating Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-incubyte-teal/40 rounded-full blur-[80px] pointer-events-none animate-float-slow z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-emerald-500/40 rounded-full blur-[80px] pointer-events-none animate-float-slower z-0" />

      <Toaster position="top-right" toastOptions={{ className: 'bg-white border border-gray-200 text-[#202020] text-sm font-bold shadow-lg' }} />
      <div className="fixed w-full z-50 top-6 px-4 flex justify-center pointer-events-none transition-all duration-300">
        <nav className="bg-white w-full max-w-6xl px-6 py-3 flex justify-between items-center rounded-full pointer-events-auto border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_0_15px_rgba(1,77,67,0.2)]">
                <img src="/logo.png" alt="KataMD Logo" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-2xl font-serif font-black tracking-tighter text-[#202020]">Kata<span className="text-gradient">MD</span></span>
            </a>
          </Link>
          <div className="flex items-center gap-6">
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <a className="text-sm font-bold text-gray-600 hover:text-incubyte-teal transition-colors">Sign In</a>
                </Link>
                <Link href="/register">
                  <a className="text-sm font-bold bg-gradient-brand px-6 py-2.5 rounded-full transition-all">Get Started</a>
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard">
                  <a className="text-sm font-bold text-gray-600 hover:text-incubyte-teal transition-colors">Dashboard</a>
                </Link>
                {isAdmin && (
                  <Link href="/admin">
                    <a className="text-sm font-bold bg-incubyte-teal/10 text-incubyte-teal px-5 py-2.5 rounded-full hover:bg-incubyte-teal/20 transition-all flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-incubyte-teal animate-pulse" />
                      Admin Portal
                    </a>
                  </Link>
                )}
                <Link href="/profile">
                  <a className="text-sm font-bold text-gray-600 hover:text-incubyte-teal transition-colors flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:border-incubyte-teal transition-colors">
                      <User className="w-4 h-4 text-incubyte-teal" />
                    </div>
                    Profile
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      <main>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
