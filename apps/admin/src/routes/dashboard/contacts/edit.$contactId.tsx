import type { ContactFormValues } from '@@admin/components/Forms/ContactForm';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import ContactForm from '@@admin/components/Forms/ContactForm';

import { contacts } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createFileRoute('/dashboard/contacts/edit/$contactId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        contacts.hooks.usePrefetchGetOne(context.queryClient, { 
            id: params.contactId,
            authToken: authToken.accessToken
        });
    },
    component: EditContact,
});

function EditContact() {

    const params = Route.useParams();
    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const { data } = contacts.hooks.useGetOne({
        id: params.contactId,
        authToken: auth.session?.accessToken ?? ""
    });

    const queryClient = useQueryClient();
    const mutation = contacts.hooks.useUpdate(queryClient);

    const initialValues: ContactFormValues = {
        firstName: data?.results.firstName ?? "",
        lastName: data?.results.lastName ?? "",
        email: data?.results.email ?? "",
        phone: data?.results.phone ?? "",
        address: data?.results.address ?? ""
    };

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutation.mutateAsync({
                id: params.contactId,
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    ...values,
                    email: values.email.toLowerCase()
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message="Contact updated!" />
            ));

            navigate({ to: "/dashboard/contacts" });
        }
        catch {
            toast((t) => (
                <ToastError toast={t} message="Error updating Contact" />
            ));
        }
    };

    return(
        <Layout>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-bold">
                        {(data?.results.firstName ?? "") + " " + (data?.results.lastName ?? "")}
                    </h1>
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Contacts", path: "/dashboard/contacts" },
                        { title: "Edit", path: "/dashboard/contacts/edit/$contactId" },
                    ]}
                />
            </div>
            <div className="my-20">
                <ContactForm
                    type="update"
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                />
            </div>
        </Layout>
    );
};
