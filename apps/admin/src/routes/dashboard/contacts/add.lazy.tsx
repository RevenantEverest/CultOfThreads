import type { ContactFormValues } from '@@admin/components/Forms/ContactForm';

import { createLazyFileRoute } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { ToastSuccess, ToastError } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import ContactForm from '@@admin/components/Forms/ContactForm';

import { contactApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/contacts/add')({
    component: AddContact,
})

function AddContact() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: contactApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contacts"] })
        }
    });

    const initialValues: ContactFormValues = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: ""
    };

    const onSubmit = async (values: ContactFormValues) => {
        try {
            await mutation.mutateAsync({
                ...values,
                email: values.email.toLowerCase()
            });

            toast((t) => (
                <ToastSuccess toast={t} message="Contact created!" />
            ));

            navigate({ to: "/dashboard/contacts" });
        }
        catch(error) {
            console.error(error);
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
