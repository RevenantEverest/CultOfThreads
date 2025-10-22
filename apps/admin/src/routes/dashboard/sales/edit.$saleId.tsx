import type { ExtraValues, SaleFormValues } from '@@admin/components/Forms/SaleForm';


import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import SaleForm from '@@admin/components/Forms/SaleForm';

import { saleApi, productApi, eventsApi, Sale } from '@repo/supabase';

export const Route = createFileRoute('/dashboard/sales/edit/$saleId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["sales", params.saleId],
            queryFn: () => saleApi.fetchById(params.saleId)
        });
        context.queryClient.prefetchQuery({
            queryKey: ["products"],
            queryFn: productApi.fetchListings
        });

        context.queryClient.prefetchQuery({
            queryKey: ["events"],
            queryFn: eventsApi.fetchAll
        });
    },
    component: EditSale,
});

function EditSale() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const [sale, products, events] = useSuspenseQueries({ 
        queries: [
            { queryKey: ["sales", params.saleId], queryFn: () => saleApi.fetchById(params.saleId) },
            { queryKey: ["products"], queryFn: productApi.fetchAll },
            { queryKey: ["events"], queryFn: eventsApi.fetchAll },
        ]
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: saleApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sales"] });
        }
    });

    const initialValues: SaleFormValues & Partial<ExtraValues> = {
        product_id: sale.data.product_id ?? "",
        sale_type: sale.data.sale_type,
        event_id: sale.data.event_id ?? "",
        sale_price: sale.data.sale_price.toString(),
        notes: sale.data.notes as string ?? "",
        purchase_date: sale.data.purchase_date,
        market_name: sale.data.market_name ?? "",
        product_name: sale.data.product_name
    };

    const onSubmit = async (values: SaleFormValues & Partial<ExtraValues>) => {

        const eventData = events.data.filter((e) => e.id === values.event_id);
        const productData = products.data.filter((p) => p.id === values.product_id);

        try {

            if((!productData[0] && !values.product_name) || (!eventData[0] && !values.market_name)) {
                throw new Error("Missing required elements");
            }

            // const originalPrice = getProductPrice(productData[0], values.sale_type as SaleType);

            const saleData: Sale = {
                id: sale.data.id,
                created_at: sale.data.created_at,
                product_id: values.product_id === "" ? null : values.product_id,
                event_id: values.event_id === "" ? null : values.event_id,
                market_name: eventData[0] ? eventData[0].market.name : (values.market_name ?? null),
                product_name: productData[0] ? productData[0].name : values.product_name as string,
                original_product_price: 10,
                sale_price: Number(values.sale_price),
                sale_type: values.sale_type,
                purchase_date: values.purchase_date,
                notes: values.notes
            };

            await mutation.mutateAsync(saleData);

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
                <SaleForm
                    type="update"
                    products={products.data}
                    events={events.data}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            </div>
        </Layout>
    );
};
