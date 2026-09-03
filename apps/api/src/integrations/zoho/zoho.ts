import type { CachedToken } from '~/types/zoho';

interface ZohoIntegrationStore {
    cachedToken: CachedToken | null,
    inFlightRefresh: Promise<string> | null
};

export const store: ZohoIntegrationStore = {
    cachedToken: null,
    inFlightRefresh: null
};