'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaBook, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface ProgramItem {
    id: string;
    kategori: string;
    judul: string;
    deskripsi: string;
    created_at: string;
}

export default function AdminProgramPage() {
    const [programs, setPrograms] = useState<ProgramItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ kategori: 'Akademik', judul: '', deskripsi: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchPrograms = async () => {
        setLoading(true);
        setErrorMsg('');
        const { data, error } = await supabase
            .from('program')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) {
            setErrorMsg('Gagal memuat data. Pastikan tabel "program" sudah dibuat di Supabase.');
        } else if (data) {
            setPrograms(data);
        }
        setLoading(false);
    };

    useEffect(() => { fetchPrograms(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (editingId) {
            await supabase.from('program').update({
                kategori: form.kategori,
                judul: form.judul,
                deskripsi: form.deskripsi
            }).eq('id', editingId);
            setEditingId(null);
        } else {
            await supabase.from('program').insert({
                kategori: form.kategori,
                judul: form.judul,
                deskripsi: form.deskripsi
            });
        }

        setForm({ kategori: 'Akademik', judul: '', deskripsi: '' });
        setShowForm(false);
        setSaving(false);
        fetchPrograms();
    };

    const handleEdit = (item: ProgramItem) => {
        setForm({ kategori: item.kategori, judul: item.judul, deskripsi: item.deskripsi });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus program ini?')) {
            await supabase.from('program').delete().eq('id', id);
            fetchPrograms();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kelola Program</h1>
                    <p className="text-slate-500 text-sm">Kelola program akademik, ekstrakurikuler, dan unggulan</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ kategori: 'Akademik', judul: '', deskripsi: '' }); }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    <FaPlus /> Tambah Program
                </button>
            </div>

            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200">
                    {errorMsg}
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Program' : 'Tambah Program'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Kategori</label>
                                <select required value={form.kategori} onChange={(e) => setForm({ ...form, kategori: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm bg-white">
                                    <option value="Akademik">Akademik</option>
                                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                                    <option value="Program Unggulan">Program Unggulan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Program</label>
                                <input type="text" required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Contoh: MIPA, Pramuka, dll" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi</label>
                                <textarea required value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} rows={4} placeholder="Jelaskan tentang program ini..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm resize-none" />
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
                ) : programs.length === 0 ? (
                    <div className="p-12 text-center">
                        <FaBook className="text-4xl text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada program. Klik &quot;Tambah Program&quot; untuk mulai.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Program</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Kategori</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Deskripsi</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {programs.map((item, index) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800 text-sm whitespace-nowrap">{item.judul}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${
                                                item.kategori === 'Akademik' ? 'bg-blue-100 text-blue-700' :
                                                item.kategori === 'Ekstrakurikuler' ? 'bg-emerald-100 text-emerald-700' :
                                                'bg-amber-100 text-amber-700'
                                            }`}>
                                                {item.kategori}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 line-clamp-1 max-w-xs">{item.deskripsi}</td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
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
