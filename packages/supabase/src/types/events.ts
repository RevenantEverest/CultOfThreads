import type { DatabaseItem } from '../supabaseClient.js';
import type { MarketWithDetails } from './markets.js';

export type Event = DatabaseItem<"events">["Row"];
export type CreateEvent = DatabaseItem<"events">["Insert"];
export interface EventWithMarket extends Event {
    market: MarketWithDetails
};

export interface CreateEventParams extends Omit<CreateEvent, "flyer_url"> {
    image: File
};

export interface UpdateEventParams extends Event {
    image?: File
};