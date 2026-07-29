import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with Web Image Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
            alt="Luxury Car Showcase" 
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900" />
        </div>

        {/* Ambient Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass mb-8">
            <span className="text-sm font-semibold tracking-wider uppercase text-cyan-400">The New Standard in Automotive Retail</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
            Drive the <br/>
            <span className="text-gradient">Future Forward</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Kata Motors is the world's most advanced dealership platform. Whether you are searching for an eco-friendly sedan, a powerful coupe, or a rugged SUV, our smart inventory system provides real-time stock updates, secure instant purchasing, and exclusive dealership-level access for our partners.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register" className="group flex items-center gap-2 bg-gradient-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
              Join the Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/login" className="px-8 py-4 rounded-full font-bold text-lg border border-slate-700 hover:bg-slate-800 transition-colors glass">
              Access Dealer Portal
            </a>
          </div>
        </div>
      </section>

      {/* Features Section using Web Images as Icons/Visuals */}
      <section className="py-24 relative z-10 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose <span className="text-cyan-400">Kata Motors?</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We combine cutting-edge technology with automotive excellence to deliver a seamless buying and inventory management experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop" 
                  alt="Verified Inventory" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
              </div>
              <div className="p-8 border-t border-slate-700/50">
                <h3 className="text-xl font-bold mb-3 text-slate-100">Live Inventory Sync</h3>
                <p className="text-slate-400">Our backend system connects directly to the warehouse. When you purchase a vehicle, stock levels are instantly updated globally, ensuring you never double-book a car.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Instant Purchase" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
              </div>
              <div className="p-8 border-t border-slate-700/50">
                <h3 className="text-xl font-bold mb-3 text-slate-100">Secure Digital Purchasing</h3>
                <p className="text-slate-400">With JWT-secured authentication and role-based access control, your transactions are completely safe. Buy your dream car with a single click.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2000&auto=format&fit=crop" 
                  alt="Admin Control" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
              </div>
              <div className="p-8 border-t border-slate-700/50">
                <h3 className="text-xl font-bold mb-3 text-slate-100">Admin Dealership Portal</h3>
                <p className="text-slate-400">Dealership administrators have exclusive access to restock vehicles, update prices, and manage the entire fleet through our powerful Admin API.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
