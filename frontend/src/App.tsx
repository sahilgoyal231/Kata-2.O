import { Route, Switch } from 'wouter';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-cyan-500/30">
      <nav className="fixed w-full top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-white text-lg">K</span>
            </div>
            <span className="text-gradient">Kata Motors</span>
          </a>
          <div className="flex items-center gap-6">
            <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </a>
            <a href="/register" className="text-sm font-medium bg-gradient-brand px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Switch>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
