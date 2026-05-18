'use client';

import { motion } from 'framer-motion';
import { FaBookOpen, FaChalkboardTeacher, FaLaptopCode, FaMicroscope } from 'react-icons/fa';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

const academicPrograms = [
    {
        title: 'MIPA (Matematika dan Ilmu Pengetahuan Alam)',
        description: 'Program peminatan bagi siswa yang memiliki minat dan bakat di bidang sains, matematika, dan teknologi. Lulusan program ini dipersiapkan untuk melanjutkan pendidikan ke jurusan teknik, kedokteran, dan ilmu murni.',
        icon: <FaMicroscope className="text-4xl text-blue-500" />
    },
    {
        title: 'IPS (Ilmu Pengetahuan Sosial)',
        description: 'Program peminatan untuk siswa yang tertarik mempelajari ilmu-ilmu sosial, ekonomi, geografi, dan sejarah. Mempersiapkan siswa untuk masuk ke fakultas ekonomi, hukum, ilmu politik, dan humaniora.',
        icon: <FaBookOpen className="text-4xl text-blue-500" />
    },
    {
        title: 'Pembelajaran Berbasis Digital',
        description: 'Implementasi e-learning dan pemanfaatan teknologi digital dalam kegiatan belajar mengajar sehari-hari untuk membiasakan siswa dengan ekosistem digital.',
        icon: <FaLaptopCode className="text-4xl text-blue-500" />
    },
    {
        title: 'Bimbingan UTBK & SNBT',
        description: 'Program intensif tambahan bagi siswa kelas 12 untuk persiapan menghadapi seleksi masuk Perguruan Tinggi Negeri (PTN) favorit.',
        icon: <FaChalkboardTeacher className="text-4xl text-blue-500" />
    }
];

export default function AkademikPage() {
    return (
        <div className="pt-20 min-h-screen flex flex-col bg-slate-50">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Program Akademik</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Kurikulum dan program pembelajaran unggulan untuk memaksimalkan potensi akademis setiap siswa.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content */}
            <section className="py-20 flex-grow">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {academicPrograms.map((prog, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                    {prog.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-4">{prog.title}</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {prog.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
