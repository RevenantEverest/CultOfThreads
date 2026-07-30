import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/tags`;
export const KEYS = {
    all: ["tags"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id]
};