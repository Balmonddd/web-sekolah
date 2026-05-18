'use client';

import { motion } from 'framer-motion';
import { FaFlask, FaBook, FaFutbol, FaDesktop, FaMusic } from 'react-icons/fa';

const facilities = [
    {
        icon: FaFlask,
        title: 'Laboratorium IPA',
        description: 'Laboratorium lengkap untuk praktikum Fisika, Kimia, dan Biologi dengan peralatan modern.',
        color: 'from-blue-500 to-indigo-500',
    },
    {
        icon: FaBook,
        title: 'Perpustakaan',
        description: 'Perpustakaan digital dan konvensional dengan koleksi lebih dari 10.000 judul buku.',
        color: 'from-emerald-500 to-teal-500',
    },
    {
        icon: FaFutbol,
        title: 'Lapangan Olahraga',
        description: 'Lapangan serbaguna untuk basket, futsal, voli, dan lapangan atletik standar.',
        color: 'from-orange-500 to-red-500',
    },
    {
        icon: FaDesktop,
        title: 'Lab Komputer',
        description: 'Ruang komputer dengan 40 unit PC terbaru dan koneksi internet cepat.',
        color: 'from-purple-500 to-pink-500',
    },

    {
        icon: FaMusic,
        title: 'Ruang Seni',
        description: 'Ruang seni lengkap dengan alat musik dan perlengkapan kesenian.',
        color: 'from-rose-500 to-pink-500',
    },
];

export default function FacilitiesSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Fasilitas Sekolah</h2>
                    <p className="section-subtitle">Fasilitas lengkap untuk mendukung kegiatan belajar mengajar</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group p-6 rounded-2xl border border-slate-100 hover:border-blue-200 bg-white hover:bg-blue-50/30 transition-all duration-300 hover:shadow-lg"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${facility.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                <facility.icon className="text-2xl text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-800 mb-2">{facility.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{facility.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
