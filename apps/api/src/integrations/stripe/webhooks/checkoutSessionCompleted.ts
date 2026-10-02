import type Stripe from 'stripe';
import type { FindOneOptions } from 'typeorm';

import { Order } from '@repo/entities';

import { render, OrderConfirmation } from '@repo/email-templates';
import { sendEmail } from '~/integrations/zoho/actions';

import { validateCheckoutSession, addLineItemsToSales, sendInternalEmails } from '~/integrations/stripe/webhooks/helpers';

import { entities, logs } from '~/utils';
import { generateOrderUrl } from '~/modules/orders/helpers';

export default async function checkoutSessionCompleted(session: Stripe.Checkout.Session) {
    const [validated, issues] = validateCheckoutSession(session);
    
    if(!validated) {
        logs.log({
            toFile: true,
            message: 
                `Checkout session ${session.id} is missing required fields and cannot be processed:\n` + 
                issues.map((issue) => `  - ${issue}`).join("\n")
        });
        throw new Error(`Checkout session ${session.id} incomplete - missing: ${issues.join(", ")}`)
    }
    
    const findOptions: FindOneOptions<Order> = {
        where: {
            id: validated.internalOrderId
        },
        relations: {
            orderLineItems: {
                product: {
                    details: true
                }
            }
        }
    };

    const [order, err] = await entities.findAndUpdate<Order>(Order, findOptions, {
        status: "PAID",
        customerEmail: validated.email,
        customerName: validated.name ?? "",
        billingAddress: validated.billingAddress,
        shippingAddress: validated.shippingAddress,
        stripeTransactionId: validated.stripeTransactionId,
        amountSubtotalInCents: validated.amountSubtotalInCents,
        amountTotalInCents: validated.amountTotalInCents,
        taxCollectedInCents: validated.taxCollectedInCents,
        shippingAmountInCents: validated.shippingAmountInCents,
        shippingOptionName: validated.shippingOptionName as Order["shippingOptionName"],
        shippingOptionId: validated.shippingOptionId
    });

    if(err) {
        logs.error({ err, message: `Error updating internal order ${validated.internalOrderId}`, toFile: true });
        throw new Error(`Order update failed for session ${session.id}`);
    }

    if(!order) {
        logs.log({ message: "No internal order returned in checkout session completed webhook" });
        throw new Error(`Order update failed for session ${session.id}`);
    }

    logs.log({ message: `Order ${order.id} marked paid for session ${session.id}` });

    await addLineItemsToSales(order);

    try {
        const orderUrl = generateOrderUrl(order);
        const emailTemplate = await render(OrderConfirmation({
            customerName: validated.name?.split(" ")[0] ?? "fellow Cultist",
            orderNumber: order.id,
            items: validated.cartProducts,
            total: `${((session.amount_total ?? 0) / 100).toLocaleString()}`,
            orderUrl
        }));
        await sendEmail({
            to: validated.email,
            subject: `Order confirmation ${order.id}`,
            htmlContent: emailTemplate
        });

        sendInternalEmails(order);
    }
    catch(err) {
        logs.error({ 
            err: err as Error, 
            message: `Order ${order.id} was saved successfully, but the confirmation email failed to send` })   
    }
        
};