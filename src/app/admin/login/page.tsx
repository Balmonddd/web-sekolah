'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaSpinner, FaGraduationCap } from 'react-icons/fa';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple credential check — replace with Supabase Auth
        if (email === 'admin@sekolah.com' && password === 'admin123') {
            localStorage.setItem('admin_logged_in', 'true');
            router.push('/admin');
        } else {
            setError('Email atau password salah!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-sky-400 rounded-2xl flex items-center justify-center shadow-lg">
                            <FaGraduationCap className="text-3xl text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                        <p className="text-slate-400 text-sm mt-1">SMA Negeri 1 Kota Nusantara</p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 text-center">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                    placeholder="admin@sekolah.com"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <><FaSpinner className="animate-spin" /> Masuk...</> : 'Masuk'}
                        </button>
                    </form>

                </div>
            </motion.div>
        </div>
    );
}
