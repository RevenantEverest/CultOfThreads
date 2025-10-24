import type { SaleFull } from '@repo/supabase';

import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { useSuspenseQueries } from '@tanstack/react-query';

import { FaEdit, FaLongArrowAltLeft } from 'react-icons/fa';

import { Button } from '@repo/ui';

import { Layout, Breadcrumb } from '@@admin/components/Common';
import { Event } from '@@admin/components/Events';
import { 
    SalesBreakdownList, 
    SalesList, 
    TotalProductsCard, 
    TotalRevenueCard 
} from '@@admin/components/Sales';

import { eventsApi, saleApi } from '@repo/supabase';
import dayjs from 'dayjs';

export const Route = createFileRoute('/dashboard/events/item/$eventId')({
    loader: ({ context, params }) => {
        context.queryClient.prefetchQuery({
            queryKey: ["events", params.eventId],
            queryFn: () => eventsApi.fetchById(params.eventId)
        });

        context.queryClient.prefetchQuery({
            queryKey: ["event_sales", params.eventId],
            queryFn: () => saleApi.fetchByEventId(params.eventId)
        });
    },
    component: EventItem,
});

function EventItem() {

    const params = Route.useParams();
    const router = useRouter();
    
    const [event, sales] = useSuspenseQueries({
        queries: [
            {
                queryKey: ["events", params.eventId],
                queryFn: () => eventsApi.fetchById(params.eventId)
            },
            {
                queryKey: ["event_sales", params.eventId],
                queryFn: () => saleApi.fetchByEventId(params.eventId)
            }
        ]
    });

    const createSaleBreakdownByProduct = (data: SaleFull[]) => {
        const breakdownData: Record<string, SaleFull[]> = {};

        for(let i = 0; i < data.length; i++) {
            const current = data[i];

            if(current?.product_name) {
                const productData = breakdownData[current.product_name] ?? [];
                productData.push(current);

                breakdownData[current.product_name] = productData;
            }
        };

        return breakdownData;
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <div className="flex gap-5 items-center font-bold text-xl">
                    <h1 className="text-4xl font-bold">{event.data.market.name}</h1>
                    <p className="text-primary">{dayjs(event.data.date_from).format("MMMM D, YYYY")}</p>
                </div>
                <Breadcrumb
                    routes={[
                        { title: "Dashboard", path: "/dashboard" },
                        { title: "Events", path: "/dashboard/events" },
                        { title: "Item", path: "/dashboard/events/item/$eventId" },
                    ]}
                />
            </div>
            <div className="mt-15 flex flex-col gap-15">
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                    <div>
                        <Button colorScheme={"cardLight"} onClick={() => router.history.back()}>
                            <FaLongArrowAltLeft />
                            Go Back
                        </Button>
                    </div>
                    <div className="flex flex-1 justify-center md:justify-end gap-2">
                        <Link to="/dashboard/events/edit/$eventId" params={{ eventId: params.eventId }}>
                            <Button colorScheme={"cardLight"}>
                                <FaEdit />
                                Edit
                            </Button>
                        </Link>
                    </div>
                </div>
                <Event event={event.data} />
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <TotalProductsCard sales={sales.data} />
                        <TotalRevenueCard sales={sales.data} />
                    </div>
                    <SalesBreakdownList breakdownData={createSaleBreakdownByProduct(sales.data)} />
                    <SalesList sales={sales.data} />
                </div>
            </div>
        </Layout>
    );
};
