import type { DatabaseItem } from '../supabaseClient.js';

export type MarketDetails = DatabaseItem<"market_details">["Row"];
export type CreateMarketDetails = DatabaseItem<"market_details">["Insert"];