import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { OrderDetailsContainer } from '@@shop/containers';

function OrderDetails() {

    return(
        <>
            <Layout main transparent className="pb-20 pt-40 gap-10">
                <OrderDetailsContainer />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default OrderDetails;