import type {
    Sale,
    CreateSale,
    SaleFull
} from '../types/sales.js';
import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<SaleFull[]> {
    const { data, error } = await (
        supabase.from("sales")
        .select(`
            *,
            product:product_id (
                *,
                details:product_details!inner (
                    *
                ),
                media:product_media (
                    *
                )
            ),
            event:event_id (
                *,
                market:market_id (
                    *,
                    details:market_details (
                        *
                    )
                )
            )
        `)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<SaleFull> {
    const { data, error } = await (
        supabase.from("sales")
        .select(`
            *,
            product:product_id (
                *,
                details:product_details!inner (
                    *
                ),
                media:product_media (
                    *
                )
            ),
            event:event_id (
                *,
                market:market_id (
                    *,
                    details:market_details (
                        *
                    )
                )
            )
        `)
        .eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function fetchByEventId(id: string): Promise<SaleFull[]> {
    const { data, error } = await (
        supabase.from("sales")
        .select(`
            *,
            product:product_id (
                *,
                details:product_details!inner (
                    *
                ),
                media:product_media (
                    *
                )
            ),
            event:event_id (
                *,
                market:market_id (
                    *,
                    details:market_details (
                        *
                    )
                )
            )
        `)
        .eq("event_id", id)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function create(sale: CreateSale): Promise<Sale> {
    const { data, error } = await (
        supabase.from("sales").insert({
            product_id: sale.product_id,
            event_id: sale.event_id,
            market_name: sale.market_name,
            product_name: sale.product_name,
            original_product_price: sale.original_product_price,
            sale_price: sale.sale_price,
            sale_type: sale.sale_type,
            purchase_date: sale.purchase_date,
            notes: sale.notes

        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Sale is missing");
    }

    return data[0];
};

export async function update(sale: Sale): Promise<Sale> {
    const { data, error } = await (
        supabase.from("sales").update(sale).eq("id", sale.id).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Sale is missing");
    }

    return data[0];
};

export async function destroy(id: string) {
    const { data, error } = await (
        supabase.from("sales").delete().eq('id', id)
    );

    if(error) {
        throw error;
    }

    return data;
};