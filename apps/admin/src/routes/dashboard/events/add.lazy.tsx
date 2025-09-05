import type { EventFormValues } from '@@admin/components/Forms/EventForm';
import type { CreateEventParams } from '@repo/supabase';

import { useEffect } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { BeatLoader } from 'react-spinners';
import { ToastSuccess, ToastError } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import EventForm from '@@admin/components/Forms/EventForm';

import { eventsApi, marketApi } from '@repo/supabase';
import { useThemeStore } from '@@admin/store/theme';

export const Route = createLazyFileRoute('/dashboard/events/add')({
    component: AddEvent,
});

function AddEvent() {

    const theme = useThemeStore((state) => state.theme);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ["markets"],
        queryFn: marketApi.fetchAll
    });
    const mutation = useMutation({
        mutationFn: eventsApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching markets"} />
        ));
    }, [query.isError, query.error]);

    const initialValues: EventFormValues = {
        market_id: "",
        address: "",
        date_from: "",
        date_to: ""
    };

    const onSubmit = async (values: EventFormValues) => {

        if(!values.image) {
            return;
        }

        const eventData: CreateEventParams = {
            market_id: values.market_id,
            address: values.address,
            date_from: values.date_from,
            date_to: values.date_to,
            image: values.image
        };

        try {
            await mutation.mutateAsync(eventData);

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
                    !query.data || query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <EventForm type="create" markets={query.data} onSubmit={onSubmit} initialValues={initialValues} />
                }    
            </div>
        </Layout>
    );
};
