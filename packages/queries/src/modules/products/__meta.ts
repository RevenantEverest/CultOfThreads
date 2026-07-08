import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/products`;
export const KEYS = {
    all: ["products"],
    lists: (filters?: Record<string, string>) => [...KEYS.all, "list", filters],
    details: (id: string) => [...KEYS.all, "details", id]
};