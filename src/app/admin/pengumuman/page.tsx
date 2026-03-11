'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaBullhorn, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface PengumumanItem {
    id: string;
    judul: string;
    konten: string;
    tipe: string;
    tanggal: string;
    created_at: string;
}

const tipeColors: Record<string, string> = {
    Ujian: 'bg-red-100 text-red-700',
    PPDB: 'bg-blue-100 text-blue-700',
    Informasi: 'bg-green-100 text-green-700',
    Kegiatan: 'bg-purple-100 text-purple-700',
};

export default function AdminPengumumanPage() {
    const [items, setItems] = useState<PengumumanItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ judul: '', konten: '', tipe: 'Informasi' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('pengumuman')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (editingId) {
            await supabase.from('pengumuman').update({
                judul: form.judul, konten: form.konten, tipe: form.tipe,
            }).eq('id', editingId);
            setEditingId(null);
        } else {
            await supabase.from('pengumuman').insert({
                judul: form.judul, konten: form.konten, tipe: form.tipe,
            });
        }

        setForm({ judul: '', konten: '', tipe: 'Informasi' });
        setShowForm(false);
        setSaving(false);
        fetchData();
    };

    const handleEdit = (item: PengumumanItem) => {
        setForm({ judul: item.judul, konten: item.konten, tipe: item.tipe });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus pengumuman ini?')) {
            await supabase.from('pengumuman').delete().eq('id', id);
            fetchData();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kelola Pengumuman</h1>
                    <p className="text-slate-500 text-sm">Tambah, edit, dan hapus pengumuman sekolah</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ judul: '', konten: '', tipe: 'Informasi' }); }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    <FaPlus /> Tambah
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">{editingId ? 'Edit Pengumuman' : 'Tambah Pengumuman'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul</label>
                                <input type="text" required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Tipe</label>
                                <select value={form.tipe} onChange={(e) => setForm({ ...form, tipe: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm bg-white">
                                    <option>Informasi</option><option>Ujian</option><option>PPDB</option><option>Kegiatan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Konten</label>
                                <textarea required value={form.konten} onChange={(e) => setForm({ ...form, konten: e.target.value })} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm resize-none" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
                                    {saving ? <><FaSpinner className="animate-spin" /> Menyimpan...</> : <><FaSave /> Simpan</>}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors">Batal</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* List */}
            {loading ? (
                <div className="py-12 text-center">
                    <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-3" />
                    <p className="text-slate-400">Memuat data...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="py-12 text-center">
                    <FaBullhorn className="text-4xl text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400">Belum ada pengumuman. Klik &quot;Tambah&quot; untuk mulai.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl p-5 shadow-md border border-slate-100 flex items-start gap-4 hover:shadow-lg transition-all">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                <FaBullhorn className="text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tipeColors[item.tipe] || 'bg-slate-100 text-slate-700'}`}>{item.tipe}</span>
                                    <span className="text-xs text-slate-400">{new Date(item.tanggal || item.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                <h3 className="font-semibold text-slate-800 text-sm">{item.judul}</h3>
                                <p className="text-xs text-slate-500 mt-1 truncate">{item.konten}</p>
                            </div>
                            <div className="flex gap-1 shrink-0">
                                <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"><FaEdit /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><FaTrash /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
