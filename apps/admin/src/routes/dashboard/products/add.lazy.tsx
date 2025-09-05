import type { ProductFormValues } from '@@admin/components/Forms/ProductForm';
import type { ProductDetailsStatus } from '@repo/supabase';
import type { CreateProductParams } from '@repo/supabase';

import { createLazyFileRoute } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ProductForm } from '@@admin/components/Forms/ProductForm';

import { 
    productApi, 
    productCategoryApi, 
    productMediaApi,
    productTagApi
} from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/products/add')({
    component: AddProduct,
});

function AddProduct() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: productApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    });

    const fileMutation = useMutation({
        mutationFn: productMediaApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product_media"] })
        }
    });

    const categoryMutation = useMutation({
        mutationFn: productCategoryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    });

    const tagMutation = useMutation({
        mutationFn: productTagApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    });

    const initialValues: ProductFormValues = {
        name: "",
        description: JSON.stringify([]),
        market_price: "",
        online_price: "",
        weight_grams: "",
        status: "DRAFT" as ProductDetailsStatus,
        etsy_listing: "",
        categories: [],
        tags: [],
        images: []
    };

    const onSubmit = async (values: ProductFormValues) => {

        const productData: CreateProductParams = {
            name: values.name,
            description: values.description,
            details: {
                market_price: Number(values.market_price),
                online_price: Number(values.online_price),
                status: values.status as ProductDetailsStatus,
                weight_grams: Number(values.weight_grams)
            }            
        };

        try {
            const data = await mutation.mutateAsync(productData);
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
                const currentCategory = values.categories[i];

                if(!currentCategory) {
                    continue;
                }

                await categoryMutation.mutateAsync({ product_id: data.id, category_id: currentCategory });
            };

            /*
                Add Tags
            */
            for(let i = 0; i < values.tags.length; i++) {
                const currentTag = values.tags[i];

                if(!currentTag) {
                    continue;
                }

                await tagMutation.mutateAsync({ product_id: data.id, tag_id: currentTag });
            };

            toast((t) => (
                <ToastSuccess toast={t} message={"Product Created!"} />
            ));

            navigate({ to: "/dashboard/products" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Creating Product"} />
            ));
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Add Product</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Products", path: "/dashboard/products" },
                        { title: "Add", path: "/dashboard/products/add" },
                    ]}
                />
            </div>
            <div className="my-20">
                <ProductForm type="create" onSubmit={onSubmit} initialValues={initialValues} />
            </div>
        </Layout>
    );
};
