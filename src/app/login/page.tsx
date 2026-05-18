'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaSpinner, FaGraduationCap, FaUser, FaUserShield } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    const [role, setRole] = useState<'user' | 'admin'>('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        if (role === 'admin') {
            if (email === 'admin@sekolah.com' && password === 'admin123') {
                localStorage.setItem('admin_logged_in', 'true');
                router.push('/admin');
            } else {
                setError('Email atau password admin salah!');
            }
        } else {
            // User login — simpan di localStorage (bisa diganti Supabase Auth)
            if (email && password.length >= 6) {
                localStorage.setItem('user_logged_in', 'true');
                localStorage.setItem('user_email', email);
                localStorage.setItem('user_name', email.split('@')[0]);
                router.push('/');
            } else {
                setError('Email atau password tidak valid! (min. 6 karakter)');
            }
        }
        setLoading(false);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        if (!email) {
            setError('Silakan masukkan email Anda.');
            setLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setError('Password baru minimal 6 karakter.');
            setLoading(false);
            return;
        }

        // Simulasi reset password
        setTimeout(() => {
            setSuccessMsg('Password berhasil direset! Silakan login dengan password baru.');
            setLoading(false);
            setTimeout(() => {
                setIsForgotPassword(false);
                setPassword('');
                setNewPassword('');
                setSuccessMsg('');
            }, 3000);
        }, 1500);
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
                        <div className="relative w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden">
                            <Image src="/images/logo.png" alt="Logo Sekolah" fill className="object-contain p-2" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">{isForgotPassword ? 'Reset Password' : 'Login'}</h1>
                        <p className="text-slate-400 text-sm mt-1">SMA Negeri 1 Kota Nusantara</p>
                    </div>

                    {/* Role Tabs - Only show when not in forgot password mode */}
                    {!isForgotPassword && (
                        <div className="flex bg-white/5 rounded-xl p-1 mb-6">
                            <button
                                onClick={() => { setRole('user'); setError(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${role === 'user'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <FaUser className="text-xs" /> Siswa / Pengguna
                            </button>
                            <button
                                onClick={() => { setRole('admin'); setError(''); }}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${role === 'admin'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <FaUserShield className="text-xs" /> Admin
                            </button>
                        </div>
                    )}

                    {/* Error & Success Messages */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6 text-center">
                            {error}
                        </div>
                    )}
                    {successMsg && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm mb-6 text-center">
                            {successMsg}
                        </div>
                    )}

                    {/* Form */}
                    {isForgotPassword ? (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email Akun Anda</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        placeholder="email@contoh.com"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Password Baru</label>
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required
                                        placeholder="Min. 6 karakter"
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit" disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? <><FaSpinner className="animate-spin" /> Memproses...</> : 'Reset Password'}
                            </button>
                            <div className="text-center mt-4">
                                <button type="button" onClick={() => { setIsForgotPassword(false); setError(''); setSuccessMsg(''); }} className="text-slate-400 hover:text-white text-sm transition-colors">
                                    Batal & Kembali ke Login
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                        placeholder={role === 'admin' ? 'admin@sekolah.com' : 'email@contoh.com'}
                                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-slate-300">Password</label>
                                    {role === 'user' && (
                                        <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); }} className="text-blue-400 hover:text-blue-300 text-xs transition-colors">
                                            Lupa password?
                                        </button>
                                    )}
                                </div>
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
                                {loading ? <><FaSpinner className="animate-spin" /> Masuk...</> : `Masuk sebagai ${role === 'admin' ? 'Admin' : 'Pengguna'}`}
                            </button>
                        </form>
                    )}

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm inline-block transition-colors">
                            ← Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
