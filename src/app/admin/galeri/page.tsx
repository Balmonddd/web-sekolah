'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaTimes, FaSave, FaSpinner, FaImages, FaCloudUploadAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';

interface GaleriItem {
    id: string;
    judul: string;
    gambar: string;
}

export default function AdminGaleriPage() {
    const [items, setItems] = useState<GaleriItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ judul: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fetchData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('galeri')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && data) setItems(data);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Pilih file gambar terlebih dahulu!');
            return;
        }
        setSaving(true);

        // Upload file ke Supabase Storage
        const imageUrl = await uploadImage(selectedFile, 'galeri');

        if (imageUrl) {
            await supabase.from('galeri').insert({
                judul: form.judul,
                gambar: imageUrl,
            });
            setForm({ judul: '' });
            setSelectedFile(null);
            setPreview(null);
            setShowForm(false);
            fetchData();
        } else {
            alert('Gagal upload gambar. Pastikan bucket "images" sudah dibuat di Supabase Storage.');
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus foto ini?')) {
            await supabase.from('galeri').delete().eq('id', id);
            fetchData();
        }
    };

    const resetForm = () => {
        setForm({ judul: '' });
        setSelectedFile(null);
        setPreview(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Kelola Galeri</h1>
                    <p className="text-slate-500 text-sm">Tambah dan hapus foto galeri sekolah</p>
                </div>
                <button onClick={() => { resetForm(); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                    <FaPlus /> Tambah Foto
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Tambah Foto</h2>
                            <button onClick={resetForm} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Foto</label>
                                <input type="text" required value={form.judul} onChange={(e) => setForm({ ...form, judul: e.target.value })} placeholder="Contoh: Upacara Bendera" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            </div>

                            {/* File Upload Area */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Gambar *</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50 hover:bg-blue-50"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    {preview ? (
                                        <div className="space-y-3">
                                            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                                <Image src={preview} alt="Preview" fill className="object-cover" />
                                            </div>
                                            <p className="text-sm text-blue-600 font-medium">{selectedFile?.name}</p>
                                            <p className="text-xs text-slate-400">Klik untuk ganti gambar</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <FaCloudUploadAlt className="text-4xl text-slate-300 mx-auto" />
                                            <p className="text-slate-500 text-sm font-medium">Klik untuk pilih gambar</p>
                                            <p className="text-xs text-slate-400">JPG, PNG, WebP (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving || !selectedFile} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50">
                                    {saving ? <><FaSpinner className="animate-spin" /> Mengupload...</> : <><FaSave /> Upload & Simpan</>}
                                </button>
                                <button type="button" onClick={resetForm} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold">Batal</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Gallery Grid */}
            {loading ? (
                <div className="py-12 text-center">
                    <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-3" />
                    <p className="text-slate-400">Memuat data...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="py-12 text-center">
                    <FaImages className="text-4xl text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-400">Belum ada foto. Klik &quot;Tambah Foto&quot; untuk mulai.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {items.map((item, index) => (
                        <motion.div key={item.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}
                            className="relative group rounded-xl overflow-hidden shadow-md aspect-square">
                            <Image src={item.gambar} alt={item.judul} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                                    <p className="text-white text-sm font-medium truncate">{item.judul}</p>
                                    <button onClick={() => handleDelete(item.id)} className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors shrink-0">
                                        <FaTrash className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
