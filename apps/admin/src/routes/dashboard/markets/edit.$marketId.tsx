import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import MarketForm, { MarketFormValues } from '@@admin/components/Forms/MarketForm';

import { useAuthStore } from '@@admin/store/auth';

import { markets } from '@repo/queries';

export const Route = createFileRoute('/dashboard/markets/edit/$marketId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        markets.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.marketId,
            authToken: authToken.accessToken
        });
    },
    component: EditMarket,
});

function EditMarket() {

    const params = Route.useParams();
    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const { data, isLoading } = markets.hooks.useGetOne({
        id: params.marketId,
        authToken: auth.session?.accessToken ?? ""
    });

    const mutation = markets.hooks.useUpdate(queryClient);

    const onSubmit = async (values: MarketFormValues) => {

        try {
            await mutation.mutateAsync({
                id: data?.results.id as string,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    name: values.name,
                    state: values.state,
                    file: values.image
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Market Updated!"} />
            ));

            navigate({ to: "/dashboard/markets" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Updating Market"} />
            ));
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        {data?.results.name}
                    </h1>
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Markets", path: "/dashboard/markets" },
                        { title: "Edit", path: "/dashboard/markets/edit/$marketId" },
                    ]}
                />
            </div>
            <div className="my-20">
                {
                    isLoading ? 
                    <Spinner /> :
                    <MarketForm
                        type="update"
                        initialValues={{
                            name: data?.results.name ?? "",
                            state: data?.results.details?.state ?? ""
                        }}
                        logoUrl={data?.results.details.logoUrl}
                        onSubmit={onSubmit}
                    />
                }
            </div>
        </Layout>
    );
};
