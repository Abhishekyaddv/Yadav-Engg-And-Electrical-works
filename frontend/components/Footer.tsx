import React from 'react';
import { MapPin, Mail, Phone, Facebook, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* COL 1: COMPANY INFO */}
          <div className="space-y-6">
            <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-white tracking-tight">YADAV ENGINEERING</span>
                <span className="text-sm text-blue-500 font-bold tracking-widest">AND ELECTRICAL WORKS</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Premium industrial repair services specializing in coil refurbishment and thread recovery for heavy machinery.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: SERVICES */}
          <div>
            <h4 className="text-white font-bold mb-6">Our Expertise</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              {['Thread Repair', 'Coil Refurbishment', 'On-Site Machining', 'Heavy Fabrication', 'Hydraulic Systems'].map(item => (
                <li key={item} className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition-colors">
                  <ArrowRight size={14} className="text-blue-600" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3: QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              {/* <li><a href="/admin" className="hover:text-white transition-colors">Admin Portal</a></li> */}
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* COL 4: CONTACT */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-blue-500 shrink-0" size={20} />
                <span className="text-slate-400">
                  Near Peppers Pizza,<br />
                  Petrol-pump road,<br />
                  Surajpur, Greater Noida,<br />
                  Uttar Pradesh - 201306
                </span>
              </li>
             <li className="flex gap-3 items-center">
            <Phone className="text-blue-500 shrink-0" size={20} />
            <a 
              href="tel:+919958764445" 
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              +91 9958764445
            </a>
          </li>
          
          <li className="flex gap-3 items-center">
            <Mail className="text-blue-500 shrink-0" size={20} />
            <a 
              href="mailto:contact@engg-solutions.com" 
              className="text-slate-400 hover:text-blue-400 transition-colors"
            >
              deveshdayalyadav@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            &copy; Yadav Engineering And Electrical Works. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            System Operational
          </p>
        </div>
      </div>
    </footer>
  );
}