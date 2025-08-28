import type { DatabaseItem } from '../supabaseClient.js';
import type { MarketDetails, CreateMarketDetails } from './marketDetails.js';

export type Market = DatabaseItem<"markets">["Row"];
export type CreateMarket = DatabaseItem<"markets">["Insert"];
export interface MarketWithDetails extends Market {
    details: MarketDetails | null
};

export interface CreateMarketParams extends CreateMarket {
    details: Omit<CreateMarketDetails, "logo_url" | "market_id">,
    image?: File
};

export interface UpdateMarketParams extends Market {
    details: Omit<MarketDetails, "market_id">,
    image?: File
};