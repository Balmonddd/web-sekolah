'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave, FaChalkboardTeacher, FaSpinner, FaUser } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface GuruItem {
    id: string;
    nama: string;
    jabatan: string;
    bidang: string;
    gambar?: string;
    created_at: string;
}

export default function AdminGuruPage() {
    const [gurus, setGurus] = useState<GuruItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({ nama: '', jabatan: 'Guru', bidang: '', gambar: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchGurus = async () => {
        setLoading(true);
        setErrorMsg('');
        const { data, error } = await supabase
            .from('guru')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) {
            setErrorMsg('Gagal memuat data. Pastikan tabel "guru" sudah dibuat di Supabase.');
        } else if (data) {
            setGurus(data);
        }
        setLoading(false);
    };

    useEffect(() => { fetchGurus(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (editingId) {
            await supabase.from('guru').update({
                nama: form.nama,
                jabatan: form.jabatan,
                bidang: form.bidang,
                gambar: form.gambar
            }).eq('id', editingId);
            setEditingId(null);
        } else {
            await supabase.from('guru').insert({
                nama: form.nama,
                jabatan: form.jabatan,
                bidang: form.bidang,
                gambar: form.gambar
            });
        }

        setForm({ nama: '', jabatan: 'Guru', bidang: '', gambar: '' });
        setShowForm(false);
        setSaving(false);
        fetchGurus();
    };

    const handleEdit = (item: GuruItem) => {
        setForm({ nama: item.nama, jabatan: item.jabatan, bidang: item.bidang, gambar: item.gambar || '' });
        setEditingId(item.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            await supabase.from('guru').delete().eq('id', id);
            fetchGurus();
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Data Guru & Staf</h1>
                    <p className="text-slate-500 text-sm">Kelola profil tenaga pendidik dan kependidikan</p>
                </div>
                <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ nama: '', jabatan: 'Guru', bidang: '', gambar: '' }); }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    <FaPlus /> Tambah Data
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
                            <h2 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Data' : 'Tambah Data'}</h2>
                            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                                <input type="text" required value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Cth: Budi Santoso, S.Pd." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Jabatan</label>
                                    <select required value={form.jabatan} onChange={(e) => setForm({ ...form, jabatan: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm bg-white">
                                        <option value="Kepala Sekolah">Kepala Sekolah</option>
                                        <option value="Wakil Kepala Sekolah">Wakil Kepala Sekolah</option>
                                        <option value="Guru">Guru</option>
                                        <option value="Staf TU">Staf TU</option>
                                        <option value="Pustakawan">Pustakawan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Mata Pelajaran / Bidang</label>
                                    <input type="text" required value={form.bidang} onChange={(e) => setForm({ ...form, bidang: e.target.value })} placeholder="Cth: Matematika" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">URL Foto (Opsional)</label>
                                <input type="text" value={form.gambar} onChange={(e) => setForm({ ...form, gambar: e.target.value })} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
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
                ) : gurus.length === 0 ? (
                    <div className="p-12 text-center">
                        <FaChalkboardTeacher className="text-4xl text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada data. Klik &quot;Tambah Data&quot; untuk mulai.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Nama & Profil</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Jabatan</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Bidang</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gurus.map((item, index) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shrink-0 overflow-hidden relative">
                                                    {item.gambar ? (
                                                        <Image src={item.gambar} alt={item.nama} fill className="object-cover" />
                                                    ) : (
                                                        <FaUser className="text-slate-400" />
                                                    )}
                                                </div>
                                                <span className="font-medium text-slate-800 text-sm">{item.nama}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{item.jabatan}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{item.bidang}</td>
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
