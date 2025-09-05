import type { CreateMarketDetails } from '../types/marketDetails.js';
import type { MarketWithDetails, CreateMarketParams, UpdateMarketParams } from '../types/markets.js';

import { supabase } from '../supabaseClient.js';

import * as marketDetailsApi from './marketDetails.js';
import { storage } from '../utils/index.js';

export async function fetchAll(): Promise<MarketWithDetails[]> {
    const { data, error } = await (
        supabase.from('markets')
        .select(`
            *,
            details:market_details (
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
            details:market_details (
                *
            )
        `)
        .eq('id', id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(marketData: CreateMarketParams) {
    const { data, error } = await (
        supabase.from('markets')
        .insert({
            name: marketData.name
        })
        .select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    const market = data[0];

    const marketDetails: CreateMarketDetails = {
        market_id: market.id,
        state: marketData.details.state
    };

    if(marketData.image) {
        const marketImagePath = await storage.create("content", `markets/${market.id}`, marketData.image);

        marketDetails.logo_url = marketImagePath;
    }

    await marketDetailsApi.create(marketDetails);

    return market;
};

export async function update(market: UpdateMarketParams) {
    if(market.image) {
        if(market.details.logo_url) {
            await storage.destroy("content", market.details?.logo_url);
        }

        const marketImagePath = await storage.create("content", `markets/${market.id}`, market.image);
        market.details.logo_url = marketImagePath;
    }

    const { data, error } = await supabase.from('markets').update({
        name: market.name
    }).eq("id", market.id).select();

    if(error) {
        throw error;
    }

    if(!data) {
        throw new Error("Data is null");
    }

    await marketDetailsApi.update({
        ...market.details,
        market_id: market.id,
    });

    return data[0];
};

export async function destroy(market: MarketWithDetails) {
    if(market.details?.logo_url) {
        await storage.destroy("content", market.details.logo_url);
    }

    const { data, error } = await (
        supabase.from('markets').delete().eq('id', market.id)
    );

    if(error) {
        throw error;
    }

    return data;
};