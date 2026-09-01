import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { CheckoutContainer } from '@@shop/containers';

function Checkout() {

    return(
        <>
            <Layout main transparent className="pb-20 pt-40 gap-40">
                <div>
                    <h1 className="font-bold text-5xl">Checkout</h1>
                </div>
                <CheckoutContainer />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default Checkout;