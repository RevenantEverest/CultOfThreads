import { createLazyFileRoute } from '@tanstack/react-router';

import { Layout, Breadcrumb } from '@@admin/components/Common';

export const Route = createLazyFileRoute('/dashboard/analytics/')({
    component: Analytics,
});

function Analytics() {
    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Analytics</h1>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Analytics", path: "/dashboard/analytics" }
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-5">
            </div>
        </Layout>
    );
};
