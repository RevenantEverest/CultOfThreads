import type { ExtraValues, SaleFormValues } from '@@admin/components/Forms/SaleForm';
import type { Product, Sale } from '@repo/entities';

import { createFileRoute, useSearch } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import SaleForm from '@@admin/components/Forms/SaleForm';

import { useAuthStore } from '@@admin/store/auth';
import { events, products, sales } from '@repo/queries';

export const Route = createFileRoute('/dashboard/sales/add')({
    validateSearch: (search: Record<string, unknown>) => {
        return {
            productId: (search?.productId as string) ?? "",
        }
    },
    loader: ({ context }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        products.hooks.usePrefetchIndex(context.queryClient, {
            authToken: authToken.accessToken,
            pagination: {
                limit: 10
            }
        });

        events.hooks.usePrefetchIndex(context.queryClient, {
            authToken: authToken.accessToken,
            pagination: {
                limit: 10
            }
        });
    },
    component: AddSale,
});

function AddSale() {

    const auth = useAuthStore((state) => state.auth);

    const navigate = useNavigate();
    const searchParams = useSearch({ from: '/dashboard/sales/add' });
    
    const queryClient = useQueryClient();
    const mutation = sales.hooks.useCreate(queryClient);

    const productsQuery = products.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    const eventsQuery = events.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    const initialValues: SaleFormValues & Partial<ExtraValues> = {
        product: searchParams.productId,
        saleType: "",
        event: "",
        salePrice: "",
        notes: JSON.stringify([]),
        purchaseDate: ""
    };

    const nextProductsPage = () => {
        if(!productsQuery.hasNextPage) return;

        productsQuery.fetchNextPage();
    };

    const nextEventsPage = () => {
        if(!eventsQuery.hasNextPage) return;

        eventsQuery.fetchNextPage();
    };

    const getProductPrice = (product: Product, saleType: Sale["saleType"]): number => {

        if(!product.details || !product.details.onlinePrice || !product.details.marketPrice) {
            throw new Error("Product has no details, cannot determine price");
        }

        switch(saleType) {
            case "EVENT":
                return product.details.marketPrice;
            case "ONLINE":
                return product.details.onlinePrice;
            default: 
                return product.details.onlinePrice;
        };
    };

    const onSubmit = async (values: SaleFormValues & Partial<ExtraValues>) => {

        const events = eventsQuery.data?.pages.flatMap((page) => page.results) ?? [];
        const products = productsQuery.data?.pages.flatMap((page) => page.results) ?? [];

        const eventData = events.filter((e) => e.id === values.event);
        const productData = products.filter((p) => p.id === values.product);

        if(!productData[0] && !values.productName) {
            throw new Error("Either product or product name is required");
        }

        try {
            const originalPrice = productData[0] ? getProductPrice(productData[0], values.saleType as Sale["saleType"]) : values.salePrice;

            await mutation.mutateAsync({
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    productId: productData[0] ? values.product : undefined,
                    eventId: eventData[0] ? values.event : undefined,
                    marketName: eventData[0] ? eventData[0].market.name : (values.marketName ? values.marketName : undefined),
                    productName: productData[0] ? productData[0].name : values.productName as string, // type checked in above if statement
                    originalProductPrice: originalPrice.toString(),
                    salePrice: values.salePrice,
                    saleType: values.saleType as Sale["saleType"],
                    purchaseDate: values.purchaseDate,
                    notes: values.notes
                }
            });

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
                    products={
                        productsQuery.data?.pages.flatMap((page) => page.results) ?? []
                    }
                    events={
                        eventsQuery.data?.pages.flatMap((page) => page.results) ?? []
                    }
                    onSubmit={onSubmit} 
                    initialValues={initialValues}
                    nextProductsPage={nextProductsPage}
                    nextEventsPage={nextEventsPage}
                    isEventsLoading={eventsQuery.isLoading || eventsQuery.isFetching || !eventsQuery.data}
                    isProductsLoading={productsQuery.isLoading || productsQuery.isFetching || !productsQuery.data}
                />
            </div>
        </Layout>
    );
};
