import type { DatabaseItem } from '../supabaseClient.js';
import type { Contact } from './contacts.js';

export type Newsletter = DatabaseItem<"newsletter">["Row"];
export type CreateNewsletter = DatabaseItem<"newsletter">["Insert"];

export interface NewsletterWithContact extends Newsletter {
    contact: Contact
};