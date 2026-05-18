'use client';

import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const prestasiList = [
    {
        tahun: '2025',
        judul: 'Juara 1 Olimpiade Sains Nasional (OSN) Bidang Fisika',
        tingkat: 'Nasional',
        deskripsi: 'Meraih medali emas pada kompetisi sains tingkat nasional yang diselenggarakan oleh Kementerian Pendidikan.'
    },
    {
        tahun: '2024',
        judul: 'Juara Umum Lomba Cerdas Cermat',
        tingkat: 'Provinsi',
        deskripsi: 'Tim cerdas cermat SMAN 1 berhasil menyabet piala bergilir Gubernur setelah mengalahkan 50 sekolah lain.'
    },
    {
        tahun: '2024',
        judul: 'Medali Emas Kejuaraan Pencak Silat Pelajar',
        tingkat: 'Nasional',
        deskripsi: 'Prestasi gemilang di bidang non-akademik pada kejuaraan pencak silat antar pelajar seluruh Indonesia.'
    },
    {
        tahun: '2023',
        judul: 'Sekolah Adiwiyata Mandiri',
        tingkat: 'Nasional',
        deskripsi: 'Penghargaan tertinggi di bidang lingkungan hidup untuk sekolah yang berkomitmen terhadap pelestarian lingkungan.'
    },
    {
        tahun: '2023',
        judul: 'Juara 2 Lomba Debat Bahasa Inggris',
        tingkat: 'Nasional',
        deskripsi: 'Tim debat bahasa Inggris sekolah berhasil meraih posisi runner-up pada kompetisi debat tahunan.'
    },
    {
        tahun: '2022',
        judul: 'Juara 1 Festival Seni Siswa Nasional (FLS2N)',
        tingkat: 'Nasional',
        deskripsi: 'Kemenangan luar biasa pada cabang tari kreasi tradisional.'
    }
];

export default function PrestasiPage() {
    return (
        <div className="pt-20 min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Prestasi Sekolah</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Daftar pencapaian membanggakan dari siswa-siswi dan institusi SMAN 1 Kota Nusantara
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 flex-grow">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {prestasiList.map((prestasi, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="flex items-start justify-between mb-6 relative">
                                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center">
                                        <FaTrophy className="text-2xl text-amber-500" />
                                    </div>
                                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full">
                                        {prestasi.tahun}
                                    </span>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-500">
                                        {prestasi.tingkat === 'Nasional' ? <FaStar className="text-amber-400" /> : <FaMedal className="text-slate-400" />}
                                        Tingkat {prestasi.tingkat}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                                        {prestasi.judul}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {prestasi.deskripsi}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
