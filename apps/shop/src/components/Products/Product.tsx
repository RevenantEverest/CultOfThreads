"use client"

import { useQuery } from '@tanstack/react-query';
import { productApi } from '@repo/supabase';

import ProductImages from './ProductImages';
import ProductDetails from './ProductDetails';

interface ProductProps {
    slug: string
};

function Product({ slug }: ProductProps) {

    const query = useQuery({
        queryKey: ["products", slug],
        queryFn: () => productApi.fetchListingById(slug)
    });

    return(
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
                {
                    (query.data && query.data.media) && 
                    <ProductImages images={query.data.media} />
                }
            </div>
            <div className="flex-1">
                {
                    (query.data && query.data.details) &&
                    <ProductDetails 
                        name={query.data.name} 
                        description={query.data.description?.toString()}
                        details={query.data.details}
                    />
                }
            </div>
        </div>
    );
};

export default Product;