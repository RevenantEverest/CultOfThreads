import type { ExtraValues, SaleFormValues } from '@@admin/components/Forms/SaleForm';
import type { Product, Sale } from '@repo/entities';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import SaleForm from '@@admin/components/Forms/SaleForm';

import { useAuthStore } from '@@admin/store/auth';
import { events, products, sales } from '@repo/queries';

export const Route = createFileRoute('/dashboard/sales/edit/$saleId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;
        
        if(!authToken?.accessToken) return;

        sales.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.saleId,
            authToken: authToken.accessToken
        });

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
    component: EditSale,
});

function EditSale() {

    const auth = useAuthStore((state) => state.auth);

    const params = Route.useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const salesQuery = sales.hooks.useGetOne({
        id: params.saleId,
        authToken: auth.session?.accessToken ?? ""
    });

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

    const mutation = sales.hooks.useUpdate(queryClient);

    const setInitialValues = (sale: Sale): SaleFormValues & Partial<ExtraValues> => {
        return {
            product: sale.product?.id ?? "",
            saleType: sale.saleType ?? "",
            event: sale.event?.id ?? "",
            salePrice: sale.salePrice.toString() ?? "",
            notes: sale.notes ?? "",
            purchaseDate: sale.purchaseDate.toString() ?? "",
            marketName: sale.marketName ?? "",
            productName: sale.productName
        };
    };

    const getProductPrice = (saleType: Sale["saleType"], product?: Product) => {

        if(!product) {
            return;
        }

        switch(saleType) {
            case "EVENT":
                return product.details.marketPrice.toString();
            case "ONLINE":
                return product.details.onlinePrice.toString();
            default:
                return product.details.onlinePrice.toString();
        }
    };

    const onSubmit = async (values: SaleFormValues & Partial<ExtraValues>) => {

        if(!salesQuery.data?.results) {
            return;
        }

        const events = eventsQuery.data?.pages.flatMap((page) => page.results) ?? [];
        const products = productsQuery.data?.pages.flatMap((page) => page.results) ?? [];

        const saleEvent = events.find((event) => event.id === values.event);
        const saleProduct = products.find((product) => product.id === values.product);
        const sale = salesQuery.data.results;

        try {
            if((!saleProduct && !values.productName)) {
                throw new Error("Missing required elements");
            }

            const originalPrice = getProductPrice(values.saleType as Sale["saleType"], saleProduct);

            await mutation.mutateAsync({
                id: sale.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    productId: values.product === "" ? undefined : values.product,
                    eventId: values.event === "" ? undefined : values.event,
                    marketName: saleEvent ? saleEvent.market.name : (values.marketName ?? undefined),
                    productName: saleProduct ? saleProduct.name : values.productName as string,
                    originalProductPrice: originalPrice ?? values.originalProductPrice ?? "0",
                    salePrice: values.salePrice,
                    saleType: values.saleType as Sale["saleType"],
                    purchaseDate: values.purchaseDate,
                    notes: values.notes
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Sale Updated!"} />
            ));

            navigate({ to: "/dashboard/sales" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Updating Sale"} />
            ))
        }
    };

    const nextProductsPage = () => {
        if(!productsQuery.hasNextPage) return;

        productsQuery.fetchNextPage();
    };

    const nextEventsPage = () => {
        if(!eventsQuery.hasNextPage) return;

        eventsQuery.fetchNextPage();
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        Edit Sale
                    </h1>
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Sales", path: "/dashboard/sales" },
                        { title: "Edit", path: "/dashboard/sales/edit/$saleId" },
                    ]}
                />
            </div>
            <div className="my-20">
                {
                    !salesQuery.data?.results || salesQuery.isLoading ?
                    <Spinner />
                    :
                    <SaleForm
                        type="update"
                        products={
                            productsQuery.data?.pages.flatMap((page) => page.results) ?? []
                        }
                        events={
                            eventsQuery.data?.pages.flatMap((page) => page.results) ?? []
                        }
                        initialValues={setInitialValues(salesQuery.data.results)}
                        onSubmit={onSubmit}
                        nextProductsPage={nextProductsPage}
                        nextEventsPage={nextEventsPage}
                        isEventsLoading={eventsQuery.isLoading || eventsQuery.isFetching || !eventsQuery.data}
                        isProductsLoading={productsQuery.isLoading || productsQuery.isFetching || !productsQuery.data}
                    />
                }
                
            </div>
        </Layout>
    );
};
