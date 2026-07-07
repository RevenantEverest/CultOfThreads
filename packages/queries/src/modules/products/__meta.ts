import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/products`;
export const KEYS = {
    all: ["products"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id]
};