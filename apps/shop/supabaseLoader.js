import process from 'node:process';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function supabaseLoader({ src, width, quality }) {
    return `${SUPABASE_URL}${src}?width=${width}&quality=${quality}`;
};