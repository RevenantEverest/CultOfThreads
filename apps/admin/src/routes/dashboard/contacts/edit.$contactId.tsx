import type { ContactFormValues } from '@@admin/components/Forms/ContactForm';

import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastSuccess, ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import ContactForm from '@@admin/components/Forms/ContactForm';

import { contactApi } from '@repo/supabase';

export const Route = createFileRoute('/dashboard/contacts/edit/$contactId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["contact", params.contactId],
            queryFn: () => contactApi.fetchById(params.contactId)
        });
    },
    component: EditContact,
});

function EditContact() {

    const params = Route.useParams();
    const navigate = useNavigate();

    const { data } = useSuspenseQuery({ 
        queryKey: ["contacts", params.contactId],
        queryFn: () => contactApi.fetchById(params.contactId)
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: contactApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
        }
    });

    const initialValues: ContactFormValues = {
        first_name: data.first_name ?? "",
        last_name: data.last_name ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        address: data.address ?? ""
    };

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutation.mutateAsync({
                id: data.id,
                ...values,
                email: values.email.toLowerCase()
            });

            toast((t) => (
                <ToastSuccess toast={t} message="Contact updated!" />
            ));

            navigate({ to: "/dashboard/contacts" });
        }
        catch(error) {
            console.error(error);
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
                        {(data.first_name ?? "") + " " + (data.last_name ?? "")}
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
