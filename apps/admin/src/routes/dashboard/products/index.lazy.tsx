import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { BeatLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ToastError } from '@repo/ui';

import { AddProduct, ProductsList, ProductSettingsButton } from '@@admin/components/Products';
import { useThemeStore } from '@@admin/store/theme';
import Search from '@@admin/components/Search';

import { productApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/products/')({
    component: DashboardProducts,
});

function DashboardProducts() {

    const theme = useThemeStore((state) => state.theme);

    const query = useQuery({ queryKey: ['products'], queryFn: productApi.fetchAll });
    const [search, setSearch] = useState("");

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching products"} />
        ));
    }, [query.isError, query.error]);

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Products</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Products", path: "/dashboard/products" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex gap-2 w-full justify-end">
                        <AddProduct />
                        <ProductSettingsButton />
                    </div>
                </div>
                {
                    query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <ProductsList search={search} products={query.data ?? []} />
                }
            </div>
        </Layout>
    );
};
