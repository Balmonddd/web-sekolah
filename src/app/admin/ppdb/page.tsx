'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaSearch, FaDownload, FaEye, FaTimes, FaSpinner, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { supabase } from '@/lib/supabase';

interface PPDBItem {
    id: string;
    nama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    alamat: string;
    nama_ortu: string;
    telepon: string;
    dokumen: string;
    created_at: string;
}

export default function AdminPPDBPage() {
    const [data, setData] = useState<PPDBItem[]>([]);
    const [search, setSearch] = useState('');
    const [detail, setDetail] = useState<PPDBItem | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        const { data: result, error } = await supabase
            .from('ppdb')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error && result) setData(result);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = data.filter((d) =>
        d.nama.toLowerCase().includes(search.toLowerCase()) ||
        d.telepon?.includes(search)
    );

    const exportCSV = () => {
        const headers = ['Nama', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat', 'Nama Ortu', 'Telepon', 'Tanggal Daftar'];
        const rows = data.map((d) => [d.nama, d.tempat_lahir, d.tanggal_lahir, d.jenis_kelamin, d.alamat, d.nama_ortu, d.telepon, d.created_at]);
        const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c || ''}"`).join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data_ppdb.csv';
        a.click();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Data PPDB</h1>
                    <p className="text-slate-500 text-sm">Daftar pendaftar peserta didik baru</p>
                </div>
                <button onClick={exportCSV} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md">
                    <FaDownload /> Export CSV
                </button>
            </div>

            {/* Search */}
            <div className="mb-6 relative max-w-md">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama atau telepon..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm bg-white" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 text-center">
                    <p className="text-2xl font-extrabold text-blue-700">{data.length}</p>
                    <p className="text-xs text-slate-500">Total Pendaftar</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 text-center">
                    <p className="text-2xl font-extrabold text-blue-700">{data.filter((d) => d.jenis_kelamin === 'Laki-laki').length}</p>
                    <p className="text-xs text-slate-500">Laki-laki</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md border border-slate-100 text-center">
                    <p className="text-2xl font-extrabold text-pink-600">{data.filter((d) => d.jenis_kelamin === 'Perempuan').length}</p>
                    <p className="text-xs text-slate-500">Perempuan</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
                {loading ? (
                    <div className="p-12 text-center">
                        <FaSpinner className="animate-spin text-2xl text-blue-500 mx-auto mb-3" />
                        <p className="text-slate-400">Memuat data...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-12 text-center">
                        <FaUserGraduate className="text-4xl text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-400">Belum ada data pendaftar.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">No</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Nama</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">JK</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Telepon</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Tanggal Daftar</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((item, index) => (
                                    <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }}
                                        className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors">
                                        <td className="px-5 py-3 text-sm text-slate-400">{index + 1}</td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                                    <FaUserGraduate className="text-blue-600 text-sm" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 text-sm">{item.nama}</p>
                                                    <p className="text-xs text-slate-400">{item.tempat_lahir}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.jenis_kelamin === 'Laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                                {item.jenis_kelamin === 'Laki-laki' ? 'L' : 'P'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-500">{item.telepon}</td>
                                        <td className="px-5 py-3 text-sm text-slate-400">{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                        <td className="px-5 py-3 text-right">
                                            <button onClick={() => setDetail(item)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="Detail">
                                                <FaEye />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {detail && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Detail Pendaftar</h2>
                            <button onClick={() => setDetail(null)} className="text-slate-400 hover:text-slate-600"><FaTimes /></button>
                        </div>
                        <div className="space-y-3 text-sm">
                            {[
                                ['Nama Lengkap', detail.nama],
                                ['Tempat, Tanggal Lahir', `${detail.tempat_lahir}, ${detail.tanggal_lahir ? new Date(detail.tanggal_lahir).toLocaleDateString('id-ID') : '-'}`],
                                ['Jenis Kelamin', detail.jenis_kelamin],
                                ['Alamat', detail.alamat],
                                ['Nama Orang Tua', detail.nama_ortu],
                                ['Telepon', detail.telepon],
                                ['Tanggal Daftar', new Date(detail.created_at).toLocaleDateString('id-ID')],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-500">{label}</span>
                                    <span className="font-medium text-slate-800 text-right max-w-[60%]">{value}</span>
                                </div>
                            ))}

                            {/* Dokumen */}
                            {detail.dokumen ? (
                                <a
                                    href={detail.dokumen}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FaFileAlt className="text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-blue-800 text-sm">Lihat Dokumen</p>
                                        <p className="text-xs text-blue-500">Klik untuk membuka dokumen</p>
                                    </div>
                                    <FaExternalLinkAlt className="text-blue-400" />
                                </a>
                            ) : (
                                <div className="flex items-center gap-3 mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                    <FaFileAlt className="text-slate-300" />
                                    <p className="text-slate-400 text-sm">Tidak ada dokumen yang diupload</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
