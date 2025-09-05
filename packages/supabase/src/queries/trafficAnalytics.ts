import type { TrafficAnalytics, CreateTrafficAnalytics } from '../types/trafficAnalytics.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<TrafficAnalytics[]> {
    const { data, error } = await (
        supabase.from("traffic_analytics")
        .select()
    );  

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<TrafficAnalytics> {
    const { data, error } = await (
        supabase.from("traffic_analytics").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(trafficData: CreateTrafficAnalytics): Promise<void> {
    const { error } = await (
        supabase.from("traffic_analytics").insert({
            landing_page_url: trafficData.landing_page_url,
            utm_source: trafficData.utm_source,
            utm_medium: trafficData.utm_medium,
            utm_campaign: trafficData.utm_campaign,
            utm_term: trafficData.utm_term,
            utm_content: trafficData.utm_content
        })
    );

    if(error) {
        throw error;
    }

    return;
};

export async function destroy(id: string) {
    const { data, error } = await (
        supabase.from("traffic_analytics").delete().eq("id", id)
    );

    if(error) {
        throw error;
    }

    return data;
};