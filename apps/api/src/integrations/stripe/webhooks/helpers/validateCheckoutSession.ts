import type { CartProduct } from '~/types/checkout';
import Stripe from 'stripe';

interface ValidatedOrderData {
    email: string,
    name: string | null,
    billingAddress: string,
    shippingAddress: string,
    internalOrderId: string,
    stripeTransactionId: string,
    amountSubtotalInCents: number,
    amountTotalInCents: number,
    cartProducts: CartProduct[]
};

function formatAddress(address: Stripe.Address | null | undefined): string {
    if(!address) return "";

    const addressArr = [address.line1, address.line2, address.city, address.state, address.postal_code];

    return addressArr.filter(Boolean).join(", ");
};

export default function validateCheckoutSession(session: Stripe.Checkout.Session): [ValidatedOrderData, null] | [null, string[]] {
    const issues: string[] = [];

    const email = session.customer_details?.email;
    if(!email) issues.push("customer_details.email");

    const internalOrderId = session.metadata?.internalOrderId;
    if(!internalOrderId) issues.push("metadata.internalOrderId");

    const stripeTransactionId = session.payment_intent;
    if(!stripeTransactionId || typeof stripeTransactionId !== "string") {
        issues.push("payment_intent");
    }

    if(session.amount_subtotal == null) issues.push("amount_subtotal");
    if(session.amount_total == null) issues.push("amount_total");

    let cartProducts: CartProduct[] = [];
    try {
        cartProducts = JSON.parse(session.metadata?.cartProducts ?? "[]");
    }
    catch {
        issues.push("metadata.cartProducts (invalid JSON)");
    }

    if(issues.length > 0) {
        return [null, issues];
    }

    const validatedData: ValidatedOrderData = {
        email: email!,
        name: session.customer_details?.name ?? null,
        billingAddress: formatAddress(session.customer_details?.address),
        shippingAddress: formatAddress(session.collected_information?.shipping_details?.address),
        internalOrderId: internalOrderId!,
        stripeTransactionId: stripeTransactionId as string,
        amountSubtotalInCents: session.amount_subtotal!,
        amountTotalInCents: session.amount_total!,
        cartProducts
    };

    return [validatedData, null];
};