import { createLazyFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

import {
    ToastError 
} from '@repo/ui';
import { useThemeStore } from '@@admin/store/theme';
import Search from '@@admin/components/Search';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { 
    AddSale, 
    EventSales, 
    OnlineSales, 
    SalesList, 
    TotalRevenue, 
    OtherSales
} from '@@admin/components/Sales';
import { saleApi, SaleType } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/sales/')({
    component: Sales,
});

function Sales() {

    const theme = useThemeStore((state) => state.theme);
    const [search, setSearch] = useState("");

    const query = useQuery({
        queryKey: ["sales"],
        queryFn: saleApi.fetchAll
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching sales"} />
        ));
    }, [query.isError, query.error]);

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
                        <TotalRevenue sales={query.data} />
                        <EventSales sales={query.data.filter((sale) => sale.sale_type === ("EVENT" as SaleType))} />
                        <OnlineSales sales={query.data.filter((sale) => sale.sale_type === ("ONLINE" as SaleType))} />
                        <OtherSales sales={query.data.filter((sale) => !(["ONLINE", "EVENT"] as SaleType[]).includes(sale.sale_type as SaleType))} />
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
                    {
                        query.isLoading ?
                        <BeatLoader
                            className="flex flex-1 items-center justify-center mt-10"
                            size={15}
                            color={theme.colors.primary}
                        />
                        :
                        <SalesList search={search} sales={query.data ?? []} />
                    }
                </div>
            </div>
        </Layout>
    );
};
