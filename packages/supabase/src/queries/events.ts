import type { 
    Event, 
    EventWithMarket, 
    CreateEventParams,
    UpdateEventParams
} from '../types/events.js';

import { supabase } from '../supabaseClient.js';
import { storage } from '../utils/index.js';

export async function fetchUpcoming({ limit }: { limit: number }): Promise<EventWithMarket[]> {
    const { data, error } = await (
        supabase.from("events")
        .select(`
            *,
            market:market_id (
                *,
                details:market_details (
                    *
                )
            )
        `)
        .filter('date_to', 'gte', new Date().toISOString())
        .order('date_from', { ascending: true })
        .limit(limit)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchAll(): Promise<EventWithMarket[]> {
    const { data, error } = await (
        supabase.from("events")
        .select(`
            *,
            market:market_id (
                *,
                details:market_details (
                    *
                )
            )
        `)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<EventWithMarket> {

    const { data, error } = await (
        supabase.from("events")
        .select(`
            *,
            market:market_id (
                *,
                details:market_details (
                    *
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

export async function create(eventData: CreateEventParams): Promise<Event> {

    const flyerFilePath = await storage.create("content", `events`, eventData.image);

    const { data, error } = await (
        supabase.from("events").insert({
            market_id: eventData.market_id,
            address: eventData.address,
            date_from: eventData.date_from,
            date_to: eventData.date_to,
            flyer_url: flyerFilePath
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Event is missing");
    }

    return data[0];
};

export async function update(eventData: UpdateEventParams): Promise<Event> {
    if(eventData.image) {
        await storage.destroy("content", eventData.flyer_url);
        const eventImagePath = await storage.create("content", "events", eventData.image);
        eventData.flyer_url = eventImagePath;
    }

    const { data, error } = await (
        supabase.from("events").update({
            address: eventData.address,
            date_from: eventData.date_from,
            date_to: eventData.date_to,
            flyer_url: eventData.flyer_url
        }).eq("id", eventData.id).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Event is missing");
    }

    return data[0];
};

export async function destroy(event: EventWithMarket) {
    await storage.destroy("content", event.flyer_url);

    const { data, error } = await (
        supabase.from("events").delete().eq("id", event.id)
    );

    if(error) {
        throw error;
    }

    return data;
};