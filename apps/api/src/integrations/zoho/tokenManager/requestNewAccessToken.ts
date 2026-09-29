import type { CachedToken } from '~/types/zoho';

import { ENV } from '~/constants';

interface ZohoTokenResponse {
    access_token: string,
    expires_in: number,
    api_domain: string,
    token_type: string
};

const REFRESH_URL = "https://accounts.zoho.com/oauth/v2/token";

export default async function requestNewAccessToken(): Promise<CachedToken> {
    const response = await fetch(REFRESH_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            client_id: ENV.ZOHO_CLIENT_ID,
            client_secret: ENV.ZOHO_CLIENT_SECRET,
            refresh_token: ENV.ZOHO_REFRESH_TOKEN
        })
    });

    if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Zoho token refresh failed (${response.status}): ${errBody}`);
    }

    const data = (await response.json()) as ZohoTokenResponse;

    if (!data.access_token || !data.expires_in) {
        throw new Error(`Zoho token refresh returned unexpected payload: ${JSON.stringify(data)}`);
    }

    return {
        accessToken: data.access_token,
        expiresAt: Date.now() + data.expires_in * 1000,
    };
};