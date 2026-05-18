'use client';

import { motion } from 'framer-motion';
import { FaFutbol, FaMusic, FaPencilAlt, FaCampground, FaTheaterMasks, FaCode } from 'react-icons/fa';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const ekstrakurikuler = [
    { title: 'Pramuka', desc: 'Kegiatan wajib untuk melatih kedisiplinan, kemandirian, dan kepemimpinan.', icon: <FaCampground className="text-4xl text-amber-600" /> },
    { title: 'Olahraga', desc: 'Futsal, Basket, Voli, dan Bulu Tangkis untuk menyalurkan bakat atletik.', icon: <FaFutbol className="text-4xl text-emerald-600" /> },
    { title: 'Seni Musik & Tari', desc: 'Wadah bagi siswa yang berminat di bidang seni suara, instrumen, dan tarian tradisional/modern.', icon: <FaMusic className="text-4xl text-pink-500" /> },
    { title: 'Karya Ilmiah Remaja (KIR)', desc: 'Ekstrakurikuler bagi siswa yang menyukai penelitian dan penulisan karya ilmiah.', icon: <FaPencilAlt className="text-4xl text-sky-500" /> },
    { title: 'Teater & Drama', desc: 'Mengembangkan bakat akting, pementasan, dan seni peran panggung.', icon: <FaTheaterMasks className="text-4xl text-purple-500" /> },
    { title: 'Klub Komputer (IT Club)', desc: 'Ekskul pemrograman, desain grafis, dan pemahaman teknologi digital terkini.', icon: <FaCode className="text-4xl text-slate-700" /> },
];

export default function EkstrakurikulerPage() {
    return (
        <div className="pt-20 min-h-screen flex flex-col bg-slate-50">
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Ekstrakurikuler</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Menyediakan berbagai wadah untuk pengembangan bakat, minat, dan kreativitas siswa di luar jam akademik.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-20 flex-grow">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {ekstrakurikuler.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all flex flex-col items-center text-center"
                            >
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
