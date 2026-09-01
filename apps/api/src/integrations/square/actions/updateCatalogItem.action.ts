import type { Square } from 'square';
import type { PromiseTuple } from '~/types/promises';

import { randomUUID } from 'crypto';
import { squareClient } from '~/integrations/square/squareClient';

interface UpdatePayload {
    catalogItemId: string,
    name?: string,
    description?: string,
    price?: Square.Money,
    updates?: Partial<Square.CatalogItem>
};

type UpdatedCatalogItem = Square.UpsertCatalogObjectResponse["catalogObject"];

export default async function updateCatalogItem(payload: UpdatePayload): PromiseTuple<UpdatedCatalogItem> {
    try {
        const { catalogItemId, name, description, price, updates={} } = payload;

        const { object: existingObject } = await squareClient.catalog.object.get({
            objectId: catalogItemId
        });

        if(!existingObject || existingObject.type !== "ITEM") {
            throw new Error(`No catalog item found with id: ${catalogItemId}`);
        }

        const existingVariation = existingObject.itemData?.variations?.[0];

        if(!existingVariation || existingVariation.type !== "ITEM_VARIATION") {
            throw new Error(`No variation found for item ${catalogItemId}`);
        }

        const mergedItemData: Square.CatalogItem = {
            ...existingObject.itemData,
            ...updates,
            ...(name && { name }),
            ...(description && { description })
        };

        const updatedVariation: Square.CatalogObject = {
            ...existingVariation,
            type: "ITEM_VARIATION",
            id: existingVariation.id,
            version: existingVariation.version,
            itemVariationData: {
                ...existingVariation.itemVariationData,
                ...(price && { priceMoney: price })
            }
        };

        const response = await squareClient.catalog.object.upsert({
            idempotencyKey: randomUUID(),
            object: {
                type: "ITEM",
                id: existingObject.id,
                version: existingObject.version,
                itemData: {
                    ...mergedItemData,
                    variations: [updatedVariation]
                }
            }
        });

        if(!response.catalogObject) {
            throw new Error(`No catalog object returned from square upsert for item ${catalogItemId}`);
        }

        return [response.catalogObject, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};