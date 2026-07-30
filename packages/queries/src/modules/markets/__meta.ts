import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/markets`;
export const KEYS = {
    all: ["markets"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id]
};