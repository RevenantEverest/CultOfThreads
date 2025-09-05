import type { DatabaseItem } from '../supabaseClient.js';

export type Contact = DatabaseItem<"contacts">["Row"];
export type CreateContact = DatabaseItem<"contacts">["Insert"];

export interface UpdateContact extends CreateContact {
    id: Contact["id"]
};