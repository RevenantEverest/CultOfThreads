import {
    Tag,
    CreateTag
} from '../types/tags.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<Tag[]> {
    const { data, error } = await (
        supabase.from("tags").select()
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<Tag> {
    const { data, error } = await (
        supabase.from("tags").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(tagData: CreateTag): Promise<Tag> {
    const { data, error } = await (
        supabase.from("tags").insert({
            name: tagData.name
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Tag is missing");
    }

    return data[0];
};

export async function update(tagData: CreateTag): Promise<Tag> {
    const { data, error } = await (
        supabase.from("tags").update({
            name: tagData.name
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Tag is missing");
    }

    return data[0];
};

export async function destroy(tag: Tag) {
    const { data, error } = await (
        supabase.from("tags").delete().eq("id", tag.id)
    );

    if(error) {
        throw error;
    };

    return data;
};