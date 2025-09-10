import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { BeatLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { AddContact, ContactsList } from '@@admin/components/Contacts';
import Search from '@@admin/components/Search';

import { useThemeStore } from '@@admin/store/theme';

import { contactApi } from '@repo/supabase';

export const Route = createLazyFileRoute('/dashboard/contacts/')({
    component: Contacts,
});

function Contacts() {

    const theme = useThemeStore((state) => state.theme);

    const query = useQuery({
        queryKey: ["contacts"],
        queryFn: contactApi.fetchAll
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching products"} />
        ));
    }, [query.isError, query.error]);

    return (
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Contacts</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Contacts", path: "/dashboard/contacts" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <AddContact />
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
                    <ContactsList search={search} contacts={query.data ?? []} />
                }
            </div>
        </Layout>
    )
};
