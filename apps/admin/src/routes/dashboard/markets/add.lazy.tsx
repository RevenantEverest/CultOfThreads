import type { MarketFormValues } from '@@admin/components/Forms/MarketForm';

import { createLazyFileRoute } from '@tanstack/react-router';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import {
    ToastSuccess,
    ToastError
} from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import MarketForm from '@@admin/components/Forms/MarketForm';

import { useAuthStore } from '@@admin/store/auth';

import { markets } from '@repo/queries';

export const Route = createLazyFileRoute('/dashboard/markets/add')({
    component: AddMarket,
});

function AddMarket() {

    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = markets.hooks.useCreate(queryClient);

    const initialValues: MarketFormValues = {
        name: "",
        state: ""
    };

    const onSubmit = async (values: MarketFormValues) => {
        try {
            await mutation.mutateAsync({
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    name: values.name,
                    state: values.state,
                    file: values.image
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message={"Market Added!"} />
            ));

            navigate({ to: "/dashboard/markets" });
        }
        catch(error) {
            console.error("Mutation Error", error);
            toast((t) => (
                <ToastError toast={t} message={"Error Creating Market"} />
            ))
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Add Market</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Markets", path: "/dashboard/markets" },
                        { title: "Add", path: "/dashboard/markets/add" },
                    ]}
                />
            </div>
            <div className="my-20">
                <MarketForm type="create" onSubmit={onSubmit} initialValues={initialValues} />
            </div>
        </Layout>
    );
};

