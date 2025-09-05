"use client"

import type { CreateTrafficAnalytics } from '@repo/supabase';

import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import { trafficAnalyticsApi } from '@repo/supabase';

function UtmParser() {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const mutation = useMutation({
        mutationFn: trafficAnalyticsApi.create
    });

    useEffect(() => {
        const utm_source = searchParams.get("utm_source");
        
        if(!utm_source) {
            return;
        }

        const data: CreateTrafficAnalytics = {
            landing_page_url: pathname,
            utm_source,
            utm_medium: searchParams.get("utm_medium"),
            utm_campaign: searchParams.get("utm_campaign"),
            utm_content: searchParams.get("utm_content"),
            utm_term: searchParams.get("utm_term")
        };

        try {
            mutation.mutateAsync(data);
        }
        catch(error) {
            console.error(error);
        }
    }, []);

    return null;
};

export default UtmParser;