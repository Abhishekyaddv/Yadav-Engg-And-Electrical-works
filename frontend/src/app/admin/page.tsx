"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, X, Edit3, Database, Package, RefreshCw, Lock, LogOut } from 'lucide-react';

export default function AdminPage() {
  // --- AUTH STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- INVENTORY STATE ---
  const [coils, setCoils] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Forms
  const [newCoil, setNewCoil] = useState({ type: 'New', size: '', unitPrice: '' });
  const [editForm, setEditForm] = useState({ size: '', unitPrice: '' });

  // --- 1. INITIAL LOAD (Check for Key) ---
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchCoils(); // Load data immediately if logged in
    }
  }, []);

  // --- 2. LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminToken', data.token); // Save the Key
        setIsLoggedIn(true); // Unlock the page
        fetchCoils(); // Load the inventory
      } else {
        setLoginError('Invalid Username or Password');
      }
    } catch (err) {
      setLoginError('Server Error. Is the backend running?');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // --- 3. INVENTORY LOGIC (Your existing code) ---
  const fetchCoils = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coils`);
      const data = await res.json();
      setCoils(data);
    } catch (err) { console.error("Failed to fetch coils", err); }
  };

  // Filter the data
  const newCoils = coils.filter(c => c.type === 'New');
  const recoilCoils = coils.filter(c => c.type === 'Recoil');

  // Handlers
  const handleAdd = async () => {
    if (!newCoil.size || !newCoil.unitPrice) return;
    const token = localStorage.getItem('adminToken');
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coils`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token || '' // Send the key for security
      },
      body: JSON.stringify(newCoil)
    });
    setNewCoil({ type: 'New', size: '', unitPrice: '' }); 
    fetchCoils();
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this size permanently?")) return;
    const token = localStorage.getItem('adminToken');
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coils/${id}`, { 
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' }
    });
    fetchCoils();
  };

  const startEdit = (item: any) => {
    setEditingId(item._id);
    setEditForm({ size: item.size, unitPrice: item.unitPrice });
  };

  const saveEdit = async (id: string) => {
    const token = localStorage.getItem('adminToken');

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coils/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify(editForm)
    });
    setEditingId(null);
    fetchCoils();
  };

  // Helper to render a row
  const renderRow = (item: any, colorClass: string) => (
    <tr key={item._id} className="hover:bg-slate-800/30 transition-colors group border-b border-slate-800/50 last:border-0">
      {editingId === item._id ? (
        /* EDIT MODE */
        <>
          <td className="p-4 pl-6">
            <input 
              className="bg-slate-950 text-white p-2 rounded-lg border border-blue-500 outline-none w-full font-mono text-sm"
              value={editForm.size}
              onChange={e => setEditForm({...editForm, size: e.target.value})}
              autoFocus
            />
          </td>
          <td className="p-4">
            <input 
              type="number"
              className="bg-slate-950 text-white p-2 rounded-lg border border-blue-500 outline-none w-24 font-mono text-sm"
              value={editForm.unitPrice}
              onChange={e => setEditForm({...editForm, unitPrice: e.target.value})}
            />
          </td>
          <td className="p-4 pr-6 text-right">
            <div className="flex justify-end gap-2">
              <button onClick={() => saveEdit(item._id)} className="p-2 bg-green-600 hover:bg-green-500 rounded-lg text-white"><Save size={16} /></button>
              <button onClick={() => setEditingId(null)} className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300"><X size={16} /></button>
            </div>
          </td>
        </>
      ) : (
        /* VIEW MODE */
        <>
          <td className="p-4 pl-6 font-medium text-slate-300">{item.size}</td>
          <td className={`p-4 font-mono font-bold ${colorClass}`}>₹{item.unitPrice}</td>
          <td className="p-4 pr-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex justify-end gap-3">
              <button onClick={() => startEdit(item)} className="text-blue-400 hover:bg-blue-500/10 p-2 rounded"><Edit3 size={16} /></button>
              <button onClick={() => handleDelete(item._id)} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded"><Trash2 size={16} /></button>
            </div>
          </td>
        </>
      )}
    </tr>
  );

  // --- 4. RENDER: LOGIN SCREEN (If not logged in) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1120] text-white p-4 font-sans">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-sm shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600/20 p-4 rounded-full text-blue-500">
              <Lock size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">Admin Access</h1>
          <p className="text-slate-500 text-center text-sm mb-6">Enter credentials to manage inventory</p>
          
          {loginError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-4 text-center text-sm">{loginError}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="text-xs text-slate-500 font-bold ml-1 mb-1 block">USERNAME</label>
                <input 
                type="text" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                value={username} onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label className="text-xs text-slate-500 font-bold ml-1 mb-1 block">PASSWORD</label>
                <input 
                type="password" 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                value={password} onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-2">
              Unlock Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 5. RENDER: INVENTORY SCREEN (If logged in) ---
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-slate-800 pb-6">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                    <Database className="text-blue-500" /> Inventory Control
                </h1>
            </div>
            <button 
                onClick={handleLogout} 
                className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
            >
                <LogOut size={16} /> Logout
            </button>
        </div>

        {/* ADD NEW BAR */}
        <div className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Add Item to Database</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">Type</label>
              <select 
                className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 outline-none appearance-none"
                value={newCoil.type}
                onChange={e => setNewCoil({...newCoil, type: e.target.value})}
              >
                <option value="New">New Component</option>
                <option value="Recoil">Recoil / Refurb</option>
              </select>
            </div>
            <div className="md:col-span-2">
               <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">Size Name</label>
               <input 
                 className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 outline-none placeholder:text-slate-700"
                 placeholder="e.g. M24 Heavy Duty"
                 value={newCoil.size}
                 onChange={e => setNewCoil({...newCoil, size: e.target.value})}
               />
            </div>
            <div className="flex gap-2">
               <div className="relative flex-1">
                   <label className="block text-xs font-semibold text-slate-500 mb-1.5 ml-1">Price</label>
                   <input 
                     type="number"
                     className="w-full bg-slate-950 text-white p-3 rounded-xl border border-slate-700 outline-none font-mono"
                     placeholder="0"
                     value={newCoil.unitPrice}
                     onChange={e => setNewCoil({...newCoil, unitPrice: e.target.value})}
                   />
               </div>
               <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-xl mt-6 flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Plus size={24} />
               </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            
            {/* TABLE 1: NEW COMPONENTS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-blue-950/30 p-4 border-b border-blue-900/20 flex items-center gap-2">
                    <Package className="text-blue-400" size={20} />
                    <h3 className="font-bold text-blue-100">New Components</h3>
                    <span className="ml-auto bg-blue-500/10 text-blue-400 text-xs font-bold px-2 py-1 rounded-full">{newCoils.length} items</span>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-950 text-slate-500 text-xs uppercase font-semibold">
                            <th className="p-4 pl-6">Size</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right pr-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newCoils.map(item => renderRow(item, "text-blue-400"))}
                         {newCoils.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-slate-600 italic">No new coils added.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* TABLE 2: RECOIL / REFURBISHED */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-emerald-950/30 p-4 border-b border-emerald-900/20 flex items-center gap-2">
                    <RefreshCw className="text-emerald-400" size={20} />
                    <h3 className="font-bold text-emerald-100">Recoil / Refurbished</h3>
                    <span className="ml-auto bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">{recoilCoils.length} items</span>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-950 text-slate-500 text-xs uppercase font-semibold">
                            <th className="p-4 pl-6">Size</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-right pr-6">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recoilCoils.map(item => renderRow(item, "text-emerald-400"))}
                        {recoilCoils.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-slate-600 italic">No recoil options added.</td></tr>}
                    </tbody>
                </table>
            </div>

        </div>
      </div>
    </div>
  );
}