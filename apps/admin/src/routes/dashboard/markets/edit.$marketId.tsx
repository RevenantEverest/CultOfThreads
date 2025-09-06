import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import MarketForm, { MarketFormValues } from '@@admin/components/Forms/MarketForm';

import { marketApi } from '@repo/supabase';

export const Route = createFileRoute('/dashboard/markets/edit/$marketId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["markets", params.marketId],
            queryFn: () => marketApi.fetchById(params.marketId)
        });
    },
    component: EditMarket,
});

function EditMarket() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const { data } = useSuspenseQuery({ 
        queryKey: ["markets", params.marketId],
        queryFn: () => marketApi.fetchById(params.marketId)
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: marketApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["markets"] });
        }
    });

    const initialValues: MarketFormValues = {
        name: data.name,
        state: data.details?.state ?? ""
    };

    const onSubmit = async (values: MarketFormValues) => {

        try {
            if(!data.details) {
                throw new Error("Missing Market Details");
            }

            await mutation.mutateAsync({
                id: data.id,
                name: values.name,
                details: {
                    ...data.details,
                    state: values.state,
                },
                created_at: data.created_at,
                image: values.image
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
                        {data.name}
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
                <MarketForm
                    type="update"
                    initialValues={initialValues}
                    logoUrl={data.details?.logo_url}
                    onSubmit={onSubmit}
                />
            </div>
        </Layout>
    );
};
