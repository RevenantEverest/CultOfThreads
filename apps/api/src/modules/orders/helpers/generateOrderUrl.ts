import { Order } from '@repo/entities';
import issueOrderToken from './issueOrderToken.helper';

import { ENV } from '~/constants';

export default function generateOrderUrl(order: Order): string {
    
    const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000;
                
    const tokenExpiresAt = new Date(order.createdAt).getTime() * NINETY_DAYS_MS;
    const expiresInSeconds = Math.max(0, Math.floor((tokenExpiresAt - Date.now()) / 1000))

    const orderToken = issueOrderToken({ order, expiresIn: expiresInSeconds });

    const orderUrl = `${ENV.FRONTEND_URL}/orders/view?token=${orderToken}`;

    return orderUrl;
};