'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaUserShield, FaKey, FaSpinner } from 'react-icons/fa';

export default function AdminPengaturanPage() {
    const [email, setEmail] = useState('admin@sekolah.com');
    const [passwordLama, setPasswordLama] = useState('');
    const [passwordBaru, setPasswordBaru] = useState('');
    const [konfirmasiPassword, setKonfirmasiPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Simulasi proses simpan
        setTimeout(() => {
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
            setLoading(false);
        }, 1000);
    };

    const handleSavePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (passwordBaru !== konfirmasiPassword) {
            setMessage({ type: 'error', text: 'Konfirmasi password baru tidak cocok!' });
            setLoading(false);
            return;
        }

        if (passwordLama !== 'admin123') { // Mock check
            setMessage({ type: 'error', text: 'Password lama salah!' });
            setLoading(false);
            return;
        }

        // Simulasi proses simpan
        setTimeout(() => {
            setMessage({ type: 'success', text: 'Password berhasil diubah!' });
            setPasswordLama('');
            setPasswordBaru('');
            setKonfirmasiPassword('');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Pengaturan Admin</h1>
                <p className="text-slate-500 text-sm">Kelola informasi akun dan keamanan</p>
            </div>

            {message.text && (
                <div className={`p-4 rounded-xl mb-6 border ${message.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
                {/* Profil Akun */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FaUserShield className="text-blue-600 text-lg" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Profil Akun</h2>
                    </div>

                    <form onSubmit={handleSaveProfile} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Nama Tampilan</label>
                            <input type="text" defaultValue="Administrator Utama" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Login</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                            <p className="text-xs text-slate-400 mt-1">Email ini digunakan untuk login ke panel admin.</p>
                        </div>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2.5 rounded-xl font-semibold hover:bg-slate-900 transition-colors disabled:opacity-50 mt-4">
                            {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Simpan Profil
                        </button>
                    </form>
                </motion.div>

                {/* Keamanan & Password */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                            <FaKey className="text-amber-600 text-lg" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">Ganti Password</h2>
                    </div>

                    <form onSubmit={handleSavePassword} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password Saat Ini</label>
                            <input type="password" value={passwordLama} onChange={(e) => setPasswordLama(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Password Baru</label>
                            <input type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                            <input type="password" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} required placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                        </div>
                        <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-4">
                            {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} Update Password
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
