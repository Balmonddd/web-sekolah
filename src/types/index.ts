export interface Berita {
    id: string;
    judul: string;
    slug: string;
    konten: string;
    gambar: string;
    penulis: string;
    created_at: string;
}

export interface Pengumuman {
    id: string;
    judul: string;
    konten: string;
    tanggal: string;
    created_at: string;
}

export interface Galeri {
    id: string;
    judul: string;
    gambar: string;
    created_at: string;
}

export interface PPDB {
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

export interface Kontak {
    id: string;
    nama: string;
    email: string;
    pesan: string;
    created_at: string;
}
