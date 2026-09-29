import { Order, Sale } from '@repo/entities';
import { entities, logs } from '~/utils';

interface LineItem {
    productId: string,
    productName: string,
    originalProductPrice: number,
    salePrice: number
};

export default async function addLineItemsToSales(order: Order) {
    if(order.orderLineItems.length <= 0) {
        return [];
    }

    const lineItems: LineItem[] = [];

    for(let i = 0; i < order.orderLineItems.length; i++) {
        const current = order.orderLineItems[i];

        if(current) {
            for(let x = 0; x < current.quantity; x++) {
                lineItems.push({
                    productId: current.product.id,
                    productName: current.product.name,
                    originalProductPrice: current.product.details.onlinePrice,
                    salePrice: current.purchasePriceSnapshot / current.quantity
                });
            }
        }
    };

    logs.log({ message: `Adding ${lineItems.length} products to order ${order.id}` });

    const results = await Promise.allSettled(
        lineItems.map(async (item, index) => {
            const [orderLineItem, err] = await entities.insert<Sale>(Sale, {
                product: {
                    id: item.productId
                },
                productName: item.productName,
                originalProductPrice: item.originalProductPrice,
                salePrice: item.salePrice,
                saleType: "ONLINE",
                purchaseDate: new Date(),
                notes: JSON.stringify([]),
                order: {
                    id: order.id
                }
            });

            if(err) {
                throw err;
            }

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
        .filter((transaction): transaction is PromiseFulfilledResult<Sale | undefined> => transaction.status === "fulfilled")
        .map((transaction) => transaction.value)
        .filter((transaction): transaction is Sale => !!transaction);

    return response;
};