'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname.startsWith('/admin');

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
