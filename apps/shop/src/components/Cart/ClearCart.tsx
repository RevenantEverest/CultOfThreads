"use client"

import { useCartStore } from '@@shop/store/cart';
import { useEffect } from 'react';

export default function ClearCart() {

    const emptyCart = useCartStore((state) => state.emptyCart);

    useEffect(() => {
        emptyCart();
    }, [emptyCart]);

    return null;
};