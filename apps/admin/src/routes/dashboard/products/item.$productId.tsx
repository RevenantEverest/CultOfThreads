import { createFileRoute } from '@tanstack/react-router';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';

import { Product } from '@@admin/components/Products';
import { useAuthStore } from '@@admin/store/auth';
import { products } from '@repo/queries';

export const Route = createFileRoute('/dashboard/products/item/$productId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        products.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.productId,
            authToken: authToken.accessToken
        });
    },
    component: ProductItem,
})

function ProductItem() {

    const auth = useAuthStore((state) => state.auth);
    const params = Route.useParams();

    const { data, isLoading } = products.hooks.useGetOne({
        id: params.productId,
        authToken: auth.session?.accessToken ?? ""
    });

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">{data?.results.name}</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Products", path: "/dashboard/products" },
                        { title: "Item", path: "/dashboard/products/item/$productId" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="flex w-full justify-end">
                        {/* <AddSale /> */}
                    </div>
                </div>
                {
                    isLoading || !data?.results ?
                    <Spinner /> :
                    <Product product={data?.results} />
                }
            </div>
        </Layout>
    );
};
