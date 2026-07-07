import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/categories`;
export const KEYS = {
    all: ["categories"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id]
};