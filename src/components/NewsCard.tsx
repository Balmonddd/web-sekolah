'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Berita } from '@/types';

interface NewsCardProps {
    berita: Berita;
    index?: number;
}

export default function NewsCard({ berita, index = 0 }: NewsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
        >
            <Link href={`/berita/${berita.slug}`} className="card group block h-full">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                    <Image
                        src={berita.gambar || '/images/hero-bg.png'}
                        alt={berita.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            <FaCalendarAlt className="text-[10px]" />
                            {new Date(berita.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            })}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                        {berita.judul}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                        {berita.konten?.replace(/<[^>]+>/g, '').substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                            <FaUser />
                            {berita.penulis || 'Admin'}
                        </span>
                        <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold group-hover:gap-2 transition-all">
                            Baca <FaArrowRight className="text-xs" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
