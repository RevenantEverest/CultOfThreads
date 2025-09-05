import { createLazyFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

import { Layout } from '@@admin/components/Common';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage
} from '@repo/ui';

export const Route = createLazyFileRoute('/dashboard/analytics/')({
    component: DashboardAnalytics,
});

function DashboardAnalytics() {
    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Analytics</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-muted">
                                <Link to="/dashboard">
                                    Dashboard
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-text" />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-primary">Analytics</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </Layout>
    );
};
