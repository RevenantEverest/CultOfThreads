import { ENV } from '~/constants';
import { PromiseTuple } from '~/types/promises';
import { logs } from '~/utils';

interface ZohoAccessTokenResponse {
    accessToken: string,
    refreshToken: string
};

const ACCESS_TOKEN_URL = 'https://accounts.zoho.com/oauth/v2/token';

export default async function generateAccessToken(code: string): PromiseTuple<ZohoAccessTokenResponse> {
    try {
        const response = await fetch(ACCESS_TOKEN_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/x-www-form-urlencoded" 
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: ENV.ZOHO_CLIENT_ID,
                client_secret: ENV.ZOHO_CLIENT_SECRET,
                redirect_uri: "https://cultofthreads.com",
                code: code
            })
        });

        const { access_token, refresh_token } = await response.json();
        
        const data: ZohoAccessTokenResponse = {
            accessToken: access_token,
            refreshToken: refresh_token
        };

        return [data, undefined];
    }
    catch(err) {
        return [undefined, err as Error];
    }
};