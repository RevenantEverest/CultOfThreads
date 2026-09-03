import { store } from '~/integrations/zoho/zoho';

export default function invalidateTokenCache() {
    store.cachedToken = null;

    return;
};