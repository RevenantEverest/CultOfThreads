import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { type OrderFormValues, OrderForm } from '@@admin/components/Forms/OrderForm';

import { useAuthStore } from '@@admin/store/auth';

import { orders } from '@repo/queries';
import { Order } from '@repo/entities';

export const Route = createFileRoute('/dashboard/orders/edit/$orderId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        orders.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.orderId,
            authToken: authToken.accessToken
        });
    },
    component: EditOrder,
});

function EditOrder() {

    const params = Route.useParams();
    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { data, isLoading } = orders.hooks.useGetOne({
        id: params.orderId,
        authToken: auth.session?.accessToken ?? ""
    });

    const mutation = orders.hooks.useUpdate(queryClient);

    const onSubmit = async (values: OrderFormValues) => {
        if(!data?.results) {
            return;
        }

        try {

            await mutation.mutateAsync({
                id: data.results.id,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    status: values.status as Order["status"],
                    ...(values.customerEmail && { customerEmail: values.customerEmail }),
                    ...(values.customerName && { customerName: values.customerName}),
                    ...(values.billingAddress && { billingAddress: values.billingAddress }),
                    ...(values.shippingAddress && { shippingAddress: values.shippingAddress }),
                    ...(values.trackingNumber && { trackingNumber: values.trackingNumber })
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Order updated!"} />
            ));

            navigate({ 
                to: "/dashboard/orders/item/$orderId", 
                params: { orderId: data.results.id } 
            });
        }
        catch(error) {
            console.error("Mutation Error: ", error);
            toast((t) => (
                <ToastError toast={t} message={"Error updating order"} />
            ));
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        Edit Order: <span className="text-muted">{data?.results.id}</span>
                    </h1>
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Orders", path: "/dashboard/orders" },
                        { title: "Edit", path: "/dashboard/orders/edit/$orderId" },
                    ]}
                />
            </div>
            <div className="my-20">
                {
                    !data?.results || isLoading ? 
                    <Spinner /> :
                    <OrderForm
                        type="update"
                        initialValues={{
                            customerName: data.results.customerName,
                            customerEmail: data.results.customerEmail,
                            amountSubtotalInCents: (data.results.amountSubtotalInCents ?? 0).toString(),
                            amountTotalInCents: (data.results.amountTotalInCents ?? 0).toString(),
                            billingAddress: data.results.billingAddress,
                            shippingAddress: data.results.shippingAddress,
                            trackingNumber: data.results.trackingNumber,
                            status: data.results.status,
                            stripeCheckoutSessionId: data.results.stripeCheckoutSessionId,
                            stripeTransactionId: data.results.stripeTransactionId,
                        }}
                        onSubmit={onSubmit}
                        orderLineItems={data.results.orderLineItems}
                    />
                }
            </div>
        </Layout>
    );
};
