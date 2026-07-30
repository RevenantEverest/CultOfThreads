import type { ProductFormValues } from '@@admin/components/Forms/ProductForm';

import { createLazyFileRoute } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ProductForm } from '@@admin/components/Forms/ProductForm';

import { products } from '@repo/queries';
import { Product } from '@repo/entities';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createLazyFileRoute('/dashboard/products/add')({
    component: AddProduct,
});

function AddProduct() {

    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutation = products.hooks.useCreate(queryClient);

    const initialValues: ProductFormValues = {
        name: "",
        description: JSON.stringify([]),
        marketPrice: "",
        onlinePrice: "",
        weightGrams: "",
        status: "DRAFT",
        etsyListing: "",
        categories: [],
        tags: [],
        images: []
    };

    const onSubmit = async (values: ProductFormValues) => {

        try {
            await mutation.mutateAsync({
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    name: values.name,
                    description: values.description,
                    marketPrice: values.marketPrice,
                    onlinePrice: values.onlinePrice,
                    status: values.status as Product["details"]["status"],
                    weightGrams: values.weightGrams,
                    tags: values.tags,
                    categories: values.categories,
                    files: values.images
                }
            });

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
