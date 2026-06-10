"use client"

import { useEffect } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import { trafficAnalytics } from '@repo/queries';

function UtmParser() {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const queryClient = new QueryClient();
    const mutation = trafficAnalytics.hooks.useCreate(queryClient);

    useEffect(() => {
        const utmSource = searchParams.get("utm_source");
        
        if(!utmSource) {
            return;
        }

        try {
            mutation.mutateAsync({
                payload: {
                    landingPageUrl: pathname,
                    utmSource,
                    utmMedium: searchParams.get("utm_medium") ?? undefined,
                    utmCampaign: searchParams.get("utm_campaign") ?? undefined,
                    utmContent: searchParams.get("utm_content") ?? undefined,
                    utmTerm: searchParams.get("utm_term") ?? undefined
                }
            });
        }
        catch(error) {
            console.error(error);
        }
    }, []); //eslint-disable-line

    return null;
};

export default UtmParser;