import type { DatabaseItem } from '../supabaseClient.js';

export type TrafficAnalytics = DatabaseItem<"traffic_analytics">["Row"];
export type CreateTrafficAnalytics = DatabaseItem<"traffic_analytics">["Insert"];