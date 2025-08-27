import { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { Product } from '@@shop/components/Products';
import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';

import { productApi } from '@repo/supabase';
import { URLS } from '@@shop/constants';
import { json, text } from '@@shop/utils';

interface SingleProductProps {
    params: Promise<{
        slug: string
    }>,
    searchParams: {
        [key: string]: string | string[] | undefined
    }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    try {
        const queryClient = new QueryClient();
        const data = await queryClient.fetchQuery({
            queryKey: ["products", params.slug],
            queryFn: () => productApi.fetchListingById(params.slug)
        });

        const description = json.richTextToString(data.description as string);

        return {
            title: `Cult of Threads | ${data.name}`,
            description: text.truncate(description),
            openGraph: {
                siteName: "Cult of Threads",
                url: `https://cultofthreads.com/shop/${params.slug}`,
                images: [URLS.supabaseStorageUrl + data.product_media?.[0]?.media_url]
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
    await queryClient.prefetchQuery({
        queryKey: ["products", slug],
        queryFn: () => productApi.fetchListingById(slug)
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