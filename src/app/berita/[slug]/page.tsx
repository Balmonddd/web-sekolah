'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowLeft, FaShareAlt, FaSpinner } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';
import { Berita } from '@/types';

export default function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [article, setArticle] = useState<Berita | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('berita')
                .select('*')
                .eq('slug', slug)
                .single();
            if (!error && data) setArticle(data);
            setLoading(false);
        };
        fetchArticle();
    }, [slug]);

    if (loading) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <FaSpinner className="animate-spin text-3xl text-blue-500" />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-20 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-slate-300 mb-4">404</h1>
                    <p className="text-slate-500 mb-6">Berita tidak ditemukan</p>
                    <Link href="/berita" className="btn-primary">
                        <FaArrowLeft /> Kembali ke Berita
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative h-[400px]">
                <Image
                    src={article.gambar || '/images/hero-bg.png'}
                    alt={article.judul}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="container-custom">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Link href="/berita" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
                                <FaArrowLeft /> Kembali ke Berita
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-3xl">
                                {article.judul}
                            </h1>
                            <div className="flex items-center gap-4 text-white/70 text-sm">
                                <span className="flex items-center gap-1.5">
                                    <FaCalendarAlt />
                                    {new Date(article.created_at).toLocaleDateString('id-ID', {
                                        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                                    })}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <FaUser />
                                    {article.penulis || 'Admin'}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg prose-slate max-w-none"
                            dangerouslySetInnerHTML={{ __html: article.konten || '' }}
                        />

                        {/* Share */}
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <div className="flex items-center gap-3">
                                <FaShareAlt className="text-slate-400" />
                                <span className="text-slate-500 text-sm">Bagikan artikel ini</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
