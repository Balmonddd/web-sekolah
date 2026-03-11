'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaUsers, FaGraduationCap, FaQuoteLeft } from 'react-icons/fa';

const teachers = [
    { nama: 'Drs. Ahmad Sudrajat, M.Pd.', jabatan: 'Kepala Sekolah', bidang: 'Manajemen Pendidikan' },
    { nama: 'Sri Wahyuni, S.Pd., M.Si.', jabatan: 'Wakil Kepala Sekolah', bidang: 'Kurikulum' },
    { nama: 'Dr. Bambang Hartono, M.Pd.', jabatan: 'Guru Senior', bidang: 'Matematika' },
    { nama: 'Rina Sari, S.Pd.', jabatan: 'Guru', bidang: 'Bahasa Indonesia' },
    { nama: 'Muhammad Rizki, S.Pd.', jabatan: 'Guru', bidang: 'Bahasa Inggris' },
    { nama: 'Dewi Kusuma, S.Si.', jabatan: 'Guru', bidang: 'Fisika' },
    { nama: 'Agus Prasetyo, S.Pd.', jabatan: 'Guru', bidang: 'Biologi' },
    { nama: 'Lestari Handayani, S.Pd.', jabatan: 'Guru', bidang: 'Kimia' },
];

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function ProfilPage() {
    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Profil Sekolah</h1>
                        <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                            Mengenal lebih dekat SMA Negeri 1 Kota Nusantara, sekolah unggulan yang terus berinovasi
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sejarah */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div {...fadeInUp}>
                        <h2 className="section-title">Sejarah Sekolah</h2>
                        <div className="max-w-3xl mx-auto text-slate-600 leading-relaxed space-y-4">
                            <p>
                                SMA Negeri 1 Kota Nusantara didirikan pada tahun 1985 dengan semangat untuk mencerdaskan kehidupan
                                bangsa. Bermula dari sebuah bangunan sederhana dengan hanya 3 ruang kelas dan 60 siswa, sekolah ini
                                terus berkembang menjadi salah satu sekolah terbaik di Kota Nusantara.
                            </p>
                            <p>
                                Selama hampir 40 tahun berdiri, SMAN 1 Kota Nusantara telah menghasilkan ribuan alumni yang tersebar
                                di berbagai bidang profesional, baik di dalam maupun luar negeri. Sekolah ini telah meraih akreditasi
                                A sejak tahun 2005 dan terus mempertahankannya hingga saat ini.
                            </p>
                            <p>
                                Dengan komitmen terhadap pendidikan berkualitas, SMAN 1 Kota Nusantara terus berinovasi dalam metode
                                pembelajaran, fasilitas, dan pengembangan karakter siswa untuk mencetak generasi yang siap menghadapi
                                tantangan global.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Visi Misi */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom">
                    <motion.div {...fadeInUp}>
                        <h2 className="section-title">Visi & Misi</h2>
                        <p className="section-subtitle">Fondasi yang mengarahkan setiap langkah kami</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Visi */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-blue-700 to-sky-600 text-white p-8 rounded-2xl shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                    <FaEye className="text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold">Visi</h3>
                            </div>
                            <p className="text-blue-100 leading-relaxed text-lg">
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
                            className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <FaBullseye className="text-2xl text-blue-700" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Misi</h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    'Menyelenggarakan pendidikan yang berkualitas dan inovatif',
                                    'Mengembangkan karakter siswa melalui pembiasaan nilai-nilai luhur',
                                    'Meningkatkan kompetensi guru melalui pelatihan berkelanjutan',
                                    'Membangun kerjasama dengan masyarakat dan dunia industri',
                                    'Memanfaatkan teknologi dalam proses pembelajaran',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sambutan Kepala Sekolah */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div {...fadeInUp}>
                        <h2 className="section-title">Sambutan Kepala Sekolah</h2>
                    </motion.div>

                    <div className="max-w-4xl mx-auto mt-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12 shadow-lg border border-blue-100"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="shrink-0">
                                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl ring-4 ring-blue-200">
                                        <Image
                                            src="/images/kepala-sekolah.png"
                                            alt="Kepala Sekolah"
                                            width={192}
                                            height={192}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h4 className="font-bold text-slate-800">Drs. Ahmad Sudrajat, M.Pd.</h4>
                                        <p className="text-sm text-blue-600">Kepala Sekolah</p>
                                    </div>
                                </div>
                                <div>
                                    <FaQuoteLeft className="text-3xl text-blue-300 mb-4" />
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Assalamualaikum Warahmatullahi Wabarakatuh. Puji syukur kita panjatkan kehadirat Allah SWT atas
                                        segala rahmat dan karunia-Nya. Selamat datang di website resmi SMA Negeri 1 Kota Nusantara.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed mb-4">
                                        Kami berkomitmen untuk memberikan pendidikan terbaik bagi seluruh siswa. Melalui kurikulum yang
                                        inovatif, pengajar yang berkualitas, dan fasilitas yang memadai, kami yakin dapat mencetak
                                        generasi muda yang unggul dan berkarakter.
                                    </p>
                                    <p className="text-slate-600 leading-relaxed">
                                        Semoga website ini dapat menjadi sarana informasi yang bermanfaat bagi seluruh civitas akademika
                                        dan masyarakat. Terima kasih atas kunjungannya.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Struktur Organisasi */}
            <section className="py-20 bg-slate-50">
                <div className="container-custom">
                    <motion.div {...fadeInUp}>
                        <h2 className="section-title">Struktur Organisasi</h2>
                        <p className="section-subtitle">Susunan kepengurusan sekolah</p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        {/* Kepala Sekolah */}
                        <motion.div {...fadeInUp} className="flex justify-center mb-6">
                            <div className="bg-gradient-to-br from-blue-700 to-sky-600 text-white px-8 py-4 rounded-2xl text-center shadow-lg">
                                <FaGraduationCap className="text-2xl mx-auto mb-2" />
                                <p className="font-bold">Drs. Ahmad Sudrajat, M.Pd.</p>
                                <p className="text-sm text-blue-200">Kepala Sekolah</p>
                            </div>
                        </motion.div>

                        {/* Wakil */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            {[
                                { nama: 'Sri Wahyuni, S.Pd., M.Si.', jabatan: 'Waka Kurikulum' },
                                { nama: 'Hendra Saputra, S.Pd.', jabatan: 'Waka Kesiswaan' },
                                { nama: 'Siti Nurhaliza, S.Pd.', jabatan: 'Waka Sarpras' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white px-6 py-4 rounded-xl text-center shadow-md border border-blue-100"
                                >
                                    <p className="font-semibold text-slate-800 text-sm">{item.nama}</p>
                                    <p className="text-xs text-blue-600 mt-1">{item.jabatan}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Data Guru */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div {...fadeInUp}>
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <FaUsers className="text-blue-600 text-2xl" />
                            <h2 className="section-title !mb-0">Data Guru</h2>
                        </div>
                        <p className="section-subtitle">Tenaga pendidik profesional dan berdedikasi</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teachers.map((guru, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className="bg-white rounded-2xl p-6 text-center border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg">
                                    <span className="text-white text-2xl font-bold">{guru.nama.charAt(0)}</span>
                                </div>
                                <h4 className="font-bold text-slate-800 text-sm mb-1">{guru.nama}</h4>
                                <p className="text-blue-600 text-xs font-semibold mb-1">{guru.jabatan}</p>
                                <p className="text-slate-400 text-xs">{guru.bidang}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
