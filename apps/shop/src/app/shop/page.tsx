import type { Metadata, Viewport } from 'next';

import Image from 'next/image';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { ProductList } from '@@shop/components/Products';
import { Layout, PageHeader } from '@@shop/components/Common';
import { UpcomingEvents } from '@@shop/components/Events';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';

import { productApi } from '@repo/supabase';

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

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PageHeader>
                <div className="flex flex-col md:flex-row gap-10 md:gap-5 items-center justify-center md:px-72 h-[90dvh]">
                    <div className="order-2 md:order-1 md:flex-1 flex flex-col text-center md:text-left items-center md:items-start justify-center">
                        <h1 className="text-4xl md:text-6xl text-text font-bold mb-4">Our Offerings</h1>
                        <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-11/12 md:w-4/6">
                            Where Cuteness Meets the Creeps — Discover handmade horror plushies that blend spooky 
                            vibes with an irresistibly adorable twist. Perfect for collectors, horror fans, and anyone who loves the strange and sweet.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 flex gap-20 md:gap-20 flex-wrap md:w-6/12 items-center justify-center relative">
                        <div className="bg-card-light p-1 rounded-lg absolute z-20 -top-4 md:-top-10 h-30 w-30 md:h-60 md:w-60 flex overflow-hidden">
                            <Image
                                className="shrink-0 relative object-cover w-full h-full rounded-lg"
                                height={250}
                                width={250}
                                src="https://znuzagnhttsgjyddmlrk.supabase.co/storage/v1/object/public/content/products/334caec1-2b21-4f22-a2ca-7ca5b391b1b3/5b786731-a234-46f3-bda7-b9816585ac01"
                                alt="Button Eyed Girl Plush"
                            />
                        </div>
                        <div className="bg-card-light p-1 rounded-lg -rotate-15 h-30 w-30 md:h-60 md:w-60 flex overflow-hidden">
                            <Image
                                className="shrink-0 relative object-cover w-full h-full rounded-lg"
                                height={250}
                                width={250}
                                src="https://znuzagnhttsgjyddmlrk.supabase.co/storage/v1/object/public/content/products/79174255-fee7-4461-8251-378590a92b52/07955b61-c6b6-41b6-af55-898593345a6e"
                                alt="Sinister Mime Plush"
                            />
                        </div>
                        <div className="bg-card-light p-1 rounded-lg rotate-15 h-30 w-30 md:h-60 md:w-60 flex overflow-hidden">
                            <Image
                                className="shrink-0 relative object-cover w-full h-full rounded-lg"
                                height={250}
                                width={250}
                                src="https://znuzagnhttsgjyddmlrk.supabase.co/storage/v1/object/public/content/products/c3528aa2-24ca-4e9d-a6d9-e35e0dbde4c7/9d5bc98a-be5b-44df-b40b-381e857c001e"
                                alt="Dream weaver Plush"
                            />
                        </div>
                    </div>
                </div>
            </PageHeader>
            <Layout main transparent className="pb-20 gap-40">
                <ProductList />
                <UpcomingEvents />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </HydrationBoundary>
    );
};

export default Shop;