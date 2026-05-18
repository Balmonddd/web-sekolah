'use client';

import { motion } from 'framer-motion';
import { FaEye, FaBullseye } from 'react-icons/fa';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function VisiMisiPage() {
    return (
        <div className="pt-20 min-h-screen flex flex-col">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Visi & Misi</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Fondasi yang mengarahkan setiap langkah kami di SMA Negeri 1 Kota Nusantara
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-20 bg-slate-50 flex-grow">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Visi */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-blue-700 to-sky-600 text-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col justify-center"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                    <FaEye className="text-3xl" />
                                </div>
                                <h3 className="text-3xl font-bold">Visi</h3>
                            </div>
                            <p className="text-blue-100 leading-relaxed text-xl font-medium italic">
                                &ldquo;Menjadi sekolah unggulan yang menghasilkan lulusan berkarakter, berprestasi, dan berwawasan
                                global yang siap menjadi pemimpin masa depan.&rdquo;
                            </p>
                        </motion.div>

                        {/* Misi */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <FaBullseye className="text-3xl text-blue-700" />
                                </div>
                                <h3 className="text-3xl font-bold text-slate-800">Misi</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    'Menyelenggarakan pendidikan yang berkualitas dan inovatif',
                                    'Mengembangkan karakter siswa melalui pembiasaan nilai-nilai luhur',
                                    'Meningkatkan kompetensi guru melalui pelatihan berkelanjutan',
                                    'Membangun kerjasama dengan masyarakat dan dunia industri',
                                    'Memanfaatkan teknologi dalam proses pembelajaran',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-600 text-lg">
                                        <span className="mt-2 w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
