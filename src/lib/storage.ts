import { supabase } from './supabase';

/**
 * Upload file ke Supabase Storage
 * Sebelum pakai, buat bucket "images" di Supabase Dashboard → Storage
 * Dan set policy agar bisa public read & authenticated/anon upload
 */
export async function uploadImage(file: File, folder: string = 'uploads'): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('Upload error:', error.message);
        return null;
    }

    // Get public URL
    const { data } = supabase.storage.from('images').getPublicUrl(fileName);
    return data.publicUrl;
}
