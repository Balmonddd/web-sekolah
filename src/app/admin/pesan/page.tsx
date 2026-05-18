'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaSpinner, FaEnvelope, FaEnvelopeOpenText } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface PesanItem {
    id: string;
    nama: string;
    email: string;
    pesan: string;
    created_at: string;
}

export default function AdminPesanPage() {
    const [pesan, setPesan] = useState<PesanItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedPesan, setSelectedPesan] = useState<PesanItem | null>(null);
    const [readIds, setReadIds] = useState<string[]>([]);

    const fetchPesan = async () => {
        setLoading(true);
        setErrorMsg('');
        const { data, error } = await supabase
            .from('kontak')
            .select('*')
            .order('created_at', { ascending: false });
            
        if (error) {
            setErrorMsg('Gagal memuat pesan. Pastikan tabel "kontak" sudah dibuat di Supabase.');
        } else if (data) {
            setPesan(data);
        }
        setLoading(false);
    };

    useEffect(() => { 
        fetchPesan(); 
        setReadIds(JSON.parse(localStorage.getItem('read_messages') || '[]'));
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Yakin ingin menghapus pesan ini?')) {
            await supabase.from('kontak').delete().eq('id', id);
            if (selectedPesan?.id === id) setSelectedPesan(null);
            
            // Clean up readIds just in case, though not strictly necessary
            const newReadIds = readIds.filter(readId => readId !== id);
            localStorage.setItem('read_messages', JSON.stringify(newReadIds));
            setReadIds(newReadIds);
            window.dispatchEvent(new Event('pesanRead'));
            
            fetchPesan();
        }
    };

    const handleSelectPesan = (item: PesanItem) => {
        setSelectedPesan(item);
        
        const currentReadIds = JSON.parse(localStorage.getItem('read_messages') || '[]');
        if (!currentReadIds.includes(item.id)) {
            const newReadIds = [...currentReadIds, item.id];
            localStorage.setItem('read_messages', JSON.stringify(newReadIds));
            setReadIds(newReadIds);
            window.dispatchEvent(new Event('pesanRead'));
        }
    };

    return (
        <div className="h-[calc(100vh-120px)] flex flex-col">
            <div className="mb-6 shrink-0">
                <h1 className="text-2xl font-bold text-slate-800">Pesan Masuk</h1>
                <p className="text-slate-500 text-sm">Lihat dan kelola pesan dari pengunjung website</p>
            </div>

            {errorMsg && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-200 shrink-0">
                    {errorMsg}
                </div>
            )}

            <div className="flex-1 flex gap-6 overflow-hidden">
                {/* List Pesan */}
                <div className="w-1/3 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h2 className="font-semibold text-slate-700">Kotak Masuk ({pesan.length})</h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-8 text-center">
                                <FaSpinner className="animate-spin text-xl text-blue-500 mx-auto mb-2" />
                            </div>
                        ) : pesan.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-sm">
                                Belum ada pesan masuk.
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {pesan.map((item) => {
                                    const isRead = readIds.includes(item.id);
                                    return (
                                    <button 
                                        key={item.id} 
                                        onClick={() => handleSelectPesan(item)}
                                        className={`w-full text-left p-4 hover:bg-blue-50/50 transition-colors ${selectedPesan?.id === item.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'border-l-4 border-transparent'} ${!isRead ? 'bg-white' : 'bg-slate-50/50 opacity-80'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`text-sm line-clamp-1 ${!isRead ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'}`}>{item.nama}</h3>
                                            <span className={`text-xs whitespace-nowrap ml-2 ${!isRead ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                                                {new Date(item.created_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <p className={`text-xs line-clamp-2 ${!isRead ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{item.pesan}</p>
                                    </button>
                                )})}
                            </div>
                        )}
                    </div>
                </div>

                {/* Detail Pesan */}
                <div className="w-2/3 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                    {selectedPesan ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
                            <div className="p-6 border-b border-slate-100 flex items-start justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 mb-1">{selectedPesan.nama}</h2>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <FaEnvelope className="text-slate-400" />
                                        <a href={`mailto:${selectedPesan.email}`} className="hover:text-blue-600 transition-colors">{selectedPesan.email}</a>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-3">
                                    <span className="text-sm text-slate-400">
                                        {new Date(selectedPesan.created_at).toLocaleString('id-ID')}
                                    </span>
                                    <button onClick={() => handleDelete(selectedPesan.id)} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                                        <FaTrash /> Hapus Pesan
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex-1 overflow-y-auto">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {selectedPesan.pesan}
                                </p>
                            </div>
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                                <a href={`mailto:${selectedPesan.email}`} className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm">
                                    <FaEnvelope /> Balas via Email
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-slate-400">
                            <FaEnvelopeOpenText className="text-6xl mb-4 text-slate-200" />
                            <p>Pilih pesan di samping untuk membaca</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
