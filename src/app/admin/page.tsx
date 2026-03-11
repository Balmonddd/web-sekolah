'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaBullhorn, FaImages, FaUserGraduate, FaEnvelope, FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface DashboardStats {
    berita: number;
    pengumuman: number;
    galeri: number;
    ppdb: number;
    kontak: number;
}

interface Activity {
    text: string;
    time: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({ berita: 0, pengumuman: 0, galeri: 0, ppdb: 0, kontak: 0 });
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);

            // Fetch semua count secara paralel
            const [beritaRes, pengumumanRes, galeriRes, ppdbRes, kontakRes] = await Promise.all([
                supabase.from('berita').select('id', { count: 'exact', head: true }),
                supabase.from('pengumuman').select('id', { count: 'exact', head: true }),
                supabase.from('galeri').select('id', { count: 'exact', head: true }),
                supabase.from('ppdb').select('id', { count: 'exact', head: true }),
                supabase.from('kontak').select('id', { count: 'exact', head: true }),
            ]);

            setStats({
                berita: beritaRes.count || 0,
                pengumuman: pengumumanRes.count || 0,
                galeri: galeriRes.count || 0,
                ppdb: ppdbRes.count || 0,
                kontak: kontakRes.count || 0,
            });

            // Fetch aktivitas terbaru (5 berita & pengumuman terbaru digabung)
            const [recentBerita, recentPpdb, recentKontak] = await Promise.all([
                supabase.from('berita').select('judul, created_at').order('created_at', { ascending: false }).limit(2),
                supabase.from('ppdb').select('nama, created_at').order('created_at', { ascending: false }).limit(2),
                supabase.from('kontak').select('nama, created_at').order('created_at', { ascending: false }).limit(1),
            ]);

            const acts: Activity[] = [];
            recentBerita.data?.forEach((b) => acts.push({
                text: `Berita ditambahkan: "${b.judul}"`,
                time: formatTimeAgo(b.created_at),
            }));
            recentPpdb.data?.forEach((p) => acts.push({
                text: `Pendaftar PPDB baru: ${p.nama}`,
                time: formatTimeAgo(p.created_at),
            }));
            recentKontak.data?.forEach((k) => acts.push({
                text: `Pesan baru dari: ${k.nama}`,
                time: formatTimeAgo(k.created_at),
            }));

            // Sort by recency
            acts.sort((a, b) => {
                const order = ['baru', 'menit', 'jam', 'hari', 'minggu', 'bulan'];
                const aIdx = order.findIndex((o) => a.time.includes(o));
                const bIdx = order.findIndex((o) => b.time.includes(o));
                return aIdx - bIdx;
            });

            setActivities(acts.slice(0, 5));
            setLoading(false);
        };

        fetchStats();
    }, []);

    const formatTimeAgo = (dateStr: string) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (diff < 60) return 'Baru saja';
        if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
        if (diff < 604800) return `${Math.floor(diff / 86400)} hari lalu`;
        if (diff < 2592000) return `${Math.floor(diff / 604800)} minggu lalu`;
        return `${Math.floor(diff / 2592000)} bulan lalu`;
    };

    const statCards = [
        { label: 'Total Berita', value: stats.berita, icon: FaNewspaper, color: 'from-blue-500 to-blue-600', href: '/admin/berita' },
        { label: 'Pengumuman', value: stats.pengumuman, icon: FaBullhorn, color: 'from-amber-500 to-orange-500', href: '/admin/pengumuman' },
        { label: 'Foto Galeri', value: stats.galeri, icon: FaImages, color: 'from-purple-500 to-pink-500', href: '/admin/galeri' },
        { label: 'Pendaftar PPDB', value: stats.ppdb, icon: FaUserGraduate, color: 'from-emerald-500 to-teal-500', href: '/admin/ppdb' },
        { label: 'Pesan Masuk', value: stats.kontak, icon: FaEnvelope, color: 'from-cyan-500 to-blue-500', href: '#' },
    ];

    return (
        <div>
            {/* Welcome */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Selamat datang di panel admin SMA Negeri 1 Kota Nusantara</p>
            </div>

            {/* Stats */}
            {loading ? (
                <div className="text-center py-12">
                    <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-3" />
                    <p className="text-slate-400">Memuat data...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                        {statCards.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={stat.href}
                                    className="block bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 group border border-slate-100"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <stat.icon className="text-white text-lg" />
                                        </div>
                                    </div>
                                    <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
                                    <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
                        <h2 className="font-bold text-lg text-slate-800 mb-4">Aktivitas Terbaru</h2>
                        {activities.length > 0 ? (
                            <div className="space-y-4">
                                {activities.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-700 truncate">{activity.text}</p>
                                        </div>
                                        <span className="text-xs text-slate-400 shrink-0">{activity.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-400 text-sm py-4 text-center">Belum ada aktivitas. Mulai tambahkan konten melalui menu di sidebar.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
