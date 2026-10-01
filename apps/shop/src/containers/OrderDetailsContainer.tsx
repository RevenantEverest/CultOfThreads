"use client"

import { useSearchParams } from 'next/navigation';
import { orders } from '@repo/queries';
import { OrderDetailsTable, OrderShippingSummary } from '@@shop/components/Orders';
import { Spinner } from '@@shop/components/Common';

function OrderDetailsContainer() {

    const searchParams = useSearchParams();
    const authToken = searchParams.get("token");
    const query = orders.hooks.useGetOrderByToken({
        authToken: authToken ?? ""
    });

    return(
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <h1 className="text-5xl font-bold">Order Details</h1>
                <div className="flex gap-2">
                <p className="font-bold">Order ID:</p>
                <p className="font-semibold text-accent">{query.data?.results.id}</p>
                </div>
            </div>
            <OrderDetailsTable order={query.data?.results} />
            {
                query.isLoading || !query.data?.results ?
                <Spinner /> :
                <OrderShippingSummary order={query.data.results} />
            }
        </div>
    );
};

export default OrderDetailsContainer;