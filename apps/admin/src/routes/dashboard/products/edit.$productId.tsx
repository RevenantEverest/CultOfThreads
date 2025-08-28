import type { ProductFormValues } from '@@admin/components/Forms/ProductForm';
import type { UpdateProductParams, ProductMedia, ProductDetailsStatus } from '@repo/supabase';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ProductForm } from '@@admin/components/Forms/ProductForm';

import { productApi, productCategoryApi, productMediaApi } from '@repo/supabase';
import StatusBadge from '@@admin/components/Products/StatusBadge';

export const Route = createFileRoute('/dashboard/products/edit/$productId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["products", params.productId],
            queryFn: () => productApi.fetchListingById(params.productId)
        });
    },
    component: EditProduct,
});

function EditProduct() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const { data } = useSuspenseQuery({ 
        queryKey: ["products", params.productId],
        queryFn: () => productApi.fetchListingById(params.productId)
    });

    const queryClient = useQueryClient();
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

    const categoryMutation = useMutation({
        mutationFn: productCategoryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    const categoryRemoveMutation = useMutation({
        mutationFn: productCategoryApi.destroy,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
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
        categories: data.categories ? data.categories.map((c) => c.category_id) : [],
        tags: data.tags ? data.tags.map((t) => t.tag_id) : [],
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

            /*
                Add Categories
            */
            for(let i = 0; i < values.categories.length; i++) {
                const originalCategories = data.categories ? data.categories.map((c) => c.category_id) : [];
                const currentCategory = values.categories[i];

                if(!currentCategory || originalCategories.includes(currentCategory)) {
                    continue;
                }

                await categoryMutation.mutateAsync({ product_id: productData.id, category_id: currentCategory });
            };

            /*
                Remove Categories
            */
            if(data.categories) {
                for(let i = 0; i < data.categories.length; i++) {
                    const current = data.categories.map((c) => c.category_id)[i];

                    if(current && !values.categories.includes(current)) {
                        await categoryRemoveMutation.mutateAsync({ categoryId: current, productId: productData.id });
                    }
                };
            }

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
                    productImages={data.media ?? []}
                    onSubmit={onSubmit}
                    onRemoveImage={onRemoveImage}
                />
            </div>
        </Layout>
    );
};
