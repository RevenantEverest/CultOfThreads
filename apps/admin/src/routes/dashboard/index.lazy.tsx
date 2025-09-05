import { createLazyFileRoute } from '@tanstack/react-router';

import { Layout } from '@@admin/components/Common';

export const Route = createLazyFileRoute('/dashboard/')({
    component: Dashboard,
});

function Dashboard() {
    return(
        <Layout className="">
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold">Dashboard</h1>
            </div>
        </Layout>
    );
};
