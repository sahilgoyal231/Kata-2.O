import { ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="pt-20 relative ">

      {/* Hero Section with Web Image Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop" 
            alt="Luxury Car Showcase" 
            className="w-full h-full object-cover opacity-20 mix-blend-normal"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#E8F3F1]/90 to-[#E8F3F1]/30" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white shadow-sm border border-gray-200 mb-8">
            <span className="text-sm font-semibold tracking-wider uppercase text-incubyte-teal">The New Standard in Automotive Retail</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight mb-8 text-[#202020]">
            Drive the <br/>
            <span className="text-gradient">Future Forward</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            KataMD is the world's most advanced dealership platform. Whether you are searching for an eco-friendly sedan, a powerful coupe, or a rugged SUV, our smart inventory system provides real-time stock updates, secure instant purchasing, and exclusive dealership-level access for our partners.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register" className="group flex items-center gap-2 bg-gradient-brand px-8 py-4 rounded-full font-bold text-lg transition-all">
              Join the Platform
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/login" className="px-8 py-4 rounded-full font-bold text-lg border border-incubyte-teal text-incubyte-teal hover:bg-incubyte-teal/5 bg-white transition-colors">
              Access Dealer Portal
            </a>
          </div>
        </div>
      </section>

      {/* Features Section using Web Images as Icons/Visuals */}
      <section className="py-24 relative z-10 border-t border-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 text-[#202020]">Why Choose <span className="text-incubyte-teal">KataMD?</span></h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">We combine cutting-edge technology with automotive excellence to deliver a seamless buying and inventory management experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2000&auto=format&fit=crop" 
                  alt="Verified Inventory" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="p-8 bg-white/40 backdrop-blur-md border-t border-white/50 h-full">
                <h3 className="text-xl font-serif font-bold mb-3 text-[#202020]">Live Inventory Sync</h3>
                <p className="text-gray-600 leading-relaxed">Our backend system connects directly to the warehouse. When you purchase a vehicle, stock levels are instantly updated globally, ensuring you never double-book a car.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Instant Purchase" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="p-8 bg-white/40 backdrop-blur-md border-t border-white/50 h-full">
                <h3 className="text-xl font-serif font-bold mb-3 text-[#202020]">Secure Digital Purchasing</h3>
                <p className="text-gray-600 leading-relaxed">With JWT-secured authentication and role-based access control, your transactions are completely safe. Buy your dream car with a single click.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2000&auto=format&fit=crop" 
                  alt="Admin Control" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="p-8 bg-white/40 backdrop-blur-md border-t border-white/50 h-full">
                <h3 className="text-xl font-serif font-bold mb-3 text-[#202020]">Admin Dealership Portal</h3>
                <p className="text-gray-600 leading-relaxed">Dealership administrators have exclusive access to restock vehicles, update prices, and manage the entire fleet through our powerful Admin API.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-incubyte-dark bg-incubyte-teal pt-16 pb-8 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-lg bg-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  <img src="/logo.png" alt="KataMD Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-serif font-black text-white tracking-tighter">KataMD</span>
              </div>
              <p className="text-incubyte-bg/80 max-w-sm leading-relaxed">
                The world's premier digital dealership. Redefining the luxury automotive purchasing experience with seamless technology and instant secure transactions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-serif font-bold mb-4">Platform</h4>
              <ul className="space-y-3 text-incubyte-bg/70">
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Inventory</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Financing</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Trade-In</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Admin API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif font-bold mb-4">Company</h4>
              <ul className="space-y-3 text-incubyte-bg/70">
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors relative inline-block after:content-[''] after:absolute after:w-0 after:h-px after:bg-white after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-incubyte-dark text-center md:text-left text-incubyte-bg/60 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} KataMD. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
