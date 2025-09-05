import type { DatabaseItem } from '../supabaseClient.js';

export type ContactFormSubmission = DatabaseItem<"contact_form">["Row"];
export type CreateContactFormSubmission = DatabaseItem<"contact_form">["Insert"];

export type ContactFormSubmissionStatus = "PENDING" | "RESOLVED";

export interface UpdateContactFormSubmission extends Pick<ContactFormSubmission, "id"> {
    status: ContactFormSubmissionStatus
};