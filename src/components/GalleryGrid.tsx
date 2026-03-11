'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

interface GalleryGridProps {
    images: { id: string; judul: string; gambar: string }[];
    maxItems?: number;
}

export default function GalleryGrid({ images, maxItems }: GalleryGridProps) {
    const [lightbox, setLightbox] = useState<string | null>(null);
    const displayImages = maxItems ? images.slice(0, maxItems) : images;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayImages.map((img, index) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onClick={() => setLightbox(img.gambar)}
                        className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                    >
                        <Image
                            src={img.gambar}
                            alt={img.judul || 'Gallery'}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                            <p className="text-white text-sm font-medium">{img.judul}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightbox(null)}
                >
                    <button
                        onClick={() => setLightbox(null)}
                        className="absolute top-6 right-6 text-white text-3xl hover:text-red-400 transition-colors z-10"
                    >
                        <HiX />
                    </button>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-4xl max-h-[85vh] w-full h-full"
                    >
                        <Image
                            src={lightbox}
                            alt="Gallery"
                            fill
                            className="object-contain"
                        />
                    </motion.div>
                </div>
            )}
        </>
    );
}
