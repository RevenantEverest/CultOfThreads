import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { productApi } from '@repo/supabase';
import { Product } from '@@shop/components/Products';
import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';

interface SingleProductProps {
    params: Promise<{
        slug: string
    }>,
    searchParams: {
        [key: string]: string | string[] | undefined
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