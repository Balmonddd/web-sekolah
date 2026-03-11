'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBullhorn, FaCalendarAlt, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface PengumumanItem {
    id: string;
    judul: string;
    konten: string;
    tipe: string;
    tanggal: string;
    created_at: string;
}

const tipeColors: Record<string, string> = {
    Ujian: 'bg-red-500',
    PPDB: 'bg-blue-500',
    Informasi: 'bg-green-500',
    Kegiatan: 'bg-purple-500',
    Beasiswa: 'bg-amber-500',
    Ekstrakurikuler: 'bg-cyan-500',
};

export default function PengumumanPage() {
    const [pengumuman, setPengumuman] = useState<PengumumanItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('pengumuman')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) setPengumuman(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <FaBullhorn className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Pengumuman</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Informasi penting seputar kegiatan dan kebijakan sekolah
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* List */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom max-w-4xl">
                    {loading ? (
                        <div className="text-center py-20">
                            <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto mb-3" />
                            <p className="text-slate-400">Memuat pengumuman...</p>
                        </div>
                    ) : pengumuman.length === 0 ? (
                        <div className="text-center py-20">
                            <FaBullhorn className="text-4xl text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 text-lg">Belum ada pengumuman.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {pengumuman.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
                                >
                                    <div className="flex">
                                        <div className={`w-2 ${tipeColors[item.tipe] || 'bg-slate-500'} shrink-0`} />
                                        <div className="p-6 flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className={`${tipeColors[item.tipe] || 'bg-slate-500'} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                                                    {item.tipe || 'Informasi'}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-sm text-slate-400">
                                                    <FaCalendarAlt className="text-xs" />
                                                    {new Date(item.tanggal || item.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'long', year: 'numeric',
                                                    })}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg text-slate-800 mb-2">{item.judul}</h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">{item.konten}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Info */}
            <section className="py-12 bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex items-start gap-4">
                        <FaInfoCircle className="text-blue-600 text-xl shrink-0 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-800 mb-1">Informasi</h4>
                            <p className="text-blue-700 text-sm">
                                Untuk informasi lebih lanjut mengenai pengumuman di atas, silakan hubungi pihak sekolah
                                melalui halaman <a href="/kontak" className="underline font-semibold">Kontak</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
