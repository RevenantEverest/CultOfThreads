import { createLazyFileRoute } from '@tanstack/react-router';
import { SiPosthog } from 'react-icons/si';
import { FaLongArrowAltRight } from 'react-icons/fa';

import { Button } from '@repo/ui';
import { Layout, Breadcrumb } from '@@admin/components/Common';
import { URLS } from '@@admin/constants';

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
                <a 
                    href={URLS.POSTHOG_APP} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Button colorScheme={"cardLight"}>
                        <SiPosthog />
                        Go To PostHog App
                        <FaLongArrowAltRight />
                    </Button>
                </a>
            </div>
        </Layout>
    );
};
