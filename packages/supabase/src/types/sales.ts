import type { DatabaseItem } from '../supabaseClient.js';
import type { ProductWithDetailsAndMedia } from './products.js';
import type { EventWithMarket } from './events.js';

export type Sale = DatabaseItem<"sales">["Row"];
export type CreateSale = DatabaseItem<"sales">["Insert"];

export type SaleType = "EVENT" | "ONLINE" | "OTHER";

export interface SaleFull extends Sale {
    product: ProductWithDetailsAndMedia | null,
    event: EventWithMarket | null
};
