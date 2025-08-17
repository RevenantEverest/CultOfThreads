import type { DatabaseItem } from '@repo/ui';
import type { CreateMarketDetails, MarketDetails } from './marketDetails';
import supabase from '@@admin/supabaseClient';
import { v4 as uuidGenerator } from 'uuid';

import * as marketDetailsApi from './marketDetails';

export type Market = DatabaseItem<"markets">["Row"];
export type CreateMarket = DatabaseItem<"markets">["Insert"];
export interface MarketWithDetails extends Market {
    market_details: MarketDetails | null
};

export interface CreateMarketParams extends CreateMarket {
    details: Omit<CreateMarketDetails, "logo_url" | "market_id">,
    image?: File
};

export interface UpdateMarket extends CreateMarket {
    details: Omit<MarketDetails, "market_id">,
    image?: File
}

export async function fetchAll(): Promise<MarketWithDetails[]> {
    const { data, error } = await (
        supabase.from('markets')
        .select(`
            *,
            market_details (
                *
            )
        `)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<MarketWithDetails> {
    const { data, error } = await (
        supabase.from('markets')
        .select(`
            *,
            market_details (
                *
            )
        `)
        .eq('id', id)
    );

    if(error) {
        throw error;
    }

    return data[0];
};

export async function create(marketData: CreateMarketParams) {
    const marketRes = await (
        supabase.from('markets')
        .insert({
            name: marketData.name
        })
        .select()
    );

    if(marketRes.error) {
        throw marketRes.error;
    }

    const market = marketRes.data[0];
    const marketDetails: CreateMarketDetails = {
        market_id: market.id,
        state: marketData.details.state
    };

    if(marketData.image) {
        const uuid = uuidGenerator();
        const bucketPath = `/markets/${market.id}/${uuid}`;

        const fileUpload = await (
            supabase.storage.from('content').upload(bucketPath, marketData.image)
        );

        if(fileUpload.error) {
            throw fileUpload.error;
        }

        marketDetails.logo_url = fileUpload.data.fullPath;
    }

    await marketDetailsApi.create(marketDetails);

    return market;
};

export async function update(market: UpdateMarket) {
    if(market.image) {
        if(market.details.logo_url) {
            await destroyMarketLogoFile(market.details?.logo_url);
        }


    }
};

export async function destroy(market: MarketWithDetails) {
    if(market.market_details?.logo_url) {
        destroyMarketLogoFile(market.market_details?.logo_url);
    }

    const { data, error } = await (
        supabase.from('markets').delete().eq('id', market.id)
    );

    if(error) {
        throw error;
    }

    return data;
};

/* Util Files */
async function createMarketLogoFile() {

};

async function destroyMarketLogoFile(url: string) {
    const { data, error } = await supabase.storage.from('content').remove([url]);

    if(error) {
        throw error;
    }

    return data[0];
};