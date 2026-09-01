import type { EntityTarget, DeepPartial, BaseEntity } from 'typeorm';
import type { PromiseTuple } from '~/types/promises';

import { ProductCategory, ProductTag } from '@repo/entities';
import { entities, logs } from '~/utils';

interface RelationEntityMap {
    category: ProductCategory,
    tag: ProductTag
};

type RelationKey = keyof RelationEntityMap;

interface InsertRelationsParams<T extends RelationKey> {
    targetEntity: EntityTarget<RelationEntityMap[T]>,
    productId: string,
    relationKey: T,
    ids?: string[]
};

export default async function insertRelations<T extends RelationKey>(params: InsertRelationsParams<T>) {

    const { targetEntity, productId, relationKey, ids } = params;

    if(!ids || ids.length <= 0) {
        return;
    }

    logs.log({ message: `Inserting ${ids.length} ${relationKey}s` });

    const results = await Promise.allSettled(
        ids.filter(Boolean).map((id) => {
            const payload = {
                product: { id: productId },
                [relationKey]: id
            };

            return entities.insert(
                targetEntity as EntityTarget<BaseEntity>, 
                payload as DeepPartial<BaseEntity>
            ) as unknown as PromiseTuple<RelationEntityMap[T]>;
        })
    );

    results.forEach((transaction, index) => {
        if(transaction.status === "rejected") {
            logs.error({ err: transaction.reason, message: `Failed ${relationKey} insert at ${index}/${ids.length}` })
        }
    });
};