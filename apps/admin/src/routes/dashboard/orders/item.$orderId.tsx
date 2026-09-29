import { createFileRoute } from '@tanstack/react-router';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { Order } from '@@admin/components/Orders';

import { useAuthStore } from '@@admin/store/auth';

import { orders } from '@repo/queries';

export const Route = createFileRoute('/dashboard/orders/item/$orderId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        orders.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.orderId,
            authToken: authToken.accessToken
        });
    },
    component: OrderItem,
});

function OrderItem() {
    const auth = useAuthStore((state) => state.auth);
    const params = Route.useParams();

    const { data, isLoading } = orders.hooks.useGetOne({
        id: params.orderId,
        authToken: auth.session?.accessToken ?? ""
    });

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">{data?.results.id}</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Orders", path: "/dashboard/orders" },
                        { title: "Item", path: "/dashboard/orders/item/$orderId" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                {
                    isLoading || !data?.results ?
                    <Spinner /> :
                    <Order order={data?.results} />
                }
            </div>
        </Layout>
    );
};