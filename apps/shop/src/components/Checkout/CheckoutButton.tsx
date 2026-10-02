"use client"

import { toast } from 'react-hot-toast';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Button, ToastError } from '@repo/ui';
import { checkout } from '@repo/queries';
import { useCartStore } from '@@shop/store/cart';

interface CheckoutButtonProps {
    className?: React.HTMLAttributes<HTMLButtonElement>["className"]
};

export default function CheckoutButton({ className }: CheckoutButtonProps) {

    const cart = useCartStore((state) => state);
    const mutation = checkout.hooks.useCreateCheckoutSession();

    const handleCheckout = async () => {
        try {
            const response = await mutation.mutateAsync({
                payload: {
                    items: cart.cart.items,
                    ...((cart.customerNote && cart.customerNote !== "") && { notes: cart.customerNote }) 
                }
            });

            cart.setCustomerNote("");

            window.location.href = response.results.url;
        }
        catch(err) {
            console.error("Error trying to create checkout session", err);
            toast((t) => (
                <ToastError toast={t} message="Error trying to create checkout session" />
            ));
        }
    };

    return(
        <Button className={className} onClick={handleCheckout}>
            Proceed to checkout <FaLongArrowAltRight />
        </Button>
    );
};