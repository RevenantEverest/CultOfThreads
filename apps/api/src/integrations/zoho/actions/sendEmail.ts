import { ENV } from '~/constants';
import { getAccessToken, invalidateTokenCache } from '~/integrations/zoho/tokenManager';

interface SendEmailPayload {
    to: string,
    subject: string,
    htmlContent: string
};

const ACCOUNTS_URL = "https://mail.zoho.com/api/accounts";

export default async function sendEmail(payload: SendEmailPayload) {

    const accessToken = await getAccessToken();

    const response = await fetch(
        `${ACCOUNTS_URL}/${ENV.ZOHO_ACCOUNT_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fromAddress: `Cult of Threads <${ENV.ZOHO_EMAIL}>`,
                toAddress: payload.to,
                subject: payload.subject,
                content: payload.htmlContent,
                mailFormat: "html"
            })
        }
    )

    if(response.status === 401) {
        invalidateTokenCache();
        return sendEmail(payload);
    }

    if(!response.ok) {
        const errBody = await response.text();
        throw new Error(`Zoho send failed (${response.status}): ${errBody}`);
    }

    const responseBody = response.json();

    return responseBody;
};