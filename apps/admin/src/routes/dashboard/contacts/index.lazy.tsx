import { createLazyFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Layout } from '@@admin/components/Common';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@repo/ui';
import { AddContact, ContactsList } from '@@admin/components/Contacts';

export const Route = createLazyFileRoute('/dashboard/contacts/')({
    component: DashboardAnalytics,
});

function DashboardAnalytics() {
    return (
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Contacts List</h1>
                <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink className="text-muted">
                        <Link to="/dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-text" />
                    <BreadcrumbItem>
                    <BreadcrumbPage className="text-primary">
                        Contacts
                    </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="mt-15 flex flex-col gap-5">
                <div className="flex w-full justify-end">
                    <AddContact />
                </div>
                <ContactsList />
            </div>
        </Layout>
    )
};
