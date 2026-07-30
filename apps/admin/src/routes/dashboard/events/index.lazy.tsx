import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { AddEvent, EventsTable } from '@@admin/components/Events';
import Search from '@@admin/components/Search';

import { useAuthStore } from '@@admin/store/auth';
import { events } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/events/')({
    component: Events,
});

function Events() {

    const auth = useAuthStore((state) => state.auth);

    const query = events.hooks.useIndex({
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
                <h1 className="text-4xl font-bold">Events</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Events", path: "/dashboard/events" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <AddEvent />
                    </div>
                </div>
                <EventsTable
                    events={
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
