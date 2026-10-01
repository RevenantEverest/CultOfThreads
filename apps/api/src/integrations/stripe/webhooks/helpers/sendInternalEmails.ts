import type { Order } from '@repo/entities';

import { sendEmail } from '~/integrations/zoho/actions';
import { logs } from '~/utils';

export default async function sendInternalEmails(order: Order) {

    const internalEmailsToNotify = ["stefischer@mail.com", "paigejohanson9@gmail.com"];

    try {
        const promises = internalEmailsToNotify.map((email) => sendEmail({
            to: email,
            subject: "New Order Placed",
            htmlContent: `New order placed at Cult of Threads, order id: ${order.id}`
        }));

        await Promise.allSettled(promises);
    }
    catch(err) {
        logs.error({ err: err as Error, message: `Internal notification email failed for order ${order.id}` });
    }
};