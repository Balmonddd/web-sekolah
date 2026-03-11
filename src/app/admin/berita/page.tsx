'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaNewspaper, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface NewsItem {
    id: string;
    judul: string;
    slug: string;
    konten: string;
    gambar: string;
    penulis: string;
    created_at: string;
}

export default function AdminBeritaPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ judul: '', konten: '', penulis: 'Admin', gambar: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Fetch berita dari Supabase
    const fetchNews = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('berita')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setNews(data);
        setLoading(false);
    };

    useEffect(() => { fetchNews(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const slug = form.judul.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

        if (editingId) {
            // Update
            await supabase.from('berita').update({
                judul: form.judul, slug, konten: form.konten,
                penulis: form.penulis, gambar: form.gambar || '/images/hero-bg.png',
            }).eq('id', editingId);
            setEditingId(null);
        } else {
            // Insert
            await supabase.from('berita').insert({
                judul: form.judul, slug, konten: form.konten,
                penulis: form.penulis, gambar: form.gambar || '/images/hero-bg.png',
            });
        }

        setForm({ judul: '', konten: '', penulis: 'Admin', gambar: '' });
        setShowForm(false);
        setSaving(false);
        fetchNews(); // Refresh data
    };

    const handleEdit = (item: NewsItem) => {
        setForm({ judul: item.judul, konten: item.konten, penulis: item.penulis, gambar: item.gambar || '' });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            await supabase.from('berita').delete().eq('id', id);
            fetchNews();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kelola Berita</h1>
                    <p className="text-slate-500 text-sm">Tambah, edit, dan hapus berita sekolah</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ judul: '', konten: '', penulis: 'Admin', gambar: '' }); }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    <FaPlus /> Tambah Berita
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul</label>
                                <input type="text" required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Judul berita" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Konten</label>
                                <textarea required value={form.konten} onChange={(e) => setForm({ ...form, konten: e.target.value })} rows={5} placeholder="Isi berita..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Penulis</label>
                                    <input type="text" value={form.penulis} onChange={(e) => setForm({ ...form, penulis: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">URL Gambar</label>
                                    <input type="text" value={form.gambar} onChange={(e) => setForm({ ...form, gambar: e.target.value })} placeholder="/images/foto.png" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
                                    {saving ? <><FaSpinner className="animate-spin" /> Menyimpan...</> : <><FaSave /> {editingId ? 'Update' : 'Simpan'}</>}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-colors">Batal</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                {loading ? (
                    <div className="p-12 text-center">
                        <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-3" />
                        <p className="text-slate-400">Memuat data...</p>
                    </div>
                ) : news.length === 0 ? (
                    <div className="p-12 text-center">
                        <FaNewspaper className="text-4xl text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada berita. Klik &quot;Tambah Berita&quot; untuk mulai.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Judul</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Penulis</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tanggal</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map((item, index) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                                    <FaNewspaper className="text-blue-600" />
                                                </div>
                                                <span className="font-medium text-slate-800 text-sm">{item.judul}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{item.penulis}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Edit"><FaEdit /></button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors" title="Hapus"><FaTrash /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
