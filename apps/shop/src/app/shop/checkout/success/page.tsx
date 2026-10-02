import { ClearCart } from '@@shop/components/Cart';
import { Image, Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { IMAGE_RESOURCES } from '@repo/ui';

function CheckoutSuccess() {
     return(
        <>
            <Layout main transparent className="pb-20 gap-40">
                <ClearCart />
                <div className="flex flex-col lg:flex-row lg:gap-8 items-center justify-center flex-1">
                    <div>
                        <Image 
                            className="w-40 lg:w-70"
                            height={300} width={300}
                            src={IMAGE_RESOURCES.ANIMATED_HOOKS} 
                            alt="animated crochet hooks"
                        />
                    </div>
                    <div className="flex flex-col gap-10 items-center justify-center lg:flex-1 text-center">
                        <h1 className="font-bold text-5xl text-primary">Thank you for your purchase!</h1>
                        <p className="font-semibold">You should receive an email regarding your order confirmation shortly.</p>
                    </div>
                    <div>
                        <Image 
                            className="w-40 lg:w-70 hidden lg:block"
                            height={300} width={300}
                            src={IMAGE_RESOURCES.ANIMATED_HOOKS} 
                            alt="animated crochet hooks"
                        />
                    </div>
                </div>
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </>
    );
};

export default CheckoutSuccess;