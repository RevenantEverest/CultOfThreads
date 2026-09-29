import { createLazyFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import Search from '@@admin/components/Search';

import { OrdersTable } from '@@admin/components/Orders';

import { useAuthStore } from '@@admin/store/auth';

import { orders } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/orders/')({
    component: Orders,
});

function Orders() {

    const auth = useAuthStore((state) => state.auth);
    const query = orders.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching orders"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Orders</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Orders", path: "/dashboard/orders" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex gap-2 w-full justify-end">
                        {/* <AddProduct />
                        <ProductSettingsButton /> */}
                    </div>
                </div>
                <OrdersTable
                    orders={
                        query.data?.pages.flatMap((page) => page.results) ?? []
                    } 
                    dataAmount={query.data?.pages[0] && query.data.pages[0].count}
                    search={search} 
                    isLoading={query.isLoading || query.isFetching || !query.data}
                    nextPage={nextPage}
                />
            </div>
        </Layout>
    );
};
