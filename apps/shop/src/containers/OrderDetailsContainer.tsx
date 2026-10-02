"use client"

import { useSearchParams } from 'next/navigation';
import { orders } from '@repo/queries';
import { OrderDetailsTable, OrderShippingSummary, OrderViewExpired } from '@@shop/components/Orders';
import { Spinner } from '@@shop/components/Common';

function getErrorStatus(error: unknown): number | undefined {
    return (error as { status?: number } | null)?.status;
}

function OrderDetailsContainer() {

    const searchParams = useSearchParams();
    const authToken = searchParams.get("token");
    const query = orders.hooks.useGetOrderByToken({
        authToken: authToken ?? ""
    });

    if (query.isError && getErrorStatus(query.error) === 410) {
        return <OrderViewExpired />;
    }

    const order = query.data?.results;

    return(
        <div className="w-full flex flex-col gap-5 h-full">
            <div className="flex flex-col gap-3">
                <h1 className="text-5xl font-bold">Order Details</h1>
                <div className="flex gap-2">
                <p className="font-bold">Order ID:</p>
                <p className="font-semibold text-accent">{query.data?.results.id}</p>
                </div>
            </div>
            <OrderDetailsTable order={order} />
            {query.isLoading ? (
                <Spinner />
            ) : query.isError ? (
                <p className="text-error font-semibold text-lg">Something went wrong loading this order.</p>
            ) : order ? (
                <OrderShippingSummary order={order} />
            ) : null}
        </div>
    );
};

export default OrderDetailsContainer;