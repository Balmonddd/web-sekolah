'use client';

import { motion } from 'framer-motion';
import { FaGlobe, FaStar, FaLeaf } from 'react-icons/fa';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const programUnggulan = [
    {
        title: 'Kelas Internasional (Bilingual)',
        desc: 'Program kelas khusus yang menggunakan bahasa Inggris sebagai bahasa pengantar untuk beberapa mata pelajaran sains dan matematika, guna mempersiapkan siswa untuk pendidikan tinggi di luar negeri.',
        icon: <FaGlobe className="text-4xl text-blue-500" />
    },
    {
        title: 'Sekolah Adiwiyata',
        desc: 'Program pendidikan lingkungan hidup untuk menanamkan kepedulian terhadap kelestarian alam melalui kegiatan nyata seperti daur ulang, penghijauan, dan penghematan energi.',
        icon: <FaLeaf className="text-4xl text-green-500" />
    },
    {
        title: 'Bina Prestasi Olimpiade',
        desc: 'Pembinaan khusus bagi siswa yang memiliki potensi akademik tinggi untuk dipersiapkan mewakili sekolah dalam ajang Olimpiade Sains tingkat nasional dan internasional.',
        icon: <FaStar className="text-4xl text-amber-400" />
    }
];

export default function ProgramUnggulanPage() {
    return (
        <div className="pt-20 min-h-screen flex flex-col bg-slate-50">
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Program Unggulan</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Program spesial yang dirancang khusus untuk menciptakan lulusan yang kompetitif dan peduli terhadap lingkungan.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 flex-grow">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {programUnggulan.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
                            >
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-4">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
