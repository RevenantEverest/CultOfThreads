import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/events`;
export const KEYS = {
    all: ["events"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id],
    upcoming: () => [...KEYS.all, "upcoming"]
};