"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, Plus, Save, X } from 'lucide-react'; // Install: npm install lucide-react

export default function AdminDashboard() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ id: '', name: '', details: '', price: '' });
  const [isEditing, setIsEditing] = useState(false);

  // 1. Security Check & Data Fetch
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
      fetchPrices();
    }
  }, [router]);

  // 2. Fetch Data
  const fetchPrices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prices`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Handle Submit (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    // Determine URL and Method based on mode
    const url = isEditing 
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/prices/${formData.id}` 
      : `${process.env.NEXT_PUBLIC_API_URL}/api/prices`;
    
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token || '' 
      },
      body: JSON.stringify({
        name: formData.name,
        details: formData.details,
        price: Number(formData.price)
      }),
    });

    if (res.ok) {
      fetchPrices(); // Refresh list
      resetForm();
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you want to delete this?")) return;
    const token = localStorage.getItem('adminToken');
    
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/prices/${id}`, {
      method: 'DELETE',
      headers: { 'x-auth-token': token || '' },
    });
    fetchPrices();
  };

  // Helper: Prepare form for editing
  const startEdit = (item: any) => {
    setIsEditing(true);
    setFormData({ id: item._id, name: item.name, details: item.details, price: item.price });
  };

  // Helper: Reset form
  const resetForm = () => {
    setIsEditing(false);
    setFormData({ id: '', name: '', details: '', price: '' });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold text-blue-400">Manage Coil Prices</h1>
          <button onClick={handleLogout} className="bg-red-500/10 text-red-400 px-4 py-2 rounded hover:bg-red-500/20">
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* LEFT: EDITOR FORM */}
          <div className="md:col-span-1">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 sticky top-10">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                {isEditing ? <Edit size={20} className="text-yellow-500"/> : <Plus size={20} className="text-blue-500"/>}
                {isEditing ? 'Edit Item' : 'Add New Item'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold">Item Name</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 mt-1 focus:border-blue-500 outline-none"
                    placeholder="e.g. 5HP Motor"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold">Details</label>
                  <input 
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 mt-1 focus:border-blue-500 outline-none"
                    placeholder="e.g. Copper Winding"
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 uppercase font-bold">Price (₹)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 mt-1 focus:border-blue-500 outline-none"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button className={`flex-1 py-3 rounded font-bold flex justify-center items-center gap-2 ${isEditing ? 'bg-yellow-600 hover:bg-yellow-500' : 'bg-blue-600 hover:bg-blue-500'}`}>
                    <Save size={18} /> {isEditing ? 'Update' : 'Save'}
                  </button>
                  
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="bg-slate-700 px-4 rounded hover:bg-slate-600">
                      <X size={20} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: LIST OF ITEMS */}
          <div className="md:col-span-2">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="p-4">Item Name</th>
                    <th className="p-4">Details</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {items.length === 0 ? (
                    <tr><td colSpan={4} className="p-8 text-center text-slate-500">No items found. Add one on the left.</td></tr>
                  ) : (
                    items.map((item) => (
                      <tr key={item._id} className="hover:bg-slate-800/50 transition">
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-slate-400 text-sm">{item.details}</td>
                        <td className="p-4 text-green-400 font-bold">₹{item.price}</td>
                        <td className="p-4 text-right flex justify-end gap-2">
                          <button 
                            onClick={() => startEdit(item)}
                            className="bg-blue-500/10 text-blue-400 p-2 rounded hover:bg-blue-500/20"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500/10 text-red-400 p-2 rounded hover:bg-red-500/20"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}