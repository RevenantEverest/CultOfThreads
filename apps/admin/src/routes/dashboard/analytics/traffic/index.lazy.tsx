import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { BeatLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

import { ToastError, Button } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import Search from '@@admin/components/Search';
import { TrafficAnalyticsTable } from '@@admin/components/Analytics';

import { useThemeStore } from '@@admin/store/theme';
import { useAuthStore } from '@@admin/store/auth';

import { trafficAnalytics } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/analytics/traffic/')({
    component: TrafficAnalytics,
})

function TrafficAnalytics() {

    const theme = useThemeStore((state) => state.theme);
    const auth = useAuthStore((state) => state.auth);
    const [search, setSearch] = useState("");

    const [refreshing, setRefreshing] = useState(false);

    const query = trafficAnalytics.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching traffic analytics"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Traffic Analytics</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Analytics", path: "/dashboard/analytics" },
                        { title: "Traffic", path: "/dashboard/analytics/traffic" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <Button 
                            colorScheme={"cardLight"}
                            onClick={async () => {
                                setRefreshing(true); 
                                await query.refetch();
                                setRefreshing(false); 

                            }}
                        >
                            {
                                refreshing ?
                                <BeatLoader
                                    className="flex flex-1 items-center justify-center"
                                    size={5}
                                    color={theme.colors.primary}
                                />
                                :
                                <div className="flex items-center gap-2">
                                    <FiRefreshCcw />
                                    Refresh
                                </div>
                            }
                        </Button>
                    </div>
                </div>
                <TrafficAnalyticsTable 
                    analytics={
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
