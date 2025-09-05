import type { Contact, CreateContact, UpdateContact } from '../types/contacts.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<Contact[]> {
    const { data, error } = await (
        supabase.from("contacts").select()
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<Contact> {
    const { data, error } = await (
        supabase.from("contacts").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Contact is missing");
    }

    return data[0];
};

export async function create(contactData: CreateContact): Promise<Contact> {
    const { data, error } = await (
        supabase.from("contacts").insert({
            first_name: contactData.first_name,
            last_name: contactData.last_name,
            email: contactData.email,
            address: contactData.address,
            phone: contactData.phone
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Contact is missing");
    }

    return data[0];
};

export async function update(contactData: UpdateContact): Promise<Contact> {
    const { data, error } = await (
        supabase.from("contacts").insert({
            first_name: contactData.first_name,
            last_name: contactData.last_name,
            email: contactData.email,
            address: contactData.address,
            phone: contactData.phone
        }).eq("id", contactData.id).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Contact is missing");
    }

    return data[0];
};

export async function destroy(id: string) {
    const { data, error } = await (
        supabase.from("contacts").delete().eq("id", id)
    );

    if(error) {
        throw error;
    }

    return data;
};