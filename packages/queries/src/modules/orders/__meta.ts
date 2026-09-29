import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/orders`;
export const KEYS = {
    all: ["orders"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id]
};