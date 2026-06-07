import type { MulterFile } from '~/types/validation';

import { v4 as uuidGenerator } from 'uuid';
import { SUPABASE_STORAGE } from '~/constants';
import { supabase } from '~/supabaseClient';

interface CreateFileOptions {
    rootBucket?: string,
    rootSubPath: string,
    file: MulterFile
};

interface DestroyFileOptions {
    rootBucket?: string,
    fullFilePath: string
};

/**
 * 
 * @param bucket The name of the bucket you're targeting. Defaults to core bucket.
 * @param rootPath Example: `markets/{markerId}`
 * @param file 
 */
export async function create({ 
    rootBucket=SUPABASE_STORAGE.CORE_BUCKET, 
    rootSubPath, 
    file
}: CreateFileOptions): Promise<string> {

    const uuid = uuidGenerator();
    const fileExtension = file.mimetype.split("/")[1];
    const bucketPath = `${rootSubPath}/${uuid}.${fileExtension}`;

    const { data, error } = await (
        supabase.storage.from(rootBucket).upload(bucketPath, file.buffer, {
            contentType: file.mimetype,
            upsert: false
        })
    );

    if(error) {
        throw error;
    }

    return data.fullPath;
};

/**
 * 
 * @param bucket The name of the bucket you're targeting. Defaults to core bucket.
 * @param fullPath Example: `{bucket}/{file path}`
 * @returns 
 */
export async function destroy({ 
    rootBucket=SUPABASE_STORAGE.CORE_BUCKET, 
    fullFilePath
}: DestroyFileOptions) {
    const path = fullFilePath.split(`${rootBucket}/`)[1];

    if(!path) {
        throw new Error("Path is invalid");
    }

    const { data, error } = await supabase.storage.from(rootBucket).remove([path]);

    if(error) {
        throw error;
    }

    return data[0];
};