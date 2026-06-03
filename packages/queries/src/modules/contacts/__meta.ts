import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/contacts`;
export const KEYS = {
    all: ["contacts"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id] 
};