import type { EventFormValues } from '@@admin/components/Forms/EventForm';

import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { BeatLoader } from 'react-spinners';
import { ToastSuccess, ToastError } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import EventForm from '@@admin/components/Forms/EventForm';

import { useThemeStore } from '@@admin/store/theme';
import { useAuthStore } from '@@admin/store/auth';
import { events, markets } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/events/add')({
    component: AddEvent,
});

function AddEvent() {

    const auth = useAuthStore((state) => state.auth);
    const theme = useThemeStore((state) => state.theme);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const marketsQuery = markets.hooks.useIndex({ 
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });
    const mutation = events.hooks.useCreate(queryClient);

    useEffect(() => {
        if(!marketsQuery.isError) return;

        console.error(marketsQuery.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching markets"} />
        ));
    }, [marketsQuery.isError, marketsQuery.error]);

    const initialValues: EventFormValues = {
        market: "",
        address: "",
        dateFrom: "",
        dateTo: ""
    };

    const nextPage = () => {
        if(!marketsQuery.hasNextPage) return;

        marketsQuery.fetchNextPage();
    };

    const onSubmit = async (values: EventFormValues) => {

        if(!values.image) {
            return;
        }

        const eventData: events.actions.CreatePayload = {
            marketId: values.market,
            address: values.address,
            dateFrom: values.dateFrom,
            dateTo: values.dateTo,
            file: values.image
        };

        try {
            await mutation.mutateAsync({
                authToken: auth.session?.accessToken ?? "",
                payload: eventData
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Event Added!"} />
            ));

            navigate({ to: "/dashboard/events" });
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Error creating Event"} />
            ));
        }
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Add Event</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Events", path: "/dashboard/events" },
                        { title: "Add", path: "/dashboard/events/add" },
                    ]}
                />
            </div>
            <div className="my-20">
                {
                    !marketsQuery.data || marketsQuery.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <EventForm 
                        type="create" 
                        markets={
                            marketsQuery.data?.pages.flatMap((page) => page.results) ?? []
                        } 
                        onSubmit={onSubmit} 
                        initialValues={initialValues}
                        nextPage={nextPage}
                        isLoading={marketsQuery.isLoading || marketsQuery.isFetching || !marketsQuery.data}
                    />
                }    
            </div>
        </Layout>
    );
};
