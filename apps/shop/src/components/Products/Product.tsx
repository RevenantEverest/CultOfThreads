"use client"

import { useQuery } from '@tanstack/react-query';
import * as productApi from '@@shop/api/products';

import ProductImages from './ProductImages';
import ProductDetails from './ProductDetails';

interface ProductProps {
    slug: string
};

function Product({ slug }: ProductProps) {

    const query = useQuery({
        queryKey: ["products", slug],
        queryFn: () => productApi.fetchById(slug)
    });

    return(
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
                {
                    (query.data && query.data.product_media) && 
                    <ProductImages images={query.data.product_media} />
                }
            </div>
            <div className="flex-1">
                {
                    (query.data && query.data.product_details) &&
                    <ProductDetails 
                        name={query.data.name} 
                        description={query.data.description?.toString()}
                        details={query.data.product_details}
                    />
                }
            </div>
        </div>
    );
};

export default Product;