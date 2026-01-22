import CoilCalculator from '../../components/CoilCalculator';
import ClientCarousel from '../../components/ClientCarousel';  // <-- Import 1
import FounderSection from '../../components/FounderSection';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for Delhi NCR & Pan-India
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Precision Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Simplified.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Leading industrial repair services. We specialize in coil refurbishment, 
            thread repair, and custom mechanical solutions. Fast, reliable, and precise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors">
              Get Instant Quote <ArrowRight size={20} />
            </a>
            <button className="px-8 py-4 rounded-full border border-slate-700 text-white font-medium hover:bg-slate-900 transition-colors">
              View Our Services
            </button>
          </div>
        </div>
      </section>

      {/* 2. CLIENT CAROUSEL (NEW) */}
      <ClientCarousel />

      {/* 2. SERVICES GRID */}
      <section className="py-20 bg-slate-900/50 border-y border-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Thread Repair", desc: "Expert recovery of damaged threads using high-grade coils." },
              { title: "On-Site Service", desc: "Our team travels to your factory for heavy machinery fixes." },
              { title: "Custom Fabrication", desc: "Tailored engineering solutions for unique industrial needs." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 transition-colors group">
                <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                  <CheckCircle2 className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FOUNDER SECTION (NEW) */}
      <FounderSection />      

      {/* 3. CALCULATOR SECTION */}
      <section id="calculator" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing Engine</h2>
            <p className="text-slate-400">Calculate your repair costs instantly based on industry standard rates.</p>
          </div>
          
          {/* THE CALCULATOR COMPONENT */}
          <CoilCalculator />

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
             <div className="flex items-center gap-2">
                <MapPin size={16} /> Serving Delhi NCR
             </div>
             <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
             <div>ISO 9001:2015 Certified Standards</div>
             <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
             <div>24/7 Support Available</div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      {/* <footer className="py-12 border-t border-slate-900 text-center text-slate-600">
        <p>&copy; 2026 Engineering Solutions. All rights reserved.</p>
      </footer> */}
    </main>
  );
}