'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';
import Image from 'next/image';

type NavLink = {
    href?: string;
    label: string;
    dropdown?: { href: string; label: string }[];
};

const navLinks: NavLink[] = [
    { href: '/', label: 'Beranda' },
    {
        label: 'Tentang',
        dropdown: [
            { href: '/profil', label: 'Profil Sekolah' },
            { href: '/visi-misi', label: 'Visi & Misi' },
            { href: '/prestasi', label: 'Prestasi' },
        ]
    },
    {
        label: 'Program',
        dropdown: [
            { href: '/akademik', label: 'Akademik' },
            { href: '/ekstrakurikuler', label: 'Ekstrakurikuler' },
            { href: '/program-unggulan', label: 'Program Unggulan' },
        ]
    },
    { href: '/berita', label: 'Berita' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/ppdb', label: 'PPDB' },
    { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<{ role: 'admin' | 'user', name: string } | null>(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        // Check login status
        const adminLoggedIn = localStorage.getItem('admin_logged_in');
        const userLoggedIn = localStorage.getItem('user_logged_in');
        
        if (adminLoggedIn) {
            setUser({ role: 'admin', name: 'Admin' });
        } else if (userLoggedIn) {
            const name = localStorage.getItem('user_name') || 'Pengguna';
            setUser({ role: 'user', name });
        } else {
            setUser(null);
        }
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('admin_logged_in');
        localStorage.removeItem('user_logged_in');
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_email');
        setUser(null);
        setProfileOpen(false);
        setIsOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 ${scrolled
                            ? 'bg-white shadow-sm'
                            : 'bg-white/90 backdrop-blur-sm'
                            }`}>
                            <Image src="/images/logo.png" alt="Logo SMAN 1" fill className="object-contain p-1" />
                        </div>
                        <div>
                            <h1 className={`font-bold text-lg leading-tight transition-colors duration-300 ${scrolled ? 'text-blue-800' : 'text-white'
                                }`}>
                                SMA Negeri 1
                            </h1>
                            <p className={`text-xs transition-colors duration-300 ${scrolled ? 'text-slate-500' : 'text-white/80'
                                }`}>
                                Kota Nusantara
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            link.dropdown ? (
                                <div key={link.label} className="relative group">
                                    <button
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 ${scrolled
                                            ? 'text-slate-700 hover:text-blue-700 hover:bg-blue-50'
                                            : 'text-white/90 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 border border-slate-100">
                                        {link.dropdown.map((dropLink) => (
                                            <Link
                                                key={dropLink.href}
                                                href={dropLink.href}
                                                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                            >
                                                {dropLink.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={link.href}
                                    href={link.href!}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 ${scrolled
                                        ? 'text-slate-700 hover:text-blue-700'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                        {user ? (
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled
                                        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                        : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                                        }`}
                                >
                                    <FaUserCircle className="text-lg" />
                                    {user.name}
                                </button>

                                {/* Profile Dropdown */}
                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 border border-slate-100 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                                                <p className="text-xs text-slate-500">Masuk sebagai</p>
                                                <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                                            </div>
                                            {user.role === 'admin' && (
                                                <Link href="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                                    <FaTachometerAlt /> Dashboard Admin
                                                </Link>
                                            )}
                                            <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left border-t border-slate-100">
                                                <FaSignOutAlt /> Keluar
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className={`ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled
                                    ? 'bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-md hover:shadow-lg'
                                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                                    }`}
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-slate-700' : 'text-white'
                            }`}
                    >
                        {isOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t shadow-xl"
                    >
                        <div className="container-custom py-4 space-y-1">
                            {navLinks.map((link) => (
                                link.dropdown ? (
                                    <div key={link.label} className="py-1">
                                        <div className="px-4 py-2 text-slate-800 font-bold">{link.label}</div>
                                        <div className="pl-6 space-y-1">
                                            {link.dropdown.map((dropLink) => (
                                                <Link
                                                    key={dropLink.href}
                                                    href={dropLink.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-2 rounded-lg text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                                >
                                                    {dropLink.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href!}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                            {user ? (
                                <div className="mt-4 pt-4 border-t border-slate-100">
                                    <div className="px-4 py-2 text-slate-500 text-xs uppercase tracking-wider font-semibold">Akun Saya</div>
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        <FaUserCircle className="text-3xl text-blue-600" />
                                        <div>
                                            <p className="font-bold text-slate-800">{user.name}</p>
                                            <p className="text-xs text-slate-500">{user.role === 'admin' ? 'Administrator' : 'Pengguna'}</p>
                                        </div>
                                    </div>
                                    {user.role === 'admin' && (
                                        <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors mt-1">
                                            <FaTachometerAlt /> Dashboard Admin
                                        </Link>
                                    )}
                                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-1">
                                        <FaSignOutAlt /> Keluar
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 text-white font-semibold text-center mt-4"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
