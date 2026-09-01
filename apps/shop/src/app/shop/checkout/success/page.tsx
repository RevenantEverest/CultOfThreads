import { ClearCart } from '@@shop/components/Cart';
import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';

function CheckoutSuccess() {
     return(
        <>
            <Layout main transparent className="pb-20 gap-40">
                <ClearCart />
                <div className="flex flex-col gap-10 items-center justify-center flex-1">
                    <h1 className="font-bold text-5xl text-primary">Thank you for your purchase!</h1>
                    <p className="font-semibold">You should receive an email regarding your order confirmation shortly.</p>
                </div>
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default CheckoutSuccess;