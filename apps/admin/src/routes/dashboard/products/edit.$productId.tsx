import type { ProductFormValues } from '@@admin/components/Forms/ProductForm';
import type { Product, ProductMedia } from '@repo/entities';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { ProductForm } from '@@admin/components/Forms/ProductForm';

import StatusBadge from '@@admin/components/Products/StatusBadge';

import { useAuthStore } from '@@admin/store/auth';
import { products } from '@repo/queries';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard/products/edit/$productId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;
        
        if(!authToken?.accessToken) return;

        products.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.productId,
            authToken: authToken.accessToken
        });
    },
    component: EditProduct,
});

function EditProduct() {

    const auth = useAuthStore((state) => state.auth);
    const params = Route.useParams();
    const navigate = useNavigate();

    const [removedImages, setRemovedImages] = useState<string[]>([]);

    const { data, isLoading } = products.hooks.useGetOne({
        authToken: auth.session?.accessToken ?? "",
        id: params.productId
    });

    const queryClient = useQueryClient();
    const mutation = products.hooks.useUpdate(queryClient);

    const onSubmit = async (values: ProductFormValues) => {
        if(!data?.results.details) return;

        try {
            await mutation.mutateAsync({
                id: params.productId,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    name: values.name,
                    description: values.description,
                    marketPrice: values.marketPrice,
                    onlinePrice: values.onlinePrice,
                    status: values.status as Product["details"]["status"],
                    weightGrams: values.weightGrams,
                    etsyListing: values.etsyListing,
                    tags: values.tags,
                    categories: values.categories,
                    media: data.results.media.filter((media) => !removedImages.includes(media.id)),
                    files: values.images
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Product Updated!"} />
            ));

            navigate({ to: "/dashboard/products" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Updating Product"} />
            ))
        }
    };

    const onRemoveImage = async (image: ProductMedia) => {
        setRemovedImages((prevState) => [...prevState, image.id]);
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        {data?.results.name}
                    </h1>
                    {
                        data?.results.details?.status &&
                        <StatusBadge size="md" status={data?.results.details.status as Product["details"]["status"]} />
                    }
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Products", path: "/dashboard/products" },
                        { title: "Edit", path: "/dashboard/products/edit/$productId" },
                    ]}
                />
            </div>
            <div className="my-20">
                
                {
                    isLoading || !data?.results ?
                    <Spinner /> :
                    <ProductForm
                        type="update"
                        initialValues={{
                            name: data.results.name ?? "",
                            description: data.results.description ?? "",
                            marketPrice: data.results.details.marketPrice.toString() ?? "0",
                            onlinePrice: data.results.details.onlinePrice.toString() ?? "0",
                            weightGrams: data.results.details.weightGrams.toString() ?? "0",
                            status: data.results.details.status ?? "",
                            etsyListing: data.results.details.etsyListing ?? "",
                            categories: data.results.categories ? data.results.categories.map((c) => c.category.id) : [],
                            tags: data.results.tags ? data.results.tags.map((t) => t.tag.id) : [],
                            // categories: [],
                            // tags: [],
                            images: []
                        }}
                        productImages={data?.results.media.filter((media) => !removedImages.includes(media.id)) ?? []}
                        onSubmit={onSubmit}
                        onRemoveImage={onRemoveImage}
                    />
                }
            </div>
        </Layout>
    );
};
