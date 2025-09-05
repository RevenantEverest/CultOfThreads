import type { 
    Newsletter,
    NewsletterWithContact
} from '../types/newsletter.js';
import { supabase, getEnvVar } from '../supabaseClient.js';

export async function fetchAll(): Promise<NewsletterWithContact[]> {
    const { data, error } = await (
        supabase.from("newsletter").select(`
            *,
            contact:contact_id (
                *
            )
        `)
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<NewsletterWithContact> {
    const { data, error } = await (
        supabase.from("newsletter").select(`
            *,
            contact:contact_id (
                *
            )
        `).eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Newsletter Submission is missing");
    }

    return data[0];
};

export async function create(submission: { email: string, first_name: string }) {

    const response = await fetch(`${getEnvVar("SUPABASE_URL")}/functions/v1/dynamic-handler`, {
        method: "POST",
        body: JSON.stringify({ email: submission.email, first_name: submission.first_name }),
        headers: {
            'Content-Type': "application/json",
            'apiKey': getEnvVar("SUPABASE_KEY")
        }
    });

    if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || response.statusText)
    }

    const data = await response.json();
    return data;
};

export async function destroy(id: Newsletter["id"]) {
    const { data, error } = await (
        supabase.from("newsletter").delete().eq("id", id)
    );

    if(error) {
        throw error;
    }

    return data;
};