import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/sales`;
export const KEYS = {
    all: ["sales"],
    lists: () => [...KEYS.all, "list"],
    details: (id: string) => [...KEYS.all, "details", id],
    aggregatedTotals: () => [...KEYS.all, "aggregated-totals"]
};