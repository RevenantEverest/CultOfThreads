import type { Metadata, Viewport } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Product } from '@@shop/components/Products';
import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';

import { URLS } from '@@shop/constants';
import { json, text } from '@@shop/utils';
import { products } from '@repo/queries';

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

interface SingleProductProps {
    params: Promise<{
        slug: string
    }>,
    searchParams: Promise<{
        [key: string]: string | string[] | undefined
    }>
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    try {
        const { slug } = await params;

        const queryClient = new QueryClient();
        const { results } = await products.hooks.useFetchGetOnePublic(queryClient, {
            id: slug
        });

        const description = json.richTextToString(results.description as string);

        return {
            title: `Cult of Threads | ${results.name}`,
            description: text.truncate(description),
            openGraph: {
                siteName: "Cult of Threads",
                url: `https://cultofthreads.com/shop/${slug}`,
                images: [URLS.SUPABASE_STORAGE + results.media?.[0]?.mediaUrl]
            }
        };
    }
    catch {
        return {
            title: "404",
            description: "The product you are looking for doesn't exist"
        };
    }
};

async function SingleProduct({ params }: SingleProductProps) {

    const { slug } = await params;

    const queryClient = new QueryClient();
    products.hooks.usePrefetchGetOnePublic(queryClient, {
        id: slug
    });

    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Layout main>
                <div className="pt-15">
                    <Product slug={slug} />
                </div>
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </HydrationBoundary>
    );
};

export default SingleProduct;