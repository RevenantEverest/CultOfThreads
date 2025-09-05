import type {
    ContactFormSubmission,
    ContactFormSubmissionStatus,
    CreateContactFormSubmission,
    UpdateContactFormSubmission
} from '../types/contactForm.js';

import { supabase } from '../supabaseClient.js';

export const STATUS: Record<ContactFormSubmissionStatus, ContactFormSubmissionStatus> = {
    "PENDING": "PENDING",
    "RESOLVED": "RESOLVED"
};

export async function fetchAll(): Promise<ContactFormSubmission[]> {
    const { data, error } = await (
        supabase.from("contact_form").select()
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<ContactFormSubmission> {
    const { data, error } = await (
        supabase.from("contact_form").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(submission: Omit<CreateContactFormSubmission, "status">) {
    const { error } = await (
        supabase.from("contact_form").insert({
            email: submission.email,
            first_name: submission.first_name,
            last_name: submission.last_name,
            message: submission.message,
            status: STATUS.PENDING
        })
    );

    if(error) {
        throw error;
    }

    return;
};

export async function update(submission: UpdateContactFormSubmission): Promise<ContactFormSubmission> {
    const { data, error } = await (
        supabase.from("contact_form").update({
            status: submission.status
        }).eq("id", submission.id).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Contact Form Submission is missing");
    }

    return data[0];
};

export async function destroy(id: string) {
    const { data, error } = await (
        supabase.from("contact_form").delete().eq("id", id)
    );

    if(error) {
        throw error;
    }

    return data;
};