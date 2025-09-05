import {
    Category,
    CreateCategory
} from '../types/categories.js';

import { supabase } from '../supabaseClient.js';

export async function fetchAll(): Promise<Category[]> {
    const { data, error } = await (
        supabase.from("categories").select()
    );

    if(error) {
        throw error;
    }

    return data ?? [];
};

export async function fetchById(id: string): Promise<Category> {
    const { data, error } = await (
        supabase.from("categories").select().eq("id", id)
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Data is null");
    }

    return data[0];
};

export async function create(categoryData: CreateCategory): Promise<Category> {
    const { data, error } = await (
        supabase.from("categories").insert({
            name: categoryData.name
        }).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Category is missing");
    }

    return data[0];
};

export async function update(categoryData: Category): Promise<Category> {
    const { data, error } = await (
        supabase.from("categories").update({
            name: categoryData.name
        }).eq("id", categoryData.id).select()
    );

    if(error) {
        throw error;
    }

    if(!data[0]) {
        throw new Error("Category is missing");
    }

    return data[0];
};

export async function destroy(category: Category) {
    const { data, error } = await (
        supabase.from("categories").delete().eq("id", category.id)
    );

    if(error) {
        throw error;
    };

    return data;
};