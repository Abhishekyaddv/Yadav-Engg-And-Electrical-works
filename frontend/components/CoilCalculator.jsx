"use client";
import React, { useState, useEffect } from 'react';
import { Settings, Wrench, AlertCircle } from 'lucide-react';

export default function CoilCalculator() {
  const [formData, setFormData] = useState({
    coilType: 'New',
    size: '',     
    numHoles: 1,
    labourCharge: 0,
    travelCharge: 0
  });

  // REMOVED TYPES HERE to fix the crash
  const [availableSizes, setAvailableSizes] = useState([]);
  const [allCoils, setAllCoils] = useState([]); 
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

    // REMOVED TYPES HERE to fix the crash
    const filteredSizes = allCoils
      .filter((item) => item.type === formData.coilType)
      .map((item) => item.size);

    setAvailableSizes(filteredSizes);

    // Auto-select the first size if the current one isn't valid
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
          <div>
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Component Condition</label>
            <div className="grid grid-cols-2 gap-4 p-1 bg-slate-800 rounded-xl">
              {['New', 'Recoil'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({...formData, coilType: type})}
                  className={`py-3 rounded-lg text-sm font-bold transition-all ${
                    formData.coilType === type 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Thread Specification</label>
            <div className="relative">
              <select 
                className="w-full appearance-none bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-colors"
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                value={formData.size}
              >
                {availableSizes.length > 0 ? (
                  availableSizes.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))
                ) : (
                  <option>Loading sizes...</option>
                )}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">▼</div>
            </div>
            {availableSizes.length === 0 && allCoils.length > 0 && (
                <p className="text-red-400 text-xs mt-2">No sizes found for {formData.coilType} condition.</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Quantity (Holes)</label>
            <div className="relative">
               <input 
  type="number" 
  min="1"
  max="1000"
  value={formData.numHoles}
  onChange={(e) => {
    const val = e.target.value;

    // 1. Handle Empty Field (Fixes the "starting from zero" issue)
    if (val === "") {
      setFormData({ ...formData, numHoles: "" });
      return;
    }

    // 2. Parse the number
    let num = parseInt(val);

    // 3. Enforce Max Limit (Fixes the "limit 1000" issue)
    if (num > 1000) num = 1000;
    
    // 4. Update State
    setFormData({ ...formData, numHoles: num });
  }}
  className="w-full bg-slate-800 border border-slate-700 text-white p-4 rounded-xl outline-none focus:border-blue-500 transition-colors font-mono text-lg"
/>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">UNITS</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: LIVE BREAKDOWN */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-8 border-l border-slate-800 relative flex flex-col justify-between min-h-[400px]">
          
          <div className="absolute top-0 right-0 p-6 opacity-5">
              <Wrench size={120} />
          </div>
          
          {error ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <AlertCircle className="text-red-500 w-12 h-12 mb-2" />
                <h3 className="text-red-400 font-bold text-lg">Configuration Not Found</h3>
                <p className="text-slate-500 text-sm max-w-xs">
                    The size <strong>{formData.size}</strong> is not available in the database for {formData.coilType} components.
                </p>
            </div>
          ) : result && result.calculation ? (
            <>
                <div>
                    <h3 className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        Live Quote Generated
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-slate-800">
                        <span className="text-slate-300">{result.column1_Type} Coils ({result.column2_Size})</span>
                        <span className="font-mono text-blue-400">₹{result.column3_UnitPrice} / unit</span>
                        </div>
                        
                        <div className="flex justify-between items-center py-3 border-b border-slate-800">
                        <span className="text-slate-300">Material Cost ({result.calculation.holes} units)</span>
                        <span className="font-mono text-white">₹{result.calculation.baseCost}</span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                        <span className="text-slate-300">Service Fee</span>
                        <span className="font-mono text-white">₹{result.calculation.additionalCharges}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
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
                        <span className="text-5xl font-black text-white tracking-tight">
                        <span className="text-2xl text-slate-500 font-normal mr-1">₹</span>
                        {result.calculation.grandTotal.toLocaleString()}
                        </span>
                    </div>
                </div>
            </>
          ) : (
             <div className="flex items-center justify-center h-full text-slate-600 animate-pulse">
                {availableSizes.length === 0 ? "Loading Inventory..." : "Calculating..."}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}