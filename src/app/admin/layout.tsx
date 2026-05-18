'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaGraduationCap, FaTachometerAlt, FaNewspaper, FaBullhorn, FaImages, FaUserGraduate, FaSignOutAlt, FaBars, FaTimes, FaBook, FaChalkboardTeacher, FaEnvelope, FaCog } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

const sidebarLinks = [
    { href: '/admin', label: 'Dashboard', icon: FaTachometerAlt },
    { href: '/admin/berita', label: 'Kelola Berita', icon: FaNewspaper },
    { href: '/admin/pengumuman', label: 'Kelola Pengumuman', icon: FaBullhorn },
    { href: '/admin/galeri', label: 'Kelola Galeri', icon: FaImages },
    { href: '/admin/ppdb', label: 'Data PPDB', icon: FaUserGraduate },
    { href: '/admin/program', label: 'Kelola Program', icon: FaBook },
    { href: '/admin/guru', label: 'Data Guru', icon: FaChalkboardTeacher },
    { href: '/admin/pesan', label: 'Pesan Masuk', icon: FaEnvelope },
    { href: '/admin/pengaturan', label: 'Pengaturan', icon: FaCog },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pesanCount, setPesanCount] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchPesanCount = async () => {
            const { data } = await supabase
                .from('kontak')
                .select('id');
            
            if (data) {
                const readIds = JSON.parse(localStorage.getItem('read_messages') || '[]');
                const unreadCount = data.filter(d => !readIds.includes(d.id)).length;
                setPesanCount(unreadCount);
            }
        };

        const isLoggedIn = localStorage.getItem('admin_logged_in');
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            fetchPesanCount();
        }

        // Listen for custom event when a message is read
        window.addEventListener('pesanRead', fetchPesanCount);
        return () => window.removeEventListener('pesanRead', fetchPesanCount);
    }, [pathname, router]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_logged_in');
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl flex items-center justify-center">
                            <FaGraduationCap className="text-lg text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Admin Panel</h2>
                            <p className="text-xs text-blue-300">SMAN 1 Nusantara</p>
                        </div>
                    </div>

                    {/* Nav Links */}
                    <nav className="space-y-1.5">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <link.icon className={`text-lg ${isActive ? 'text-white' : 'text-slate-500'}`} />
                                        {link.label}
                                    </div>
                                    {link.label === 'Pesan Masuk' && pesanCount > 0 && (
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-blue-600' : 'bg-red-500 text-white'}`}>
                                            {pesanCount}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
                    >
                        <FaSignOutAlt className="text-lg" />
                        Keluar
                    </button>
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all mt-1">
                        ← Kembali ke Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar */}
                <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between lg:justify-end sticky top-0 z-30">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">
                        {sidebarOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-700 font-bold text-sm">A</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Admin</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
