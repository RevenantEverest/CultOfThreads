import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastError, ToastSuccess } from '@repo/ui';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import EventForm, { EventFormValues } from '@@admin/components/Forms/EventForm';

import { useAuthStore } from '@@admin/store/auth';
import { events, markets } from '@repo/queries';

export const Route = createFileRoute('/dashboard/events/edit/$eventId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        events.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.eventId,
            authToken: authToken.accessToken
        });

        markets.hooks.usePrefetchIndex(context.queryClient, {
            authToken: authToken.accessToken,
            pagination: {
                limit: 10
            }
        });
    },
    component: EditEvent
});

function EditEvent() {

    const params = Route.useParams();
    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    
    const { data, isLoading } = events.hooks.useGetOne({
        id: params.eventId,
        authToken: auth.session?.accessToken ?? ""
    });

    const marketsQuery = markets.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    const mutation = events.hooks.useUpdate(queryClient);

    const nextPage = () => {
        if(!marketsQuery.hasNextPage) return;

        marketsQuery.fetchNextPage();
    };

    const onSubmit = async (values: EventFormValues) => {

        try {
            await mutation.mutateAsync({
                id: data?.results.id as string,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    marketId: values.market,
                    address: values.address,
                    dateFrom: values.dateFrom,
                    dateTo: values.dateTo ?? undefined,
                    file: values.image
                }
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
                {
                    isLoading || !data?.results ?
                    <Spinner /> :
                    <EventForm
                        type="update"
                        markets={
                            marketsQuery.data?.pages.flatMap((page) => page.results) ?? []
                        }
                        initialValues={{
                            address: data.results.address,
                            market: data.results.market.id,
                            dateFrom: (data.results.dateFrom as unknown) as string,
                            dateTo: (data.results.dateTo as unknown) as string
                        }}
                        flyerUrl={data.results.flyerUrl}
                        onSubmit={onSubmit}
                        nextPage={nextPage}
                        isLoading={marketsQuery.isLoading || marketsQuery.isFetching || !marketsQuery.data}
                    />
                }
            </div>
        </Layout>
    );
};
