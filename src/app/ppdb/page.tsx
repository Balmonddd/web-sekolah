'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaCheckCircle, FaSpinner, FaDownload, FaFileAlt, FaFilePdf, FaCalendarAlt, FaBullhorn } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { generateFormulirPDF } from '@/lib/generateFormulirPDF';

export default function PPDBPage() {
    const [formData, setFormData] = useState({
        nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: '',
        alamat: '', nama_ortu: '', telepon: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [downloading, setDownloading] = useState(false);
    const [pengumuman, setPengumuman] = useState<any[]>([]);

    useEffect(() => {
        const fetchPengumuman = async () => {
            const { data } = await supabase
                .from('pengumuman')
                .select('*')
                .eq('tipe', 'PPDB')
                .order('created_at', { ascending: false });
            if (data) setPengumuman(data);
        };
        fetchPengumuman();
    }, []);

    const handleDownloadFormulir = () => {
        setDownloading(true);
        try {
            generateFormulirPDF();
        } catch {
            setError('Gagal mengunduh formulir. Silakan coba lagi.');
        }
        setTimeout(() => setDownloading(false), 1500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: dbError } = await supabase.from('ppdb').insert({
            nama: formData.nama,
            tempat_lahir: formData.tempat_lahir,
            tanggal_lahir: formData.tanggal_lahir,
            jenis_kelamin: formData.jenis_kelamin,
            alamat: formData.alamat,
            nama_ortu: formData.nama_ortu,
            telepon: formData.telepon,
        });

        if (dbError) {
            setError('Gagal menyimpan data. Silakan coba lagi.');
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (success) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md mx-auto"
                >
                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Pendaftaran Berhasil!</h2>
                    <p className="text-slate-500 mb-6">
                        Data pendaftaran Anda telah berhasil disimpan. Tim kami akan menghubungi Anda untuk informasi selanjutnya.
                    </p>
                    <button
                        onClick={() => { setSuccess(false); setFormData({ nama: '', tempat_lahir: '', tanggal_lahir: '', jenis_kelamin: '', alamat: '', nama_ortu: '', telepon: '' }); }}
                        className="btn-primary"
                    >
                        Daftar Lagi
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <FaUserGraduate className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">PPDB Online</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Pendaftaran Peserta Didik Baru Tahun Ajaran 2025/2026
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pengumuman Khusus PPDB */}
            {pengumuman.length > 0 && (
                <section className="py-8 bg-blue-50/50">
                    <div className="container-custom max-w-3xl">
                        <div className="space-y-4">
                            {pengumuman.map((p) => (
                                <motion.div 
                                    key={p.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white border-l-4 border-blue-600 rounded-r-2xl rounded-l-md p-6 shadow-sm flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                        <FaBullhorn className="text-blue-600 text-xl" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-bold text-slate-800 text-lg">{p.judul}</h3>
                                            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">
                                                {new Date(p.tanggal || p.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{p.konten}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Info */}
            <section className="py-8 bg-white">
                <div className="container-custom max-w-3xl">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                        <h3 className="font-bold text-blue-800 mb-3">Persyaratan Pendaftaran</h3>
                        <ul className="text-blue-700 text-sm space-y-2">
                            <li>• Lulusan SMP/MTs sederajat</li>
                            <li>• Memiliki ijazah atau Surat Keterangan Lulus</li>
                            <li>• Menyertakan rapor semester 1-5</li>
                            <li>• Pas foto terbaru ukuran 3x4 (2 lembar)</li>
                            <li>• fotocopy kartu keluarga</li>
                            <li>• fotocopy akte kelahiran</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Jadwal Kegiatan */}
            <section className="py-8 bg-slate-50 border-y border-slate-100">
                <div className="container-custom max-w-3xl">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
                                <FaCalendarAlt className="text-amber-600 text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Jadwal Kegiatan PPDB</h2>
                                <p className="text-slate-500 text-sm mt-1">Jadwal dapat berubah sewaktu-waktu</p>
                            </div>
                        </div>
                        
                        <div className="space-y-0">
                            {[
                                { title: 'Pendaftaran Online', date: '1 - 15 Juni 2025', desc: 'Pengisian formulir pendaftaran melalui website resmi sekolah.' },
                                { title: 'Verifikasi Berkas', date: '16 - 20 Juni 2025', desc: 'Penyerahan berkas fisik dan verifikasi data oleh panitia PPDB.' },
                                { title: 'Tes Seleksi', date: '22 Juni 2025', desc: 'Pelaksanaan tes tertulis (Matematika, IPA, IPS, Bahasa Inggris).' },
                                { title: 'Pengumuman Hasil', date: '25 Juni 2025', desc: 'Pengumuman siswa yang diterima melalui website dan papan pengumuman.' },
                                { title: 'Daftar Ulang', date: '26 - 30 Juni 2025', desc: 'Proses daftar ulang bagi siswa yang dinyatakan lulus seleksi.' },
                            ].map((item, i, arr) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-5 h-5 rounded-full bg-amber-400 border-4 border-amber-100 mt-0.5 z-10 shrink-0"></div>
                                        {i !== arr.length - 1 && <div className="w-0.5 h-full bg-slate-200 -mt-2"></div>}
                                    </div>
                                    <div className={`pb-8 ${i === arr.length - 1 ? 'pb-0' : ''}`}>
                                        <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.title}</h4>
                                        <p className="text-amber-600 font-semibold text-sm mb-2">{item.date}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Download Formulir */}
            <section className="py-8 bg-white">
                <div className="container-custom max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                                <FaFilePdf className="text-emerald-600 text-2xl" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-emerald-800 mb-1">Download Formulir Pendaftaran</h3>
                                <p className="text-emerald-700 text-sm mb-4">
                                    Unduh formulir pendaftaran siswa baru, cetak dan isi dengan lengkap, lalu serahkan ke sekolah saat pendaftaran ulang.
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <button
                                        onClick={handleDownloadFormulir}
                                        disabled={downloading}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm"
                                    >
                                        {downloading ? (
                                            <>
                                                <FaSpinner className="animate-spin" />
                                                Mengunduh...
                                            </>
                                        ) : (
                                            <>
                                                <FaDownload />
                                                Download Formulir (PDF)
                                            </>
                                        )}
                                    </button>
                                    <div className="flex items-center gap-2 text-xs text-emerald-600">
                                        <FaFileAlt />
                                        <span>Formulir Pendaftaran Siswa Baru SMA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Form */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom max-w-3xl">
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl p-8 md:p-10 shadow-xl"
                    >
                        <h2 className="text-2xl font-bold text-slate-800 mb-8">Formulir Pendaftaran Online</h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap *</label>
                                <input type="text" name="nama" required value={formData.nama} onChange={handleChange} placeholder="Masukkan nama lengkap"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tempat Lahir *</label>
                                <input type="text" name="tempat_lahir" required value={formData.tempat_lahir} onChange={handleChange} placeholder="Kota kelahiran"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tanggal Lahir *</label>
                                <input type="date" name="tanggal_lahir" required value={formData.tanggal_lahir} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Jenis Kelamin *</label>
                                <select name="jenis_kelamin" required value={formData.jenis_kelamin} onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white">
                                    <option value="">Pilih jenis kelamin</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon *</label>
                                <input type="tel" name="telepon" required value={formData.telepon} onChange={handleChange} placeholder="08xxxxxxxxxx"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap *</label>
                                <textarea name="alamat" required value={formData.alamat} onChange={handleChange} rows={3} placeholder="Masukkan alamat lengkap"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Orang Tua / Wali *</label>
                                <input type="text" name="nama_ortu" required value={formData.nama_ortu} onChange={handleChange} placeholder="Masukkan nama orang tua/wali"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-8 py-4 text-lg disabled:opacity-50">
                            {loading ? <><FaSpinner className="animate-spin" /> Mengirim...</> : 'Daftar Sekarang'}
                        </button>
                    </motion.form>
                </div>
            </section>
        </div>
    );
}
