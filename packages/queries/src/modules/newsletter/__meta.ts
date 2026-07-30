import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/newsletter`;
export const KEYS = {
    all: ["newsletter"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "detail", id]
};