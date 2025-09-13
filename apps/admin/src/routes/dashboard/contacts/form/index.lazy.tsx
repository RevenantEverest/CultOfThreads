import { createLazyFileRoute } from '@tanstack/react-router';

import { useEffect, useState } from 'react';

import { BeatLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { FiRefreshCcw } from 'react-icons/fi';

import { ToastError, Button } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { ContactFormSubmissionList } from '@@admin/components/Contacts';
import Search from '@@admin/components/Search';

import { useThemeStore } from '@@admin/store/theme';
import { contactFormApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/contacts/form/')({
    component: ContactForm,
});

function ContactForm() {

    const theme = useThemeStore((state) => state.theme);
    const [search, setSearch] = useState("");

    const [refreshing, setRefreshing] = useState(false);

    const query = useQuery({
        queryKey: ["contact_form_submissions"],
        queryFn: contactFormApi.fetchAll
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching traffic analytics"} />
        ));
    }, [query.isError, query.error]);

    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Contact Form</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Contacts", path: "/dashboard/contacts" },
                        { title: "Contact Form", path: "/dashboard/contacts/form" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <Button 
                            colorScheme={"cardLight"}
                            onClick={async () => {
                                setRefreshing(true); 
                                await query.refetch();
                                setRefreshing(false); 

                            }}
                        >
                            {
                                refreshing ?
                                <BeatLoader
                                    className="flex flex-1 items-center justify-center"
                                    size={5}
                                    color={theme.colors.primary}
                                />
                                :
                                <div className="flex items-center gap-2">
                                    <FiRefreshCcw />
                                    Refresh
                                </div>
                            }
                        </Button>
                    </div>
                </div>
                {
                    query.isLoading ?
                    <BeatLoader
                        className="flex flex-1 items-center justify-center mt-10"
                        size={15}
                        color={theme.colors.primary}
                    />
                    :
                    <ContactFormSubmissionList search={search} submissions={query.data ?? []} />
                }
            </div>
        </Layout>
    );
};