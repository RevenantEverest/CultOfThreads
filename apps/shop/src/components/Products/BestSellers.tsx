"use client"

import type { ProductListing } from '@repo/supabase';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button } from '@repo/ui';
import ProductListItem from './ProductListItem';

import { productApi } from '@repo/supabase';
import { FaLongArrowAltRight } from 'react-icons/fa';

function BestSellers() {

    const query = useQuery({
        queryKey: ["best_sellers"],
        queryFn: () => productApi.fetchByTagName("Best Seller")
    });

    const renderProducts = (products: ProductListing[]) => {
        return products.map((product, index) => (
            <ProductListItem 
                key={`best-sellers-${product.id}`} 
                product={product}
                index={index}
            />
        ));
    };

    return(
        <div className="flex flex-col items-center justify-center gap-0">
            <div className="flex flex-col gap-5 items-center justify-center pb-20">
                <div className="text-center">
                    <p className="text-md md:text-2xl text-muted mb-2 uppercase font-semibold">Check out what other&apos;s think is our best in stock!</p>
                    <h1 className="text-4xl md:text-6xl font-bold font-beach">Best Sellers</h1>
                </div>
                <Link href="/shop">
                    <Button>
                        See Full Shop
                        <FaLongArrowAltRight className="ml-2" />
                    </Button>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center flex-wrap gap-y-10 md:gap-y-20 pb-20">
                {query.data && renderProducts(query.data)}
            </div>
        </div>
    );
};

export default BestSellers;