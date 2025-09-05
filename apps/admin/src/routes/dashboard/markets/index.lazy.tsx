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
import { MarketList, AddMarket } from '@@admin/components/Markets';

import { marketApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/markets/')({
    component: Markets,
});

function Markets() {

    const theme = useThemeStore((state) => state.theme);
    const query = useQuery({ 
        queryKey: ["markets"], 
        queryFn: marketApi.fetchAll
    });

    const [search, setSearch] = useState("");

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching markets"} />
        ));
    }, [query.isError, query.error]);

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
                {
                    query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <MarketList search={search} markets={query.data ?? []} />
                }
            </div>
        </Layout>
    );
};
