import { v4 as uuidGenerator } from 'uuid';
import { supabase } from '../supabaseClient.js';

export type BucketName = "content";

/**
 * 
 * @param bucket The name of the bucket you're targeting
 * @param rootPath Example: `markets/{markerId}`
 * @param file 
 */
export async function create(bucket: BucketName, rootPath: string, file: File): Promise<string> {

    const uuid = uuidGenerator();
    const fileExtension = file.type.split("/")[1];
    const bucketPath = `${rootPath}/${uuid}.${fileExtension}`;

    const { data, error } = await (
        supabase.storage.from(bucket).upload(bucketPath, file)
    );

    if(error) {
        throw error;
    }

    return data.fullPath;
};

/**
 * 
 * @param bucket The name of the bucket you're targeting
 * @param fullPath Example: `{bucket}/{file path}`
 * @returns 
 */
export async function destroy(bucket: BucketName, fullPath: string) {
    const path = fullPath.split(`${bucket}/`)[1];

    if(!path) {
        throw new Error("Path is invalid");
    }

    const { data, error } = await supabase.storage.from(bucket).remove([path]);

    if(error) {
        throw error;
    }

    return data[0];
};