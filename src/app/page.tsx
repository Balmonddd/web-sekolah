'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import NewsCard from '@/components/NewsCard';
import FacilitiesSection from '@/components/FacilitiesSection';
import GalleryGrid from '@/components/GalleryGrid';
import { FaArrowRight, FaBullhorn, FaNewspaper, FaImages, FaSpinner } from 'react-icons/fa';
import { Berita } from '@/types';
import { supabase } from '@/lib/supabase';
interface PengumumanItem {
  id: string;
  judul: string;
  konten: string;
  tipe: string;
  tanggal: string;
  created_at: string;
}

interface GaleriItem {
  id: string;
  judul: string;
  gambar: string;
}

const tipeColors: Record<string, string> = {
  Ujian: 'bg-red-100 text-red-700',
  PPDB: 'bg-blue-100 text-blue-700',
  Informasi: 'bg-green-100 text-green-700',
  Kegiatan: 'bg-purple-100 text-purple-700',
};

export default function Home() {
  const [news, setNews] = useState<Berita[]>([]);
  const [announcements, setAnnouncements] = useState<PengumumanItem[]>([]);
  const [gallery, setGallery] = useState<GaleriItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch berita terbaru (3)
      const { data: beritaData } = await supabase.from('berita').select('*').order('created_at', { ascending: false }).limit(3);
      if (beritaData) setNews(beritaData);
      setLoadingNews(false);

      // Fetch pengumuman terbaru (4)
      const { data: pengumumanData } = await supabase.from('pengumuman').select('*').order('created_at', { ascending: false }).limit(4);
      if (pengumumanData) setAnnouncements(pengumumanData);
      setLoadingAnnouncements(false);

      // Fetch galeri (8)
      const { data: galeriData } = await supabase.from('galeri').select('*').order('created_at', { ascending: false }).limit(8);
      if (galeriData) setGallery(galeriData);
      setLoadingGallery(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Stats */}
      <StatsSection />

      {/* Berita Terbaru */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaNewspaper className="text-blue-600 text-2xl" />
              <h2 className="section-title !mb-0">Berita Terbaru</h2>
            </div>
            <p className="section-subtitle">Informasi dan kabar terkini dari sekolah kami</p>
          </motion.div>

          {loadingNews ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto" />
            </div>
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {news.map((berita, index) => (
                <NewsCard key={berita.id} berita={berita} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">Belum ada berita. Tambahkan melalui admin panel.</p>
            </div>
          )}

          <div className="text-center">
            <Link href="/berita" className="btn-primary">
              Lihat Semua Berita <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Pengumuman */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaBullhorn className="text-blue-600 text-2xl" />
              <h2 className="section-title !mb-0">Pengumuman</h2>
            </div>
            <p className="section-subtitle">Informasi penting yang perlu diketahui</p>
          </motion.div>

          {loadingAnnouncements ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto" />
            </div>
          ) : announcements.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {announcements.map((item, index) => (
                <motion.div
                  key={item.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-white border border-slate-100 rounded-xl hover:shadow-lg hover:border-blue-200 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${tipeColors[item.tipe] || 'bg-slate-100 text-slate-700'}`}>
                    {item.tipe || 'Info'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors truncate">
                      {item.judul}
                    </h4>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {new Date(item.tanggal || item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <FaArrowRight className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">Belum ada pengumuman.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/pengumuman" className="btn-secondary">
              Semua Pengumuman <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Fasilitas */}
      <FacilitiesSection />

      {/* Galeri */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-center gap-3 mb-2">
              <FaImages className="text-blue-600 text-2xl" />
              <h2 className="section-title !mb-0">Galeri Foto</h2>
            </div>
            <p className="section-subtitle">Momen-momen berharga kegiatan sekolah</p>
          </motion.div>

          {loadingGallery ? (
            <div className="text-center py-12">
              <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto" />
            </div>
          ) : gallery.length > 0 ? (
            <GalleryGrid images={gallery} maxItems={8} />
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">Belum ada foto di galeri.</p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/galeri" className="btn-primary">
              Lihat Semua Foto <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
