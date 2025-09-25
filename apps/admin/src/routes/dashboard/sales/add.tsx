import type { CreateSale, ProductWithDetails, SaleType } from '@repo/supabase';
import type { SaleFormValues } from '@@admin/components/Forms/SaleForm';

import { createFileRoute, useSearch } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import SaleForm from '@@admin/components/Forms/SaleForm';

import { eventsApi, productApi, saleApi } from '@repo/supabase';
import { useSuspenseQueries } from '@tanstack/react-query';

export const Route = createFileRoute('/dashboard/sales/add')({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            productId: (search?.productId as string) ?? "",
        }
    },
    loader: ({ context }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["products"],
            queryFn: productApi.fetchListings
        });

        context.queryClient.prefetchQuery({
            queryKey: ["events"],
            queryFn: eventsApi.fetchAll
        });
    },
    component: AddSale,
});

function AddSale() {

    const navigate = useNavigate();
    const searchParams = useSearch({ from: '/dashboard/sales/add' });
    
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: saleApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
        }
    });

    const [products, events] = useSuspenseQueries({
        queries: [
            { queryKey: ["products"], queryFn: productApi.fetchAll },
            { queryKey: ["events"], queryFn: eventsApi.fetchAll }
        ]
    });

    const initialValues: SaleFormValues = {
        product_id: searchParams.productId,
        sale_type: "",
        event_id: "",
        sale_price: "",
        notes: JSON.stringify([]),
        purchase_date: ""
    };

    const getProductPrice = (product: ProductWithDetails, saleType: SaleType): number => {

        if(!product.details || !product.details.online_price || !product.details.market_price) {
            throw new Error("Product has no details, cannot determine price");
        }

        switch(saleType) {
            case "EVENT":
                return product.details.market_price;
            case "ONLINE":
                return product.details.online_price;
            default: 
                return product.details.online_price;
        };
    };

    const onSubmit = async (values: SaleFormValues) => {

        const eventData = events.data.filter((e) => e.id === values.event_id);
        const productData = products.data.filter((p) => p.id === values.product_id);

        try {
            if(!productData[0]) {
                throw new Error("Product doesn't exist");
            }

            const originalPrice = getProductPrice(productData[0], values.sale_type as SaleType);

            const saleData: CreateSale = {
                product_id: values.product_id,
                event_id: values.event_id,
                market_name: eventData[0] && eventData[0].market.name,
                product_name: productData[0].name,
                original_product_price: originalPrice,
                sale_price: Number(values.sale_price),
                sale_type: values.sale_type,
                purchase_date: values.purchase_date,
                notes: values.notes
            };

            await mutation.mutateAsync(saleData);

            toast((t) => (
                <ToastSuccess toast={t} message={"Sale Added!"} />
            ));

            navigate({ to: "/dashboard/sales" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Creating Sale"} />
            ))
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Add Sale</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Sales", path: "/dashboard/sales" },
                        { title: "Add", path: "/dashboard/sales/add" },
                    ]}
                />
            </div>
            <div className="my-20">
                <SaleForm 
                    type="create" 
                    products={products.data}
                    events={events.data}
                    onSubmit={onSubmit} 
                    initialValues={initialValues}
                />
            </div>
        </Layout>
    );
};
