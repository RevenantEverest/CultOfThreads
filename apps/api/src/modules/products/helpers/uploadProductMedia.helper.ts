import { ProductMedia } from '@repo/entities';
import { SUPABASE_STORAGE } from '~/constants';
import { entities, logs, supabaseStorage } from '~/utils';

export default async function uploadProductMedia(productId: string, files?: Express.Multer.File[]) {
    if(!files || files.length <= 0) {
        return [];
    }

    logs.log({ message: `Uploading ${files.length} files` });

    const results = await Promise.allSettled(
        files.filter(Boolean).map(async (file) => {
            const mediaUrl = await supabaseStorage.create({
                rootSubPath: `${SUPABASE_STORAGE.SUB_BUCKETS.PRODUCTS}/${productId}`,
                file
            });

            const [media] = await entities.insert<ProductMedia>(ProductMedia, {
                product: { id: productId },
                type: file.mimetype,
                mediaUrl
            });

            return media;
        })
    );

    for(let i = 0; i < results.length; i++) {
        const transaction = results[i];

        if(transaction && transaction.status === "rejected") {
            logs.error({ err: transaction.reason, message: `Failed file upload at file ${i}/${files.length}` });
        }
    }

    const response = results
        .filter((transaction): transaction is PromiseFulfilledResult<ProductMedia | undefined> => transaction.status === "fulfilled")
        .map((transaction) => transaction.value)
        .filter((transaction): transaction is ProductMedia => !!transaction);

    return response;
};