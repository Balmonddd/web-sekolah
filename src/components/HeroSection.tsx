'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaArrowRight, FaUserGraduate } from 'react-icons/fa';

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/hero-bg.png')" }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/75 to-sky-900/80" />

            {/* Floating Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom text-center text-white px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                        <FaUserGraduate className="text-sky-300" />
                        <span className="text-sm font-medium text-white/90">Sekolah Unggulan Terakreditasi A</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
                        Selamat Datang di
                        <br />
                        <span className="bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                            SMA Negeri 1
                        </span>
                        <br />
                        Kota Nusantara
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Mencetak generasi unggul, berkarakter, dan berwawasan global melalui
                        pendidikan berkualitas dan lingkungan belajar yang inspiratif.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/profil" className="btn-primary text-lg py-4 px-8">
                            Profil Sekolah
                            <FaArrowRight />
                        </Link>
                        <Link href="/ppdb" className="btn-primary text-lg py-4 px-8">
                            PPDB Online
                            <FaUserGraduate />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 fill-slate-50">
                    <path d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
                </svg>
            </div>
        </section>
    );
}
