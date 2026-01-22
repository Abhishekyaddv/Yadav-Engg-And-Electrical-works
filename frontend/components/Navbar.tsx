"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wrench, Menu, X, PhoneCall, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Cost Estimator", href: "/#calculator" },
    { name: "Admin Portal", href: "/admin" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-slate-950/90 backdrop-blur-md border-blue-900/30 py-4 shadow-xl shadow-blue-900/10' 
            : 'bg-slate-950 border-transparent py-6' // Changed transparent to bg-slate-950 to force dark mode visibility
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 1. LOGO AREA */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* The Icon Box with HARD GLOW Shadow */}
            <div className="relative bg-blue-600 p-2.5 rounded-xl border border-blue-400/50 transition-transform duration-300 group-hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.6)]">
              <Wrench className="text-white h-5 w-5" />
            </div>
            
            {/* Text Area */}
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black text-white tracking-tighter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                ENGINEERING
              </span>
              <span className="text-[10px] text-blue-400 font-bold tracking-[0.2em] uppercase">
                Solutions
              </span>
            </div>
          </Link>

          {/* 2. DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#3b82f6]"></span>
              </Link>
            ))}
          </div>

          {/* 3. CTA BUTTON */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-3 text-right">
                <div className="bg-slate-900 p-2 rounded-full text-slate-400 border border-slate-800">
                    <PhoneCall size={16} />
                </div>
                <div className="flex flex-col">
                    {/* <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Emergency 24/7</span> */}
                    <span className="text-sm font-mono font-bold text-white tracking-tight">+91 98765 43210</span>
                </div>
            </div>

            <Link 
              href="/#contact"
              className="group relative px-6 py-2.5 bg-white text-slate-950 rounded-full font-bold text-sm overflow-hidden hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow"
            >
              <span className="relative flex items-center gap-2">
                Get Quote <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
              {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* 4. MOBILE MENU */}
      <div className={`fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden transition-transform duration-300 pt-24 px-6 ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
                <Link 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white py-4 border-b border-slate-800 flex justify-between items-center"
                >
                    {link.name}
                    <ChevronRight className="text-blue-500" />
                </Link>
            ))}
             <Link 
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-6 w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-center active:scale-95 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              Get Instant Quote
            </Link>
        </div>
      </div>
    </>
  );
}