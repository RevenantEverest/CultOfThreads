import { Order, OrderLineItem } from '@repo/entities';
import { entities, logs } from '~/utils';

interface LineItem {
    productId: string,
    quantity: number,
    price: number
};

export default async function addOrderLineItems(order: Order, lineItems: LineItem[]) {
    if(lineItems.length <= 0) {
        return [];
    }

    logs.log({ message: `Adding ${lineItems.length} products to order ${order.id}` });

    const results = await Promise.allSettled(
        lineItems.map(async (item) => {
            const [orderLineItem] = await entities.insert<OrderLineItem>(OrderLineItem, {
                order: {
                    id: order.id
                },
                product: {
                    id: item.productId
                },
                quantity: item.quantity,
                purchasePriceSnapshot: item.price
            });

            return orderLineItem;
        })
    )

    for(let i = 0; i < results.length; i++) {
        const transaction = results[i];

        if(transaction && transaction.status === "rejected") {
            logs.error({ 
                err: transaction.reason, 
                message: (
                    `Failed to add product to order at ${i}/${lineItems.length}\n` +
                    `Order ID: ${order.id}\n` +
                    `Product ID: ${lineItems[i]?.productId}`  
                )
            });
        }
    }
    
    const response = results
        .filter((transaction): transaction is PromiseFulfilledResult<OrderLineItem | undefined> => transaction.status === "fulfilled")
        .map((transaction) => transaction.value)
        .filter((transaction): transaction is OrderLineItem => !!transaction);

    return response;
};