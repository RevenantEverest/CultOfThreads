import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { CartContainer } from '@@shop/containers';

function Cart() {

    return(
        <>
            <Layout main transparent className="pb-20 pt-40 gap-10">
                <CartContainer />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default Cart;