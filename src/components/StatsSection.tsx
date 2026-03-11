'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaUsers, FaChalkboardTeacher, FaSchool, FaTrophy } from 'react-icons/fa';

const stats = [
    { icon: FaUsers, value: 1250, label: 'Siswa Aktif', suffix: '+', color: 'from-blue-500 to-blue-600' },
    { icon: FaChalkboardTeacher, value: 85, label: 'Guru & Staff', suffix: '+', color: 'from-sky-500 to-cyan-500' },
    { icon: FaSchool, value: 36, label: 'Ruang Kelas', suffix: '', color: 'from-indigo-500 to-purple-500' },
    { icon: FaTrophy, value: 150, label: 'Prestasi', suffix: '+', color: 'from-amber-500 to-orange-500' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
    return (
        <section className="py-16 bg-slate-50 -mt-1">
            <div className="container-custom">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-white rounded-2xl p-6 text-center shadow-lg shadow-blue-100/50 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                <stat.icon className="text-2xl text-white" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-1">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
