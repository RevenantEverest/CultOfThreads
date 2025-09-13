import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { contactFormApi } from '@repo/supabase';
import { ContactFormSubmission } from '@@admin/components/Contacts';

export const Route = createFileRoute('/dashboard/contacts/form/item/$submissionId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["contact_form_submissions", params.submissionId],
            queryFn: () => contactFormApi.fetchById(params.submissionId)
        })
    },
    component: ContactFormItem,
});

function ContactFormItem() {

    const params = Route.useParams();

    const { data } = useSuspenseQuery({ 
        queryKey: ["contact_form_submissions", params.submissionId],
        queryFn: () => contactFormApi.fetchById(params.submissionId)
    });

    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Contact Form Submission</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Contacts", path: "/dashboard/contacts" },
                        { title: "Contact Form", path: "/dashboard/contacts/form" },
                        { title: "Submission", path: "/dashboard/contacts/form/item/$submissionId" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <ContactFormSubmission submission={data} />
            </div>
        </Layout>
    );
};
