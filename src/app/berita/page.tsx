'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '@/components/NewsCard';
import { Berita } from '@/types';
import { FaNewspaper, FaSearch, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

const ITEMS_PER_PAGE = 6;

export default function BeritaPage() {
    const [allNews, setAllNews] = useState<Berita[]>([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('berita')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) setAllNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    const filtered = allNews.filter((n) =>
        n.judul.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginatedNews = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="pt-20">
            {/* Header */}
            <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-sky-600 text-white py-20">
                <div className="container-custom text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <FaNewspaper className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Berita Sekolah</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Informasi terkini seputar kegiatan dan prestasi sekolah
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search */}
            <section className="py-8 bg-slate-50">
                <div className="container-custom">
                    <div className="max-w-md mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Cari berita..." value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm" />
                    </div>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-20">
                            <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto mb-3" />
                            <p className="text-slate-400">Memuat berita...</p>
                        </div>
                    ) : paginatedNews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedNews.map((berita, index) => (
                                <NewsCard key={berita.id} berita={berita} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <FaNewspaper className="text-4xl text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 text-lg">Belum ada berita.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button key={p} onClick={() => setPage(p)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${page === p
                                            ? 'bg-blue-700 text-white shadow-lg'
                                            : 'bg-white text-slate-600 hover:bg-blue-50 border border-slate-200'
                                        }`}>{p}</button>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
