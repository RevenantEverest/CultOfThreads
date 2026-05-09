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
import { MotionFadeIn, ScrollElement } from '@repo/ui';
import { useBreakpointGrid } from '@@shop/hooks';

function ProductList() {

    const breakpointGrid = useBreakpointGrid({ 
        overrides: {
            LG: 2, 
            XL: 4
        }
    });
    const searchParams = useSearchParams();
    const query = useQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchActiveListings
    });

    const listKey = searchParams.toString();

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
        const itemsPerRow = breakpointGrid.itemsPerRow;

        if(!itemsPerRow) {
            return;
        }


        return products.map((item, index) => {            
            const staggerDelay = breakpointGrid.getAnimationStaggerValues(index, itemsPerRow);

            return(
                <MotionFadeIn
                    key={`product-list-${item.id}-${index}`}
                    fadeDelay={staggerDelay}
                    posYDelay={staggerDelay}
                >
                    <ProductListItem  
                        index={index}
                        product={item}  
                    />
                </MotionFadeIn>
            );
        });
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
                <ScrollElement id="product-listings" className="flex items-center justify-center">
                    <div 
                        key={listKey}
                        className={`
                            ${breakpointGrid.gridClasses} 
                            justify-center items-center gap-5 gap-y-10 lg:gap-y-20 pb-20
                        `}
                    >
                        {breakpointGrid.itemsPerRow && renderProducts(displayedProducts)}
                    </div>
                </ScrollElement>
            </div>
        </div>
    );
};

export default ProductList;