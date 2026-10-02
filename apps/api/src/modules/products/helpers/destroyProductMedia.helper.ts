import { ProductMedia } from '@repo/entities';
import { entities, logs, supabaseStorage } from '~/utils';

export default async function destroyProductMedia(media?: ProductMedia[]) {
    if(!media || media.length <= 0) {
        return [];
    }

    logs.log({ message: `Removing ${media.length} files` });

    const results = await Promise.allSettled(
        media.filter(Boolean).map(async (item) => {
            await supabaseStorage.destroy({
                fullFilePath: item.mediaUrl
            });

            const [_, destroyErr] = await entities.destroy<ProductMedia>(ProductMedia, item);

            if(destroyErr) {
                throw destroyErr;
            }

            return item;
        })
    );

    for(let i = 0; i < results.length; i++) {
        const transaction = results[i];

        if(transaction && transaction.status === "rejected") {
            logs.error({ err: transaction.reason, message: `Failed file removal at file ${i}/${media.length}` });
        }
    }

    const response = results
        .filter((transaction): transaction is PromiseFulfilledResult<ProductMedia> => transaction.status === "fulfilled")
        .map((transaction) => transaction.value)
        .filter(Boolean);

    return response;
};