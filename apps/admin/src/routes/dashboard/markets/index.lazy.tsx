import { createLazyFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import Search from '@@admin/components/Search';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { AddMarket, MarketsTable } from '@@admin/components/Markets';

import { useAuthStore } from '@@admin/store/auth';

import { markets } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/markets/')({
    component: Markets,
});

function Markets() {

    const auth = useAuthStore((state) => state.auth);
    const [search, setSearch] = useState("");

    const query = markets.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching markets"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Markets</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Markets", path: "/dashboard/markets" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <AddMarket />
                    </div>
                </div>
                <MarketsTable
                    markets={
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
