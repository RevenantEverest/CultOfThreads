"use client"

import ProductImages from './ProductImages';
import ProductDetails from './ProductDetails';
import { products } from '@repo/queries';

interface ProductProps {
    slug: string
};

function Product({ slug }: ProductProps) {

    const { data } = products.hooks.useGetOnePublic({
        id: slug
    });

    return(
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
                {
                    (data?.results && data.results.media) && 
                    <ProductImages images={data.results.media} />
                }
            </div>
            <div className="flex-1">
                {
                    (data?.results && data.results.details) &&
                    <ProductDetails 
                        id={data.results.id}
                        name={data.results.name} 
                        description={data.results.description?.toString()}
                        details={data.results.details}
                        tags={data.results.tags}
                    />
                }
            </div>
        </div>
    );
};

export default Product;