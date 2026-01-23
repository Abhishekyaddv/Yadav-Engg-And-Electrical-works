import CoilCalculator from '../../components/CoilCalculator';
import ClientCarousel from '../../components/ClientCarousel';
import FounderSection from '../../components/FounderSection';
import HeroBackground from '../../components/HeroBackground'; 
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 selection:bg-blue-500/30">
      
      {/* 1. HERO SECTION (Updated for Mobile Alignment & Glow) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        
        {/* <--- BACKGROUND COMPONENTS ---> */}
        <HeroBackground />
        
        {/* New Glow Effects for "Attractive" Look */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] opacity-50" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] opacity-50" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Available for Delhi NCR & Pan-India
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
              Precision Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Simplified.
              </span>
            </h1>
            
            {/* Subtitle (Constrained Width) */}
            <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
              Leading industrial repair services. We specialize in coil refurbishment, 
              thread repair, and custom mechanical solutions. Fast, reliable, and precise.
            </p>

            {/* Action Buttons (Stacked on Mobile) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <a href="#calculator" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] group">
                Get Instant Quote 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="https://wa.me/919958764445"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                {/* WhatsApp Icon */}
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CLIENT CAROUSEL */}
      <ClientCarousel />

      {/* 3. SERVICES GRID */}
      <section id="services" className="py-20 bg-slate-900/50 border-y border-slate-900">
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

      {/* 4. FOUNDER SECTION */}
      <FounderSection />

      {/* 5. CALCULATOR SECTION */}
      <section id="calculator" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing Engine</h2>
            <p className="text-slate-400">Calculate your repair costs instantly based on industry standard rates.</p>
          </div>
          
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

    </main>
  );
}