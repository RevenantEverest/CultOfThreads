import { createFileRoute } from '@tanstack/react-router';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { Submission } from '@@admin/components/ContactFormSubmissions';

import { contactForm } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createFileRoute('/dashboard/contacts/form/item/$submissionId')({
    loader: ({ context, params }) => {
        const authToken = useAuthStore.getState().auth.session;
        
        if(!authToken?.accessToken) return;

        contactForm.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.submissionId,
            authToken: authToken.accessToken
        });
    },
    component: ContactFormItem,
});

function ContactFormItem() {

    const params = Route.useParams();
    const auth = useAuthStore((state) => state.auth);

    const query = contactForm.hooks.useGetOne({
        id: params.submissionId, 
        authToken: auth.session?.accessToken ?? ""
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
                {
                    query.isLoading || !query.data ?
                    <Spinner /> :
                    <Submission submission={query.data.results} />
                }
            </div>
        </Layout>
    );
};
