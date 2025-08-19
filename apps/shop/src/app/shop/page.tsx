import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productApi } from '@repo/supabase';
import { ProductList } from '@@shop/components/Products';
import { Layout, PageHeader } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';

async function Shop() {

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchListings
    });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
        <PageHeader>
            <div className="flex sm:flex-col md:flex-row md:gap-5 items-center justify-center md:px-72 h-[90dvh]">
                <div className="order-2 md:order-1 md:flex-1 flex flex-col text-center md:text-left items-center md:items-start justify-center">
                    <h1 className="text-4xl md:text-6xl text-text font-bold mb-4">Horror Plushies</h1>
                    <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-11/12 md:w-4/6">
                        Where Cuteness Meets the Creeps — Discover handmade horror plushies that blend spooky 
                        vibes with an irresistibly adorable twist. Perfect for collectors, horror fans, and anyone who loves the strange and sweet.
                    </p>
                </div>
            </div>
        </PageHeader>
        <Layout main transparent>
            <ProductList />
        </Layout>
        <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </HydrationBoundary>
    );
};

export default Shop;