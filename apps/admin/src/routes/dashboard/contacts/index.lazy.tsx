import { createLazyFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { ToastError } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { AddContact, ContactsTable } from '@@admin/components/Contacts';
import Search from '@@admin/components/Search';

import { contacts } from '@repo/queries';
import { useAuthStore } from '@@admin/store/auth';

export const Route = createLazyFileRoute('/dashboard/contacts/')({
    component: Contacts,
});

function Contacts() {

    const auth = useAuthStore((state) => state.auth);
    const [search, setSearch] = useState("");

    const query = contacts.hooks.useIndex({
        authToken: auth.session?.accessToken ?? "",
        pagination: {
            limit: 10
        }
    });

    useEffect(() => {
        if(!query.isError) return;

        console.error(query.error);
        toast((t) => (
            <ToastError toast={t} message={"Error fetching products"} />
        ));
    }, [query.isError, query.error]);

    const nextPage = () => {
        if(!query.hasNextPage) return;

        query.fetchNextPage();
    };

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
            <div className="mt-15 flex flex-col gap-5 pb-20">
                <div className="flex">
                    <div className="w-full">
                        <Search setSearch={setSearch} />
                    </div>
                    <div className="flex w-full justify-end">
                        <AddContact />
                    </div>
                </div>
                <ContactsTable
                    contacts={
                        query.data?.pages.flatMap((page) => page.results) ?? []
                    } 
                    dataAmount={query.data?.pages[0] && query.data.pages[0].count}
                    search={search} 
                    isLoading={query.isLoading || query.isFetching || !query.data}
                    nextPage={nextPage}
                />
            </div>
        </Layout>
    )
};
