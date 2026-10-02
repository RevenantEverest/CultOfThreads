import { Product } from '@repo/entities';

import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { SiSquare } from 'react-icons/si';
import { FaStripeS } from 'react-icons/fa6';

import { Button, ToastSuccess, ToastError } from '@repo/ui';

import { products } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';
import { Spinner } from '../Common';

interface AddPaymentProviderProps {
    product: Product,
    provider: "STRIPE" | "SQUARE"
};

export default function AddPaymentProvider({ product, provider }: AddPaymentProviderProps) {
    
    const auth = useAuthStore((state) => state.auth);

    const queryClient = useQueryClient();
    const mutation = products.hooks.useAddPaymentProvider(queryClient);

    const ProviderIcon: Record<AddPaymentProviderProps["provider"], React.ReactNode> = {
        "STRIPE": <FaStripeS />,
        "SQUARE": <SiSquare />
    };

    const addPaymentProvider = async () => {
        const providerDisplay = provider.charAt(0) + provider.substring(1).toLowerCase();
        try {
            await mutation.mutateAsync({
                id: product.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    providerTarget: provider
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={`${providerDisplay} item assigned to product!`} />
            ));
        }
        catch(err) {
            console.error("Mutation error:", err);
            toast((t) => (
                <ToastError toast={t} message={`Error adding payment provider "${providerDisplay}" to product`} />
            ));
        }
    };

    return(
        <Button size="sm" colorScheme={"accent"} className="text-card" onClick={addPaymentProvider} disabled={mutation.isPending}>
            {
                mutation.isPending ?
                <Spinner color="card" /> :
                <>
                    Add Payment Provider {ProviderIcon[provider]}
                </> 
            }
        </Button>
    );
};