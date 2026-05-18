import { supabase } from './supabase';

export async function uploadImage(file: File, folder: string = 'images'): Promise<string | null> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${folder}/${Date.now()}.${fileExt}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Upload error:', error.message);
            return null;
        }

        const { data: urlData } = supabase.storage
            .from('images')
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    } catch (err) {
        console.error('Upload failed:', err);
        return null;
    }
}
