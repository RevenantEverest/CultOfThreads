import { Layout, Spinner } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { OrderDetailsContainer } from '@@shop/containers';
import { Suspense } from 'react';

function OrderDetails() {

    return(
        <>
            <Layout main transparent className="pb-20 pt-40 gap-10">
                <Suspense fallback={(<Spinner />)}>
                    <OrderDetailsContainer />
                </Suspense>
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default OrderDetails;