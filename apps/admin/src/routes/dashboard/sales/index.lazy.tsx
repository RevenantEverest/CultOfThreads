import { createLazyFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import {
    ToastError 
} from '@repo/ui';
import { useThemeStore } from '@@admin/store/theme';
import Search from '@@admin/components/Search';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { 
    AddSale, 
    EventSalesCard, 
    OnlineSalesCard,
    TotalRevenueCard, 
    OtherSalesCard,
    SalesTable
} from '@@admin/components/Sales';
import { sales } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createLazyFileRoute('/dashboard/sales/')({
    component: Sales,
});

function Sales() {

    const auth = useAuthStore((state) => state.auth);
    const theme = useThemeStore((state) => state.theme);
    const [search, setSearch] = useState("");

    const query = sales.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    const aggregateTotalsQuery = sales.hooks.useAggregatedTotals({
        authToken: auth.session?.accessToken ?? ""
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching sales"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Sales</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Sales", path: "/dashboard/sales" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-15">
                {
                    query.isLoading || !query.data ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <div className="flex flex-col lg:flex-row gap-3">
                        {
                            !aggregateTotalsQuery.data?.results || aggregateTotalsQuery.isLoading ?
                            <Spinner />
                            :
                            <>
                                <TotalRevenueCard total={aggregateTotalsQuery.data.results.revenue.total} />
                                <EventSalesCard total={aggregateTotalsQuery.data.results.revenue.event} />
                                <OnlineSalesCard total={aggregateTotalsQuery.data.results.revenue.online} />
                                <OtherSalesCard total={aggregateTotalsQuery.data.results.revenue.uncategorized} />
                            </>
                        }
                    </div>
                }
                <div className="flex flex-col gap-5">
                    <div className="flex">
                        <div className="w-full">
                            <Search setSearch={setSearch} />
                        </div>
                        <div className="flex w-full justify-end">
                            <AddSale />
                        </div>
                    </div>
                    <SalesTable
                        sales={
                            query.data?.pages.flatMap((page) => page.results) ?? []
                        } 
                        dataAmount={query.data?.pages[0] && query.data.pages[0].count}
                        search={search} 
                        isLoading={query.isLoading || query.isFetching || !query.data}
                        nextPage={nextPage}
                    />
                </div>
            </div>
        </Layout>
    );
};
