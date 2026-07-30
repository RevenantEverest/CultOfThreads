import type { ContactFormValues } from '@@admin/components/Forms/ContactForm';

import { createLazyFileRoute } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { ToastSuccess, ToastError } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import ContactForm from '@@admin/components/Forms/ContactForm';

import { contacts } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createLazyFileRoute('/dashboard/contacts/add')({
    component: AddContact,
})

function AddContact() {

    const auth = useAuthStore((state) => state.auth);
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutation = contacts.hooks.useCreate(queryClient);

    const initialValues: ContactFormValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    };

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutation.mutateAsync({
                authToken: auth.session?.accessToken ?? "",
                payload: {
                    ...values,
                    email: values.email.toLowerCase()
                }
            });

            toast((t) => (
                <ToastSuccess toast={t} message="Contact created!" />
            ));

            navigate({ to: "/dashboard/contacts" });
        }
        catch {
            toast((t) => (
                <ToastError toast={t} message="Error creating Contact" />
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
                        { title: "Contacts", path: "/dashboard/contacts" },
                        { title: "Add", path: "/dashboard/contacts/add" },
                    ]}
                />
            </div>
            <div className="my-20">
                <ContactForm type="create" initialValues={initialValues} onSubmit={onSubmit}  />
            </div>
        </Layout>
    );
};
