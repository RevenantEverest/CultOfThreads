import type { CartProduct } from '~/types/checkout';
import Stripe from 'stripe';
import { SHIPPING_OPTIONS } from '../../constants';

interface ValidatedOrderData {
    email: string,
    name: string | null,
    billingAddress: string,
    shippingAddress: string,
    internalOrderId: string,
    stripeTransactionId: string,
    amountSubtotalInCents: number,
    amountTotalInCents: number,
    shippingAmountInCents: number,
    shippingOptionName: string,
    shippingOptionId: string,
    taxCollectedInCents: number,
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
    if(session.total_details?.amount_tax == null) issues.push("amount_tax");
    if(session.shipping_cost?.amount_total == null) issues.push("shipping_total");

    const shippingRateId = typeof session.shipping_cost?.shipping_rate === "string"
        ? session.shipping_cost.shipping_rate
        : session.shipping_cost?.shipping_rate?.id

    const shippingOption = [SHIPPING_OPTIONS.STANDARD, SHIPPING_OPTIONS.EXPRESS].find(
        (option) => option.id === shippingRateId
    );

    if(!shippingRateId) {
        issues.push("shipping_cost.shipping_rate");
    }
    else if(!shippingOption) {
        issues.push(`shipping_cost.shipping_rate (unrecognized rate id: ${shippingRateId})`);
    }

    let cartProducts: CartProduct[] = [];
    try {
        const parsed = JSON.parse(session.metadata?.cartProducts ?? "[]");
        if(!Array.isArray(parsed)) throw new Error("Not an array");
        cartProducts = parsed;
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
        shippingAmountInCents: session.shipping_cost!.amount_total!,
        shippingOptionName: shippingOption!.name,
        shippingOptionId: shippingRateId!,
        taxCollectedInCents: session.total_details!.amount_tax!,
        cartProducts
    };

    return [validatedData, null];
};