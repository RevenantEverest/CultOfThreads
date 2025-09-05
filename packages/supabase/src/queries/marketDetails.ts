import type { CreateMarketDetails, MarketDetails } from '../types/marketDetails.js';

import { supabase } from '../supabaseClient.js';

export async function create(details: CreateMarketDetails) {
    const { data, error } = await (
        supabase.from('market_details').insert(details).select()
    );

    if(error) {
        throw error;
    }

    return data[0];
};

export async function update(details: MarketDetails) {
    const { data, error } = await (
        supabase.from('market_details').update(details).eq('id', details.id).select()
    );

    if(error) {
        throw error;
    }

    return data;
};