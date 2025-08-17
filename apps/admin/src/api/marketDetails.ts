import type { DatabaseItem } from '@repo/ui';
import supabase from '@@admin/supabaseClient';

export type MarketDetails = DatabaseItem<"market_details">["Row"];
export type CreateMarketDetails = DatabaseItem<"market_details">["Insert"];

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