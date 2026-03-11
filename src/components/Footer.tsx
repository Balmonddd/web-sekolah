import Link from 'next/link';
import { FaGraduationCap, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
            {/* Wave Decoration */}
            <div className="w-full overflow-hidden leading-none">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-slate-50 fill-current">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* School Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl flex items-center justify-center">
                                <FaGraduationCap className="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">SMA Negeri 1</h3>
                                <p className="text-blue-300 text-sm">Kota Nusantara</p>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            Mencetak generasi unggul, berkarakter, dan berwawasan global melalui pendidikan berkualitas.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: FaFacebook, href: '#' },
                                { icon: FaInstagram, href: '#' },
                                { icon: FaYoutube, href: '#' },
                                { icon: FaTwitter, href: '#' },
                            ].map(({ icon: Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
                                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110"
                                >
                                    <Icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-blue-300">Menu Cepat</h4>
                        <ul className="space-y-2">
                            {[
                                { href: '/profil', label: 'Profil Sekolah' },
                                { href: '/berita', label: 'Berita Terbaru' },
                                { href: '/pengumuman', label: 'Pengumuman' },
                                { href: '/galeri', label: 'Galeri Foto' },
                                { href: '/ppdb', label: 'PPDB Online' },
                                { href: '/kontak', label: 'Hubungi Kami' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-sky-400 transition-colors" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-blue-300">Kontak</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <FaMapMarkerAlt className="text-blue-400 mt-0.5 shrink-0" />
                                <span>Jl. Pendidikan No. 123, Kota Nusantara, Indonesia 12345</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <FaPhone className="text-blue-400 shrink-0" />
                                <span>(021) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <FaEnvelope className="text-blue-400 shrink-0" />
                                <span>info@sman1nusantara.sch.id</span>
                            </li>
                        </ul>
                    </div>

                    {/* Operating Hours */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4 text-blue-300">Jam Operasional</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li className="flex justify-between">
                                <span>Senin - Jumat</span>
                                <span className="text-white">07:00 - 15:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sabtu</span>
                                <span className="text-white">07:00 - 12:00</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Minggu</span>
                                <span className="text-red-400">Tutup</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10">
                <div className="container-custom py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} SMA Negeri 1 Kota Nusantara. Hak Cipta Dilindungi.</p>
                </div>
            </div>
        </footer>
    );
}
