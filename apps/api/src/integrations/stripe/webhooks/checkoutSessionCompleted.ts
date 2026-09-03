import type Stripe from 'stripe';

import { render, OrderConfirmation } from '@repo/email-templates';
import { sendEmail } from '~/integrations/zoho/actions';
import { logs } from '~/utils';

export default async function checkoutSessionCompleted(session: Stripe.Checkout.Session) {
    
    if(!session.customer_details?.email) {
        throw new Error("Customer email missing from completed checkout session");
    }

    console.log({
        customerDetails: session.customer_details
    });

    logs.log({ message: `Sending order confirmation email to ${session.customer_details.email} for order ${session.id}` });
    
    const emailTemplate = await render(OrderConfirmation({
        customerName: session.customer_details.name ?? "Cult Member",
        orderNumber: session.id,
        items: [],
        total: `$${(session.amount_total ?? 0) / 100}`,
        orderUrl: ""
    }));
    await sendEmail({
        to: session.customer_details.email,
        subject: `Order confirmation ${session.id}`,
        htmlContent: emailTemplate
    });
};