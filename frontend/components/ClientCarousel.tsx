"use client";
import React from 'react';
import Marquee from "react-fast-marquee";
import { Briefcase } from 'lucide-react';

const companies = [
  "Tata Steel", "Jindal Power", "Reliance Industries", "L&T Heavy Engineering",
  "Mahindra Defence", "BHEL", "Adani Ports", "Siemens India", "Maruti Suzuki"
];

export default function ClientCarousel() {
  return (
    <div className="bg-slate-950 py-10 border-y border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-6 mb-8 text-center">
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
          Trusted by Industry Leaders
        </p>
      </div>

      {/* gradient={true} -> Adds the fade effect on sides automatically
         gradientColor="2, 6, 23" -> Matches your bg-slate-950 background
         speed={50} -> Controls how fast it moves
      */}
      <Marquee gradient={true} gradientColor="2, 6, 23" speed={50} autoFill={true}>
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 text-slate-400 font-bold text-xl mx-8 hover:text-white transition-colors cursor-pointer"
          >
            <Briefcase size={24} className="text-blue-600 shrink-0" />
            <span>{company}</span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}