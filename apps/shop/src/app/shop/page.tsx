import type { Metadata, Viewport } from 'next';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ProductList } from '@@shop/components/Products';
import { Layout } from '@@shop/components/Common';
import { UpcomingEvents } from '@@shop/components/Events';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';

import { categoryApi, productApi } from '@repo/supabase';

export const revalidate = 60;

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cult of Threads | Shop",
        description: `
            Discover unique handmade crochet goods and creepy plush horror characters. Explore our collection for quirky gifts, spooky décor, and one-of-a-kind creations
        `,
        openGraph: {
            siteName: "Cult of Threads | Handmade Crochet Plushies",
            images: IMAGE_RESOURCES.OPEN_GRAPH
        },
        twitter: {
            images: IMAGE_RESOURCES.TWITTER_META
        }
    };
};

async function Shop() {


    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchActiveListings
    });

    await queryClient.prefetchQuery({
        queryKey: ["categories"],
        queryFn: categoryApi.fetchAll
    });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Layout main transparent className="pb-20 gap-40">
                <div>
                    <div className="flex items-center justify-center pt-15 pb-5">
                        <div className="md:flex-1 flex flex-col text-center md:text-left items-center justify-center">
                            <h1 className="text-4xl md:text-6xl text-text font-bold mb-4">Our Offerings</h1>
                            <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-11/12 md:w-3/6 text-center">
                                Discover handmade horror plushies that blend spooky vibes with an irresistibly adorable twist. 
                                Perfect for collectors, horror fans, and anyone who loves the strange and sweet.
                            </p>
                        </div>
                    </div>
                    <ProductList />
                </div>
                <UpcomingEvents />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </HydrationBoundary>
    );
};

export default Shop;