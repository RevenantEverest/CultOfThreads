"use client"

import type { ProductListing } from '@repo/supabase';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { Breadcrumb } from '@@shop/components/Common';

import ProductListItem from './ProductListItem';
import ProductCategories from './ProductCategories';

import { productApi } from '@repo/supabase';
import ProductSort from './ProductSort';

import { productSort } from '@@shop/utils';

function ProductList() {

    const searchParams = useSearchParams();
    const query = useQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchActiveListings
    });

    const getInitialProducts = useCallback((): ProductListing[] => {
        if(!query.data) return [];

        const searchCategory = searchParams.get("category");
        const searchSort = searchParams.get("sort");

        let data = query.data;

        if(searchCategory) {
            data = data.filter((item) => {
                if(!item.categories) return;

                const categoryNames = item.categories.map((category) => category.category.name);
                
                return categoryNames.includes(searchCategory);
            });
        }

        if(searchSort) {
            data = productSort.sortProducts(searchSort, data);
        }

        return data;
    }, [query.data, searchParams]);

    const [products, setProducts] = useState(getInitialProducts());
    const [displayedProducts, setDisplayedProducts] = useState(getInitialProducts());

    useEffect(() => {
        const initialProducts = getInitialProducts();

        setProducts(initialProducts);
        setDisplayedProducts(initialProducts);
    }, [searchParams, getInitialProducts]);

    const renderProducts = (products: ProductListing[]) => {
        return products.map((item, index) => (
            <ProductListItem key={`product-list-${item.name}`} product={item} index={index} />
        ));
    };

    return(
        <div className="flex flex-col gap-10">
            <ProductCategories />
            <Breadcrumb routes={[
                { title: "Shop", path: "/shop" },
                { title: (searchParams.get("category")) ?? "All", path: "/shop" },
            ]} />
            <div className="w-full flex flex-col gap-10">
                <ProductSort products={products} displayedProducts={displayedProducts} setProducts={setDisplayedProducts} />
                <div className="flex justify-center flex-wrap gap-5 gap-y-20 pb-20">
                    {renderProducts(displayedProducts)}
                </div>
            </div>
        </div>
    );
};

export default ProductList;