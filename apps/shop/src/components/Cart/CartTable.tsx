"use client"

import type { Product } from '@repo/entities';

import { Card, CardContent, TableFlatList, Button } from '@repo/ui';
import { Spinner } from '@@shop/components/Common';

import { useCartStore } from '@@shop/store/cart';
import CartTableHeader from './CartTableHeader';
import CartTableRow from './CartTableRow';
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

interface CartTableProps {
    products?: Product[],
    isLoading?: boolean
};

function CartTable({ products, isLoading }: CartTableProps) {

    const cartItems = useCartStore((state) => state.cart.items);
    const getTotalCartQuantities = useCartStore((state) => state.getTotalQuantities);

    return(
        <Card>
            <CardContent className="pt-10">
                <div className="flex items-center text-xl font-bold pb-5">
                    <p className="flex-1">Shopping Cart</p>
                    <p>{getTotalCartQuantities().toLocaleString()} Items</p>
                </div>
                <TableFlatList
                    keyExtractor={(item: Product) => item.id}
                    data={products ?? []}
                    renderHeader={() => (<CartTableHeader />)}
                    renderItem={({ item, key }) => (
                        <CartTableRow 
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
                <div>
                    <Link href="/shop">
                        <Button colorScheme="cardLight">
                            <FaArrowLeftLong />
                            Go back to shopping
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default CartTable;