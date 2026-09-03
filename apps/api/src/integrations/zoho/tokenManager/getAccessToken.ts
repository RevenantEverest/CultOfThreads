import { store } from '~/integrations/zoho/zoho';
import requestNewAccessToken from './requestNewAccessToken';

const EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes

export default async function getAccessToken(): Promise<string> {
    console.log("Getting access token");
    const now = Date.now();

    if(store.cachedToken && store.cachedToken.expiresAt - EXPIRY_BUFFER_MS > now) {
        return store.cachedToken.accessToken;
    }

    if(store.inFlightRefresh) {
        return store.inFlightRefresh;
    }

    store.inFlightRefresh = requestNewAccessToken()
        .then((token) => {
            store.cachedToken = token;
            return token.accessToken;
        })
        .finally(() => {
            store.inFlightRefresh = null
        });
    
        return store.inFlightRefresh;
};