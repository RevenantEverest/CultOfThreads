"use client"

import type { Product } from '@repo/entities';

import { Card, CardContent, FlatList } from '@repo/ui';
import { Spinner } from '@@shop/components/Common';

import CheckoutItem from './CheckoutItem';
import { useCartStore } from '@@shop/store/cart';

interface CheckoutItemListProps {
    products?: Product[],
    isLoading?: boolean
};

function CheckoutItemList({ products, isLoading }: CheckoutItemListProps) {

    const cartItems = useCartStore((state) => state.cart.items);

    return(
        <Card>
            <CardContent className="pt-10">
                <FlatList
                    keyExtractor={(item: Product) => item.id}
                    data={products ?? []}
                    renderItem={({ item, key }) => (
                        <CheckoutItem 
                            key={key} 
                            product={item} 
                            cartItem={
                                cartItems?.find((cProduct) => cProduct.productId === item.id) ?? { quantity: 0, productId: item.id }
                            }
                        />
                    )}
                    renderLoading={() => <Spinner />}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
};

export default CheckoutItemList;