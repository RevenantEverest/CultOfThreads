import type { PromiseTuple } from '~/types/promises';

import { randomUUID } from 'crypto';
import { squareClient } from '~/integrations/square/squareClient';

interface CreatePayload {
    name: string,
    description?: string,
    defaultPriceInCents: number
};

export interface CreatedSquareProduct {
    catalogItemId: string
};

export default async function createCatalogItem(payload: CreatePayload): PromiseTuple<CreatedSquareProduct> {
    try {
        const { name, description, defaultPriceInCents } = payload;
        const response = await squareClient.catalog.batchUpsert({
            idempotencyKey: randomUUID(),
            batches: [{
                objects: [{
                    type: "ITEM",
                    id: "#temp_id",
                    ...(description && { description }),
                    itemData: {
                        name,
                        variations: [{
                            type: "ITEM_VARIATION",
                            id: "#temp_variation",
                            itemVariationData: {
                                itemId: "#temp_id",
                                name: "Regular",
                                pricingType: "FIXED_PRICING",
                                priceMoney: {
                                    amount: BigInt(defaultPriceInCents),
                                    currency: "USD"
                                }
                            }
                        }]
                    }
                }]
            }]
        });

        if(!response.objects) {
            throw new Error("No objects returned from Square catalog batch upsert");
        }

        const squareCatalogItem = response.objects[0];

        if(!squareCatalogItem) {
            throw new Error("No catalog item found in Square catalog batch upsert response");
        }

        if(!squareCatalogItem.id) {
            throw new Error("Returned Square catalog item has no property 'id'");
        }

        const data: CreatedSquareProduct = {
            catalogItemId: squareCatalogItem.id
        };

        return [data, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};