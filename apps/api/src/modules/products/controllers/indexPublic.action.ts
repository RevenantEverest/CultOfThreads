import type { Request, Response } from '~/types/express';
import type { FindManyOptions } from 'typeorm';

import { Any, ILike } from 'typeorm';
import { z } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { Product } from '@repo/entities';

import { querySchema } from '~/modules/products/schemas';

import { entities, logs, pagination, text } from '~/utils';

export default async function indexPublic(req: Request, res: Response<["pagination", "queryContext"]>) {

    const { limit, offset } = res.locals.pagination;
    const queryContext = res.locals.queryContext as z.infer<typeof querySchema> | undefined;
    
    const findOptions: FindManyOptions<Product> = {
        where: {
            details: {
                status: "ACTIVE"
            }
        },
        order: {
            createdAt: "DESC"
        },
    };

    if(queryContext && queryContext.filter) {
        const { category, tags } = queryContext.filter;

        if(category) {
            findOptions.where = {
                ...findOptions.where,
                categories: {
                    category: {
                        name: text.capitalizeFirstLetter(category)
                    }
                }
            };
        }

        if(tags) {
            findOptions.where = {
                ...findOptions.where,
                tags: {
                    tag: {
                        name: Any(tags.map((item) => text.capitalizeFirstLetter(item)))
                    }
                }
            }
        }
    }

    if(queryContext && queryContext.sort) {
        const { field, order } = queryContext.sort;

        switch(field) {
            case "price":
                findOptions.order = {
                    details: {
                        onlinePrice: order
                    }
                };
                break;
            default:
                logs.log({ level: "WARNING", message: `Attempted to sort by unsupported field: ${field}` });
                break;
        }
    }

    if(queryContext && queryContext.search) {
        findOptions.where = {
            ...findOptions.where,
            name: ILike(`%${queryContext.search}%`)
        };
    }

    const [products, err] = await entities.indexAndCount<Product>(Product, {
        limit,
        offset,
        ...findOptions,
        relations: {
            details: true,
            media: true,
            tags: {
                tag: true
            },
            categories: {
                category: true
            }
        }
    });

    if(err) {
        logs.error({ err });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error indexing products"
        });
    }

    if(!products) {
        return res.status(StatusCodes.NOT_FOUND).json({
            error: true, message: "Unable to index products"
        });
    }

    const paginatedResponse = pagination.paginateResponse<Product>(req, res, products);

    return res.json(paginatedResponse);
};