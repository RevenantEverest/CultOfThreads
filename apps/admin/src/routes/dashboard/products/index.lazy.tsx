import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { TailSpin } from 'react-loader-spinner';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import {
    ToastError 
} from '@repo/ui';

import { AddProduct, ProductsList } from '@@admin/components/Products';
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
                    <div className="flex w-full justify-end">
                        <AddProduct />
                    </div>
                </div>
                {
                    query.isLoading ?
                    <TailSpin
                        visible={true}
                        height="40"
                        width="40"
                        color={theme.colors.primary}
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperClass="flex flex-1 items-center justify-center"
                    />
                    :
                    <ProductsList search={search} products={query.data ?? []} />
                }
            </div>
        </Layout>
    );
};
