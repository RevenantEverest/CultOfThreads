"use client"

import type { ProductListing } from '@repo/supabase';
import ProductListItem from './ProductListItem';
import { useQuery } from '@tanstack/react-query';

import { productApi } from '@repo/supabase';

function ProductList() {

    const query = useQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchListings
    });

    const renderProducts = (products: ProductListing[]) => {
        return products.map((item, index) => (
            <ProductListItem key={`product-list-${item.name}`} product={item} index={index} />
        ));
    };

    return(
        <div className="flex justify-center flex-wrap gap-5 gap-y-20 pb-20">
            {query.data && renderProducts(query.data)}
        </div>
    );
};

export default ProductList;