import type { ProductFormValues } from '@@admin/components/Forms/ProductForm';
import type { UpdateProductParams, ProductMedia, ProductDetailsStatus } from '@repo/supabase';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ProductForm } from '@@admin/components/Forms/ProductForm';

import { productApi, productMediaApi } from '@repo/supabase';
import StatusBadge from '@@admin/components/Products/StatusBadge';

export const Route = createFileRoute('/dashboard/products/edit/$productId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["products", params.productId],
            queryFn: () => productApi.fetchById(params.productId)
        });
    },
    component: EditProduct,
});

function EditProduct() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const { data } = useSuspenseQuery({ 
        queryKey: ["products", params.productId],
        queryFn: () => productApi.fetchById(params.productId)
    });

    const queryClient = useQueryClient();
    const productMedia = useQuery({ queryKey: ['product_media'], queryFn: () => productMediaApi.getByProductId(data.id) });
    const mutation = useMutation({
        mutationFn: productApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    const fileMutation = useMutation({
        mutationFn: productMediaApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product_media"] });
        }
    });

    const fileRemoveMutation = useMutation({
        mutationFn: productMediaApi.destroy,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["product_media"] });
            queryClient.setQueryData(["product_media"], (oldData: ProductMedia[]) => {
                const newData = oldData.filter((media) => media.id !== variables.id);
                return newData;
            });
        }
    });

    const initialValues: ProductFormValues = {
        name: data.name ?? "",
        description: data.description as string ?? "",
        market_price: data?.details?.market_price?.toString() ?? "0",
        online_price: data?.details?.online_price?.toString() ?? "0",
        weight_grams: data?.details?.weight_grams?.toString() ?? "0",
        status: data?.details?.status ?? "",
        etsy_listing: data?.details?.etsy_listing ?? "",
        images: []
    };

    const onSubmit = async (values: ProductFormValues) => {
        if(!data.details) return;

        const productData: UpdateProductParams = {
            id: data.id,
            name: values.name,
            description: values.description,
            details: {
                id: data.details.id,
                market_price: Number(values.market_price),
                online_price: Number(values.online_price),
                status: values.status,
                weight_grams: Number(values.weight_grams),
                etsy_listing: values.etsy_listing,
                created_at: data.details.created_at
            }
        };

        try {
            await mutation.mutateAsync(productData);

            for(let i = 0; i < values.images.length; i++) {
                const currentImage = values.images[i];

                if(!currentImage) {
                    continue;
                }

                await fileMutation.mutateAsync({ productId: data.id, file: currentImage });
            };

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
        try {
            await fileRemoveMutation.mutateAsync(image);

            toast((t) => (
                <ToastSuccess toast={t} message={"Media Removed!"} />
            ));
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Removing Product Media"} />
            ))
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        {data.name}
                    </h1>
                    {
                        data.details?.status &&
                        <StatusBadge size="md" status={data.details.status as ProductDetailsStatus} />
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
                <ProductForm
                    type="update"
                    initialValues={initialValues}
                    productImages={productMedia.data}
                    onSubmit={onSubmit}
                    onRemoveImage={onRemoveImage}
                />
            </div>
        </Layout>
    );
};
