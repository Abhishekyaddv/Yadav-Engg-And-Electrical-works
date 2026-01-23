import React from 'react';
import { Phone } from 'lucide-react';

const founders = [
  {
    name: "Devesh Yadav",
    role: "Co-Founder & Technical Head",
    exp: "10+",
    phone: "+91 9958764445", // Replace with real number
    bio: "Expert in heavy machinery refurbishment. Devesh leads the technical team ensuring precision in every coil repair.",
    image: "/api/placeholder/400/400" 
  },
  {
    name: "Yamin Khan",
    role: "Co-Founder & Operations Lead",
    exp: "20+",
    phone: "+91 8920835703", // Replace with real number
    bio: "Specialist in industrial logistics and client relations. Yamin ensures your projects are delivered on time, every time.",
    image: "/api/placeholder/400/400" 
  }
];

export default function FounderSection() {
  return (
    <section className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-3">Leadership</h2>
          <h3 className="text-4xl font-black text-white">Meet the Experts</h3>
        </div>

        {/* Founders Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="bg-slate-950 border border-slate-800 rounded-3xl p-8 hover:border-blue-500/50 transition-all group relative overflow-hidden">
              
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -z-10 group-hover:bg-blue-600/10 transition-colors"></div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                
                {/* Image */}
                <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-full border-2 border-slate-700 overflow-hidden shadow-xl">
                    <img 
                      src={founder.image} 
                      alt={founder.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-bold py-1 px-2 rounded-lg border border-slate-900">
                    {founder.exp} Yrs Exp
                  </div>
                </div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1">
                  <h4 className="text-2xl font-bold text-white mb-1">{founder.name}</h4>
                  <p className="text-blue-400 text-sm font-medium mb-3">{founder.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {founder.bio}
                  </p>
                  
                  {/* Clickable Phone Number Button */}
                  <div className="flex justify-center sm:justify-start">
                    <a 
                      href={`tel:${founder.phone.replace(/\s/g, '')}`} 
                      className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:bg-blue-600 hover:border-blue-500 hover:text-white text-slate-300 py-2 px-4 rounded-xl transition-all duration-300 group/btn"
                    >
                      <div className="bg-slate-800 p-1.5 rounded-full group-hover/btn:bg-white/20 transition-colors">
                        <Phone size={14} />
                      </div>
                      <span className="font-mono font-bold text-sm">{founder.phone}</span>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}