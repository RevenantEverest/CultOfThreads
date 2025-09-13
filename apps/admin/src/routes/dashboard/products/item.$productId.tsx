import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Layout, Breadcrumb } from '@@admin/components/Common';

import { productApi } from '@repo/supabase';
import { Product } from '@@admin/components/Products';

export const Route = createFileRoute('/dashboard/products/item/$productId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["products", params.productId],
            queryFn: () => productApi.fetchListingById(params.productId)
        });
    },
    component: ProductItem,
})

function ProductItem() {

    const params = Route.useParams();

    const { data } = useSuspenseQuery({ 
        queryKey: ["products", params.productId],
        queryFn: () => productApi.fetchListingById(params.productId)
    });

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">{data.name}</h1>
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
                <Product product={data} />
            </div>
        </Layout>
    );
};
