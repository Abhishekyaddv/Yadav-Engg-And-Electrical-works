"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Wrench, AlertCircle, ChevronDown, Check } from 'lucide-react';
import { COIL_DATA } from '@/data/coilPrices'; 

export default function CoilCalculator() {
  // --- STATE ---
  const [formData, setFormData] = useState({
    coilType: 'New', 
    size: '',        
    numHoles: 1,     
  });

  const [availableSizes, setAvailableSizes] = useState([]);
  const [result, setResult] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // --- 1. AUTO-UPDATE DROPDOWN ---
  useEffect(() => {
    const filtered = COIL_DATA
      .filter((item) => item.type === formData.coilType)
      .map((item) => item.size);

    setAvailableSizes(filtered);

    if (!filtered.includes(formData.size)) {
      setFormData(prev => ({ ...prev, size: filtered[0] || '' }));
    }
  }, [formData.coilType]);

  // --- 2. CALCULATE PRICE ---
  useEffect(() => {
    if (!formData.size) {
      setResult(null);
      return;
    }

    const selectedItem = COIL_DATA.find(
      (item) => item.type === formData.coilType && item.size === formData.size
    );

    if (!selectedItem) {
      setResult(null);
      return;
    }

    const unitPrice = selectedItem.unitPrice;
    // Handle empty or invalid input as 0
    const qty = formData.numHoles === "" ? 0 : formData.numHoles; 
    
    const baseCost = unitPrice * qty;
    const grandTotal = baseCost;

    setResult({ unitPrice, baseCost, grandTotal });
  }, [formData]);

  // --- 3. WHATSAPP HANDLER ---
  const openWhatsApp = () => {
    const phoneNumber = "919958764445"; 
    const text = `*New Query* %0A%0A*Type:* ${formData.coilType} %0A*Size:* ${formData.size} %0A*Qty:* ${formData.numHoles} %0A*Price:* ₹${result?.grandTotal?.toLocaleString() || 'N/A'}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  // --- RENDER ---
  return (
    <div className="w-full max-w-5xl mx-auto bg-neutral-900 text-neutral-200 rounded-3xl shadow-2xl border border-neutral-800 overflow-hidden font-sans">
      
      {/* HEADER: Darker Industrial Look */}
      <div className="bg-neutral-950 px-8 py-6 border-b border-orange-500/20 flex items-center gap-3">
        <div className="p-2 bg-orange-600/20 rounded-lg">
           <Settings className="text-orange-500 w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">Rapid Cost Estimator</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        
        {/* LEFT COLUMN */}
        <div className="p-8 space-y-8 bg-neutral-900">
          
          {/* TOGGLE: Industrial Orange Active State */}
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 block">Component Condition</label>
            <div className="grid grid-cols-2 gap-4 p-1 bg-neutral-800 rounded-xl border border-neutral-700">
              {['New', 'Recoil'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, coilType: type})}
                  className={`py-3 rounded-lg text-sm font-bold transition-all ${
                    formData.coilType === type 
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/40' // Orange Active
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* DROPDOWN */}
          <div className="relative z-20">
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 block">Thread Specification</label>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between p-4 rounded-xl outline-none transition-all duration-200 ease-out group 
                ${isDropdownOpen 
                  ? 'bg-neutral-800 ring-2 ring-orange-500/50 border-orange-500' 
                  : 'bg-neutral-800 border border-neutral-700 hover:border-orange-500/50 shadow-sm'
                }`}
            >
              <span className={`font-mono text-lg ${!formData.size ? 'text-neutral-500' : 'text-white'}`}>
                {formData.size || "Select Size"}
              </span>
              <div className={`p-1 rounded-full transition-all duration-300 ${isDropdownOpen ? 'bg-orange-500 text-white rotate-180' : 'bg-neutral-700 text-neutral-400'}`}>
                <ChevronDown size={16} strokeWidth={3} />
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsDropdownOpen(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 border border-orange-500/30 rounded-xl shadow-2xl z-20 overflow-hidden p-1 animate-in fade-in zoom-in-95 origin-top">
                  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700">
                    {availableSizes.map((s) => (
                      <button 
                        key={s}
                        onClick={() => { setFormData({ ...formData, size: s }); setIsDropdownOpen(false); }}
                        className={`w-full text-left p-3 rounded-lg mb-0.5 flex items-center justify-between transition-colors
                          ${formData.size === s 
                            ? 'bg-orange-600 text-white' 
                            : 'text-neutral-300 hover:bg-neutral-800 hover:text-orange-400'
                          }`}
                      >
                        <span className="font-mono font-medium pl-2">{s}</span>
                        {formData.size === s && <Check size={16} strokeWidth={3} className="mr-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* INPUT: Quantity */}
          <div>
            <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 block">Quantity (Holes)</label>
            <div className="relative group">
                <input 
                  type="number" 
                  min="1"
                  max="1000"
                  value={formData.numHoles}
                  onChange={(e) => {
                    const val = e.target.value;
                    // Properly handle empty string to allow backspacing
                    setFormData({ ...formData, numHoles: val === "" ? "" : Number(val) });
                  }}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-4 rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-mono text-lg placeholder:text-neutral-600"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-bold bg-neutral-800 pl-2">UNITS</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RESULT + ACTION */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 border-l border-neutral-700 relative flex flex-col justify-between min-h-[450px]">
          
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Wrench size={120} />
          </div>
          
          <div className="flex-1">
            {result ? (
              <>
                  <div className="relative z-10">
                      <h3 className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                          Live Quote
                      </h3>
                      
                      <div className="space-y-4">
                          <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                              <span className="text-neutral-400 text-sm">Unit Price ({formData.size})</span>
                              <span className="font-mono text-orange-400 font-bold">₹{result.unitPrice}</span>
                          </div>
                          
                          <div className="flex justify-between items-center py-3 border-b border-neutral-700">
                              <span className="text-neutral-400 text-sm">Material Cost ({formData.numHoles || 0})</span>
                              <span className="font-mono text-white">₹{result.baseCost.toLocaleString()}</span>
                          </div>

                          <div className="flex justify-between items-center py-3">
                              {/* <span className="text-neutral-400 text-sm">Service & Labour</span>
                              <span className="font-mono text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">INCLUDED</span> */}
                          </div>
                      </div>
                  </div>

                  <div className="mt-8 relative z-10">
                      <div className="bg-neutral-950/50 rounded-xl p-3 mb-6 border border-neutral-700/50">
                          <div className="flex items-start gap-3">
                              <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                              <p className="text-xs text-neutral-400 leading-relaxed">
                                  <strong className="text-white block mb-1">Outstation Policy</strong>
                                  Base price valid for Delhi NCR. Extra charges apply for outstation travel.
                              </p>
                          </div>
                      </div>

                      <div className="flex justify-between items-end border-t border-neutral-700 pt-6 mb-6">
                          <span className="text-neutral-400 text-sm font-medium">Estimated Total</span>
                          <span className="text-4xl font-black text-white tracking-tight">
                          <span className="text-xl text-neutral-500 font-normal mr-1">₹</span>
                          {result.grandTotal.toLocaleString()}
                          </span>
                      </div>
                  </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-neutral-600 space-y-3">
                  <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                  <span className="text-xs uppercase tracking-widest opacity-50">Select Size</span>
              </div>
            )}
          </div>

          {/* WHATSAPP BUTTON */}
          <div className="pt-2 z-20 relative">
            <button 
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20b857] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-green-900/20 active:scale-95 group"
            >
                {/* Simplified SVG Icon */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="transition-transform group-hover:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {result ? 'Proceed to Book on WhatsApp' : 'Ask Query on WhatsApp'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}