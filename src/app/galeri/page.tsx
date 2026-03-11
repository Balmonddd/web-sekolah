'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaImages, FaSpinner } from 'react-icons/fa';
import GalleryGrid from '@/components/GalleryGrid';
import { supabase } from '@/lib/supabase';

interface GaleriItem {
    id: string;
    judul: string;
    gambar: string;
}

export default function GaleriPage() {
    const [images, setImages] = useState<GaleriItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('galeri')
                .select('*')
                .order('created_at', { ascending: false });
            if (!error && data) setImages(data);
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
                        <FaImages className="text-4xl mx-auto mb-4 text-blue-300" />
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Galeri Foto</h1>
                        <p className="text-blue-200 text-lg max-w-xl mx-auto">
                            Dokumentasi kegiatan dan momen berharga di lingkungan sekolah
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 bg-slate-50">
                <div className="container-custom">
                    {loading ? (
                        <div className="text-center py-20">
                            <FaSpinner className="animate-spin text-3xl text-blue-500 mx-auto mb-3" />
                            <p className="text-slate-400">Memuat galeri...</p>
                        </div>
                    ) : images.length === 0 ? (
                        <div className="text-center py-20">
                            <FaImages className="text-4xl text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-400 text-lg">Belum ada foto di galeri.</p>
                        </div>
                    ) : (
                        <GalleryGrid images={images} />
                    )}
                </div>
            </section>
        </div>
    );
}
