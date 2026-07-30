import { QUERY_KEYS } from '@@shop/constants';
import { useCartStore } from '@@shop/store/cart';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

function useCartInvalidator() {
    const queryClient = useQueryClient();

    useEffect(() => {
        const unsubscribe = useCartStore.subscribe(
            (currentItems, previousItems) => {
                if(currentItems !== previousItems) {
                    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART_PRODUCTS] });
                }
            }
        );

        return () => unsubscribe();
    }, [queryClient]);
};

export default useCartInvalidator;