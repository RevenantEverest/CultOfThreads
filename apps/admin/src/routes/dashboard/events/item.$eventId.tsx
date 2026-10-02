import type { Sale } from '@repo/entities';

import { createFileRoute, Link, useRouter } from '@tanstack/react-router';

import { FaEdit, FaLongArrowAltLeft } from 'react-icons/fa';

import { Button } from '@repo/ui';

import { Layout, Breadcrumb, Spinner } from '@@admin/components/Common';
import { Event } from '@@admin/components/Events';
import { 
    SalesBreakdownList,
    TotalProductsCard, 
    TotalRevenueCard 
} from '@@admin/components/Sales';

import dayjs from 'dayjs';
import { useAuthStore } from '@@admin/store/auth';
import { events, sales } from '@repo/queries';

export const Route = createFileRoute('/dashboard/events/item/$eventId')({
    loader: ({ context, params }) => {

        const authToken = useAuthStore.getState().auth.session;

        if(!authToken?.accessToken) return;

        events.hooks.usePrefetchGetOne(context.queryClient, {
            id: params.eventId,
            authToken: authToken.accessToken
        });

        sales.hooks.usePrefetchGetByEventId(context.queryClient, {
            id: params.eventId,
            authToken: authToken.accessToken
        });
    },
    component: EventItem,
});

function EventItem() {

    const auth = useAuthStore((state) => state.auth);

    const params = Route.useParams();
    const router = useRouter();

    const salesQuery = sales.hooks.useGetByEventId({
        id: params.eventId,
        authToken: auth.session?.accessToken ?? ""
    });

    const eventsQuery = events.hooks.useGetOne({
        id: params.eventId,
        authToken: auth.session?.accessToken ?? ""
    });

    const createSaleBreakdownByProduct = (data: Sale[]) => {
        const breakdownData: Record<string, Sale[]> = {};

        for(let i = 0; i < data.length; i++) {
            const current = data[i];

            if(current?.productName) {
                const productData = breakdownData[current.productName] ?? [];
                productData.push(current);

                breakdownData[current.productName] = productData;
            }
        };

        return breakdownData;
    };

    const getSalesTotal = () => {
        console.log(salesQuery.data?.results);

        if(!salesQuery.data?.results || salesQuery.data.results.length === 0) {
            return 0;
        }

        return salesQuery.data.results.map((item) => item.salePrice).reduce((acc, curr) => acc += curr);
    };

    return(
        <Layout className="pb-20">
            <div className="flex flex-col gap-3">
                <div className="flex gap-5 items-center font-bold text-xl">
                    <h1 className="text-4xl font-bold">{eventsQuery.data?.results.market.name}</h1>
                    <p className="text-primary">{dayjs(eventsQuery.data?.results.dateFrom).format("MMMM D, YYYY")}</p>
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
                {
                    !eventsQuery.data?.results ?
                    <Spinner /> :
                    <Event event={eventsQuery.data.results} />
                }
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col lg:flex-row gap-5">
                        {
                            !salesQuery.data?.results ?
                            <Spinner /> :
                            <TotalProductsCard sales={salesQuery.data.results} />
                        }
                        <TotalRevenueCard total={getSalesTotal()} />
                    </div>
                    {
                        !salesQuery.data?.results ? 
                        <Spinner /> :  
                        <SalesBreakdownList breakdownData={createSaleBreakdownByProduct(salesQuery.data.results)} />
                    }
                    
                    {/* <SalesList sales={sales.data} /> */}
                </div>
            </div>
        </Layout>
    );
};
