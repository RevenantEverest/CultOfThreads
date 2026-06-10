import { ENV } from '~/constants';

export const BASE_URL = `${ENV.API_URL}/analytics/traffic`;
export const KEYS = {
    all: ["traffic_analytics"],
    lists: () => [...KEYS.all, "list"]
};