import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "SMA Negeri 1 Kota Nusantara - Website Resmi",
    template: "%s | SMA Negeri 1 Kota Nusantara",
  },
  description:
    "Website resmi SMA Negeri 1 Kota Nusantara. Mencetak generasi unggul, berkarakter, dan berwawasan global.",
  keywords: ["SMA", "sekolah", "pendidikan", "Kota Nusantara", "PPDB"],
  openGraph: {
    title: "SMA Negeri 1 Kota Nusantara",
    description: "Website resmi SMA Negeri 1 Kota Nusantara",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="font-sans antialiased">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

