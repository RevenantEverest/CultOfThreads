import type { PromiseTuple } from '~/types/promises';

import { squareClient } from '~/integrations/square/squareClient';

interface DeletePayload {
    catalogItemId: string
};

export default async function deleteCatalogItem({ catalogItemId }: DeletePayload): PromiseTuple<string[]> {
    try {
        const response = await squareClient.catalog.object.delete({
            objectId: catalogItemId
        });

        return [response.deletedObjectIds, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};