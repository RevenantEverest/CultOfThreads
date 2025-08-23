import { useEffect, useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';

import { ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { EventsList, AddEvent } from '@@admin/components/Events';
import Search from '@@admin/components/Search';

import { useThemeStore } from '@@admin/store/theme';

import { eventsApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/events/')({
    component: Events,
});

function Events() {

    const theme = useThemeStore((state) => state.theme);
    const query = useQuery({
        queryKey: ["events"],
        queryFn: eventsApi.fetchAll
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
                {
                    query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <EventsList search={search} events={query.data ?? []} />
                }
            </div>
        </Layout>
    );
};
