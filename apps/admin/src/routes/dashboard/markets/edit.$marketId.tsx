import { createFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import MarketForm, { MarketFormValues } from '@@admin/components/Forms/MarketForm';

import * as marketApi from '@@admin/api/markets';

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
        state: data.market_details?.state ?? ""
    };

    const onSubmit = async (values: MarketFormValues) => {

        try {
            await mutation.mutateAsync();

            toast((t) => (
                <ToastSuccess toast={t} message={"Market Updated!"} />
            ));
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
                    onSubmit={onSubmit}
                />
            </div>
        </Layout>
    );
};
