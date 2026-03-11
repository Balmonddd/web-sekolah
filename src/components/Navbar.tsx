'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import Image from 'next/image';

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/profil', label: 'Profil' },
    { href: '/berita', label: 'Berita' },
    { href: '/pengumuman', label: 'Pengumuman' },
    { href: '/galeri', label: 'Galeri' },
    { href: '/ppdb', label: 'PPDB' },
    { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-blue-50 ${scrolled
                                    ? 'text-slate-700 hover:text-blue-700'
                                    : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className={`ml-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled
                                ? 'bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-md hover:shadow-lg'
                                : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                                }`}
                        >
                            Login
                        </Link>
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
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 rounded-lg text-slate-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-sky-500 text-white font-semibold text-center mt-2"
                            >
                                Login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
