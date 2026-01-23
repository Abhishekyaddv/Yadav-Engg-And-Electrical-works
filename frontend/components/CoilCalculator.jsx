"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Wrench, AlertCircle, ChevronDown, Check } from 'lucide-react';

export default function CoilCalculator() {
  const [formData, setFormData] = useState({
    coilType: 'New',
    size: '',     
    numHoles: 1,
    labourCharge: 0,
    travelCharge: 0
  });

  const [availableSizes, setAvailableSizes] = useState([]);
  const [allCoils, setAllCoils] = useState([]); 
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 1. FETCH INVENTORY ON LOAD
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/coils');
        const data = await res.json();
        setAllCoils(data);
      } catch (e) {
        console.error("Failed to load inventory");
      }
    };
    fetchInventory();
  }, []);

  // 2. UPDATE DROPDOWN WHEN TYPE CHANGES
  useEffect(() => {
    if (allCoils.length === 0) return;

    const filteredSizes = allCoils
      .filter((item) => item.type === formData.coilType)
      .map((item) => item.size);

    setAvailableSizes(filteredSizes);

    // Auto-select first option if current is invalid
    if (!filteredSizes.includes(formData.size)) {
      setFormData(prev => ({ ...prev, size: filteredSizes[0] || '' }));
    }
  }, [formData.coilType, allCoils]);

  // 3. CALCULATE PRICE
  const calculateTotal = async () => {
    if (!formData.size) return; 

    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();

      if (!response.ok) {
        setResult(null);
        setError(data.error || "Calculation failed");
      } else {
        setError(null);
        setResult(data);
      }
    } catch (err) {
      setError("Cannot connect to server.");
    }
  };

  useEffect(() => { calculateTotal(); }, [formData]);

  // 4. WHATSAPP HANDLER
  const openWhatsApp = () => {
    const phoneNumber = "919958764445"; // Your Business Number
    const text = `Hello, I have a query regarding:\n\nType: ${formData.coilType}\nSize: ${formData.size}\nQty: ${formData.numHoles}\n\nPlease help me with the details.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-950 px-8 py-6 border-b border-slate-800 flex items-center gap-3">
        <div className="p-2 bg-blue-600/20 rounded-lg">
           <Settings className="text-blue-500 w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Rapid Cost Estimator</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-0">
        {/* COLUMN 1: CONTROLS */}
        <div className="p-8 space-y-8">
          
          {/* 1. COMPONENT CONDITION TOGGLE */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Component Condition</label>
            <div className="grid grid-cols-2 gap-4 p-1 bg-slate-800 rounded-xl border border-slate-700/50">
              {['New', 'Recoil'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, coilType: type})}
                  className={`py-3 rounded-lg text-sm font-bold transition-all ${
                    formData.coilType === type 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. APPLE-STYLE DROPDOWN (Modern Glass UI) */}
          <div className="relative z-20">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Thread Specification</label>
            
            {/* Trigger Button */}
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between p-4 rounded-xl outline-none transition-all duration-200 ease-out group 
                ${isDropdownOpen 
                  ? 'bg-slate-800 ring-2 ring-blue-500/30 border-blue-500/50' 
                  : 'bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/60 hover:border-slate-600 shadow-sm active:scale-[0.98]'
                }`}
            >
              <span className={`font-mono text-lg ${!formData.size ? 'text-slate-500' : 'text-white'}`}>
                {formData.size || "Select Size"}
              </span>
              <div className={`p-1 rounded-full transition-all duration-300 ${isDropdownOpen ? 'bg-blue-500 text-white rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                <ChevronDown size={16} strokeWidth={3} />
              </div>
            </button>

            {/* Floating Glass Menu */}
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10 cursor-default" onClick={() => setIsDropdownOpen(false)}></div>
                
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden p-1 animate-in fade-in zoom-in-95 duration-100 origin-top">
                  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {availableSizes.length > 0 ? (
                      availableSizes.map((s) => (
                        <button 
                          key={s}
                          onClick={() => {
                            setFormData({ ...formData, size: s });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg mb-0.5 flex items-center justify-between transition-colors duration-150
                            ${formData.size === s 
                              ? 'bg-blue-600 text-white shadow-md' 
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          <span className="font-mono font-medium pl-2">{s}</span>
                          {formData.size === s && <Check size={16} strokeWidth={3} className="mr-2" />}
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-slate-500 text-center text-sm font-medium">No sizes available</div>
                    )}
                  </div>
                </div>
              </>
            )}
            
            {availableSizes.length === 0 && allCoils.length > 0 && (
                <p className="text-red-400 text-xs mt-2 pl-1 font-medium flex items-center gap-1">
                  <AlertCircle size={12} /> Unavailable for {formData.coilType}
                </p>
            )}
          </div>

          {/* 3. QUANTITY INPUT */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Quantity (Holes)</label>
            <div className="relative group">
                <input 
                  type="number" 
                  min="1"
                  max="1000"
                  value={formData.numHoles}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") {
                      setFormData({ ...formData, numHoles: "" });
                      return;
                    }
                    let num = parseInt(val);
                    if (num > 1000) num = 1000;
                    setFormData({ ...formData, numHoles: num });
                  }}
                  className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono text-lg placeholder:text-slate-600"
                  placeholder="0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold bg-slate-800 pl-2 group-focus-within:text-blue-500">UNITS</span>
            </div>
          </div>

          {/* 4. WHATSAPP BUTTON (NEW) */}
          <div className="pt-2">
            <button 
                onClick={openWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20b857] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-green-900/20 active:scale-95 group"
            >
                {/* SVG for WhatsApp Logo */}
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="transition-transform group-hover:scale-110">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask Query on WhatsApp
            </button>
            <p className="text-center text-[10px] text-slate-500 mt-2">
                Opens WhatsApp with your current selection pre-filled.
            </p>
          </div>

        </div>

        {/* COLUMN 2: LIVE BREAKDOWN */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 border-l border-slate-800 relative flex flex-col justify-between min-h-[450px]">
          
          <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Wrench size={120} />
          </div>
          
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="bg-red-500/10 p-4 rounded-full">
                   <AlertCircle className="text-red-500 w-8 h-8" />
                </div>
                <h3 className="text-white font-bold text-lg">Size Unavailable</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                    The size <strong>{formData.size}</strong> is not currently in the database for {formData.coilType} items.
                </p>
            </div>
          ) : result && result.calculation ? (
            <>
                <div className="relative z-10">
                    <h3 className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        Live Quote Generated
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-800/80">
                            <span className="text-slate-400 text-sm">Unit Price</span>
                            <span className="font-mono text-blue-400 font-bold">₹{result.column3_UnitPrice}</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-slate-800/80">
                            <span className="text-slate-400 text-sm">Material Cost ({result.calculation.holes} units)</span>
                            <span className="font-mono text-white">₹{result.calculation.baseCost}</span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                            <span className="text-slate-400 text-sm">Service & Labour</span>
                            <span className="font-mono text-white">₹{result.calculation.additionalCharges}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 relative z-10">
                    <div className="bg-slate-800/40 rounded-xl p-3 mb-6 border border-slate-700/50 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-slate-400 leading-relaxed">
                                <strong className="text-slate-300 block mb-1">Outstation Policy</strong>
                                Base price valid for <span className="text-white">Delhi NCR</span>. For outstation projects, additional Travel & Accommodation charges apply.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t border-slate-800 pt-6">
                        <span className="text-slate-400 text-sm font-medium">Estimated Total</span>
                        <span className="text-4xl font-black text-white tracking-tight">
                        <span className="text-xl text-slate-600 font-normal mr-1">₹</span>
                        {result.calculation.grandTotal.toLocaleString()}
                        </span>
                    </div>
                </div>
            </>
          ) : (
             <div className="flex flex-col items-center justify-center h-full text-slate-600 space-y-3">
                <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-xs uppercase tracking-widest opacity-50">Calculating...</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}