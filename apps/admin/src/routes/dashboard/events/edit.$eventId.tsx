import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastError, ToastSuccess } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import EventForm, { EventFormValues } from '@@admin/components/Forms/EventForm';

import { eventsApi, marketApi } from '@repo/supabase';

export const Route = createFileRoute('/dashboard/events/edit/$eventId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["events", params.eventId],
            queryFn: () => eventsApi.fetchById(params.eventId)
        });
        context.queryClient.prefetchQuery({
            queryKey: ["markets"],
            queryFn: marketApi.fetchAll
        });
    },
    component: EditEvent
});

function EditEvent() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const { data } = useSuspenseQuery({
        queryKey: ["events", params.eventId],
        queryFn: () => eventsApi.fetchById(params.eventId)
    });
    const markets = useSuspenseQuery({
        queryKey: ["markets"],
        queryFn: marketApi.fetchAll
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: eventsApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] })
        }
    });

    const initialValues: EventFormValues = {
        address: data.address,
        market_id: data.market_id,
        date_from: data.date_from,
        date_to: data.date_to ?? ""
    };

    const onSubmit = async (values: EventFormValues) => {

        try {
            await mutation.mutateAsync({
                id: data.id,
                market_id: values.market_id,
                address: values.address,
                date_from: values.date_from,
                date_to: values.date_to ?? undefined,
                flyer_url: data.flyer_url,
                image: values.image,
                created_at: data.created_at
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Event Updated!"} />
            ));

            navigate({ to: "/dashboard/events" });
        }
        catch(error) {
            console.error(error);
            toast((t) => (
                <ToastError toast={t} message={"Error Updating Event"} />
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
                        { title: "Edit", path: "/dashboard/events/edit/$eventId" },
                    ]}
                />
            </div>
            <div className="my-20">
                <EventForm
                    type="update"
                    markets={markets.data}
                    initialValues={initialValues}
                    flyerUrl={data.flyer_url}
                    onSubmit={onSubmit}
                />
            </div>
        </Layout>
    );
};
