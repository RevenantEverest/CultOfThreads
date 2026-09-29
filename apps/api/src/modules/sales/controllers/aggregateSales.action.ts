import type { Request, Response } from '~/types/express';
import type { SalesAggregateResponse } from '@repo/types';
import type { PromiseTuple } from '~/types/promises';

import { Sale } from '@repo/entities';
import AppDataSource from '~/db/dataSource';

import { logs, promises } from '~/utils';
import { StatusCodes } from 'http-status-codes';

interface RawSaleTypeTotal {
    saleType: Sale["saleType"],
    total: string
};

async function getSaleTotalsByType(): PromiseTuple<SalesAggregateResponse> {
    const repository = AppDataSource.getRepository(Sale);

    const promise = repository
        .createQueryBuilder("sale")
        .select("sale.saleType", "saleType")
        .addSelect("SUM(sale.salePrice)", "total")
        .groupBy("sale.saleType")
        .getRawMany<RawSaleTypeTotal>();

    const [raw, err] = await promises.handle<RawSaleTypeTotal[]>(promise);

    if(err) {
        return [undefined, err];
    }

    const revenue: SalesAggregateResponse["revenue"] = {
        total: 0,
        event: 0,
        online: 0,
        uncategorized: 0
    };

    for(const row of raw ?? []) {
        const value = parseFloat(row.total) || 0;
        revenue.total += value;

        switch(row.saleType) {
            case "EVENT":
                revenue.event = value;
                break;
            case "ONLINE":
                revenue.online = value;
                break;
            case "OTHER":
                revenue.uncategorized = value;
                break;
        }
    }

    return [{ revenue }, undefined];
};

export default async function aggregateSales(req: Request, res: Response<["auth"]>) {

    const [aggregatedSales, err] = await getSaleTotalsByType();

    if(err) {
        logs.error({ err, message: "Error aggregating sale totals" });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: true, message: "Error aggregating sale totals"
        });
    }

    return res.json({ results: aggregatedSales });
};