'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaCheckCircle, FaSpinner, FaCloudUploadAlt, FaFileAlt, FaTimes } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { uploadImage } from '@/lib/storage';

export default function PPDBPage() {
    const [formData, setFormData] = useState({
        nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: '',
        alamat: '', nama_ortu: '', telepon: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Ukuran file maksimal 5MB!');
                return;
            }
            setSelectedFile(file);
            setError('');
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        let dokumenUrl = '';

        // Upload dokumen jika ada
        if (selectedFile) {
            const url = await uploadImage(selectedFile, 'ppdb-dokumen');
            if (url) {
                dokumenUrl = url;
            } else {
                setError('Gagal upload dokumen. Coba lagi.');
                setLoading(false);
                return;
            }
        }

        const { error: dbError } = await supabase.from('ppdb').insert({
            nama: formData.nama,
            tempat_lahir: formData.tempat_lahir,
            tanggal_lahir: formData.tanggal_lahir,
            jenis_kelamin: formData.jenis_kelamin,
            alamat: formData.alamat,
            nama_ortu: formData.nama_ortu,
            telepon: formData.telepon,
            dokumen: dokumenUrl,
        });

        if (dbError) {
            setError('Gagal menyimpan data. Silakan coba lagi.');
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (success) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md mx-auto"
                >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Pendaftaran Berhasil!</h2>
                    <p className="text-slate-500 mb-6">
                        Data pendaftaran Anda telah berhasil disimpan. Tim kami akan menghubungi Anda untuk informasi selanjutnya.
                    </p>
                    <button
                        onClick={() => { setSuccess(false); setSelectedFile(null); setFormData({ nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: '', alamat: '', nama_ortu: '', telepon: '' }); }}
                        className="btn-primary"
                    >
                        Daftar Lagi
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <FaUserGraduate className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">PPDB Online</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Info */}
            <section className="py-8 bg-white">
                <div className="container-custom max-w-3xl">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-800 mb-3">Persyaratan Pendaftaran</h3>
                        <ul className="text-blue-700 text-sm space-y-2">
                            <li>• Usia maksimal 18 tahun pada tanggal 1 Juli 2025</li>
                            <li>• Lulusan SMP/MTs sederajat</li>
                            <li>• Memiliki ijazah atau Surat Keterangan Lulus</li>
                            <li>• Menyertakan rapor semester 1-5</li>
                            <li>• Pas foto terbaru ukuran 3x4 (2 lembar)</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Form */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom max-w-3xl">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-8">Formulir Pendaftaran</h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap *</label>
                                <input type="text" name="nama" required value={formData.nama} onChange={handleChange} placeholder="Masukkan nama lengkap"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tempat Lahir *</label>
                                <input type="text" name="tempat_lahir" required value={formData.tempat_lahir} onChange={handleChange} placeholder="Kota kelahiran"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir *</label>
                                <input type="date" name="tanggal_lahir" required value={formData.tanggal_lahir} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Jenis Kelamin *</label>
                                <select name="jenis_kelamin" required value={formData.jenis_kelamin} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon *</label>
                                <input type="tel" name="telepon" required value={formData.telepon} onChange={handleChange} placeholder="08xxxxxxxxxx"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap *</label>
                                <textarea name="alamat" required value={formData.alamat} onChange={handleChange} rows={3} placeholder="Masukkan alamat lengkap"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Orang Tua / Wali *</label>
                                <input type="text" name="nama_ortu" required value={formData.nama_ortu} onChange={handleChange} placeholder="Masukkan nama orang tua/wali"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>

                            {/* Upload Dokumen */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Dokumen</label>
                                {selectedFile ? (
                                    <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                            <FaFileAlt className="text-blue-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">{selectedFile.name}</p>
                                            <p className="text-xs text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                        <button type="button" onClick={removeFile} className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors">
                                            <FaTimes />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
                                    >
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                        />
                                        <FaCloudUploadAlt className="text-3xl text-slate-300 mx-auto mb-2" />
                                        <p className="text-slate-500 text-sm font-medium">Klik untuk pilih dokumen</p>
                                        <p className="text-xs text-slate-400 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-8 py-4 text-lg disabled:opacity-50">
                            {loading ? <><FaSpinner className="animate-spin" /> Mengirim...</> : 'Daftar Sekarang'}
                        </button>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}
