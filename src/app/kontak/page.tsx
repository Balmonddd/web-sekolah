'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

export default function KontakPage() {
    const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: dbError } = await supabase.from('kontak').insert({
            nama: formData.nama,
            email: formData.email,
            pesan: formData.pesan,
        });

        if (dbError) {
            setError('Gagal mengirim pesan. Silakan coba lagi.');
        } else {
            setSuccess(true);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        { icon: FaMapMarkerAlt, label: 'Alamat', value: 'Jl. Pendidikan No. 123, Kota Nusantara, Indonesia 12345', color: 'bg-blue-100 text-blue-600' },
        { icon: FaPhone, label: 'Telepon', value: '(021) 123-4567', color: 'bg-green-100 text-green-600' },
        { icon: FaEnvelope, label: 'Email', value: 'info@sman1nusantara.sch.id', color: 'bg-purple-100 text-purple-600' },
        { icon: FaClock, label: 'Jam Operasional', value: 'Senin - Jumat: 07:00 - 15:00', color: 'bg-amber-100 text-amber-600' },
    ];

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <FaPaperPlane className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Hubungi Kami</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Kami senang mendengar dari Anda. Silakan hubungi kami melalui form di bawah ini.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                        {contactInfo.map((item, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-all border border-slate-100">
                                <div className={`w-14 h-14 mx-auto mb-3 rounded-xl ${item.color} flex items-center justify-center`}>
                                    <item.icon className="text-2xl" />
                                </div>
                                <h4 className="font-semibold text-slate-800 text-sm mb-1">{item.label}</h4>
                                <p className="text-slate-500 text-sm">{item.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Google Maps */}
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-full min-h-[400px]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3d2ad6e1e0e9bcc8!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1699999999999!5m2!1sid!2sid"
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Lokasi Sekolah" />
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            {success ? (
                                <div className="bg-white rounded-3xl p-12 text-center shadow-xl h-full flex flex-col items-center justify-center">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                                        <FaCheckCircle className="text-green-500 text-4xl" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-3">Pesan Terkirim!</h3>
                                    <p className="text-slate-500 mb-6">Terima kasih telah menghubungi kami. Kami akan segera merespon pesan Anda.</p>
                                    <button onClick={() => { setSuccess(false); setFormData({ nama: '', email: '', pesan: '' }); }} className="btn-primary">
                                        Kirim Pesan Lagi
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-xl">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Kirim Pesan</h3>

                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6">{error}</div>
                                    )}

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap *</label>
                                            <input type="text" name="nama" required value={formData.nama} onChange={handleChange} placeholder="Masukkan nama Anda"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@contoh.com"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan *</label>
                                            <textarea name="pesan" required value={formData.pesan} onChange={handleChange} rows={5} placeholder="Tulis pesan Anda..."
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none" />
                                        </div>
                                    </div>

                                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-6 py-4 disabled:opacity-50">
                                        {loading ? <><FaSpinner className="animate-spin" /> Mengirim...</> : <><FaPaperPlane /> Kirim Pesan</>}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
