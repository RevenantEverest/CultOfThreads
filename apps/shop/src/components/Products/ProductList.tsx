"use client"

import type { ProductListing } from '@repo/supabase';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ProductListItem from './ProductListItem';

import { productApi } from '@repo/supabase';
import ProductSort from './ProductSort';

function ProductList() {

    const query = useQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchListings
    });

    const [displayedProducts, setDisplayedProducts] = useState(query.data ?? []);

    const renderProducts = (products: ProductListing[]) => {
        return products.map((item, index) => (
            <ProductListItem key={`product-list-${item.name}`} product={item} index={index} />
        ));
    };

    return(
        <div className="w-full flex flex-col gap-10">
            <ProductSort products={query.data ?? []} displayedProducts={displayedProducts} setProducts={setDisplayedProducts} />
            <div className="flex justify-center flex-wrap gap-5 gap-y-20 pb-20">
                {renderProducts(displayedProducts)}
            </div>
        </div>
    );
};

export default ProductList;