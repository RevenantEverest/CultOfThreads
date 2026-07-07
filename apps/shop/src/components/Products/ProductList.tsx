"use client"

import type { Product } from '@repo/entities';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { Breadcrumb } from '@@shop/components/Common';

import ProductListItem from './ProductListItem';
import ProductCategories from './ProductCategories';

import ProductSort from './ProductSort';

import { productSort } from '@@shop/utils';
import { MotionFadeIn, ScrollElement } from '@repo/ui';
import { useBreakpointGrid } from '@@shop/hooks';

import { products as productsQueries } from '@repo/queries';

function ProductList() {

    const breakpointGrid = useBreakpointGrid({ 
        overrides: {
            LG: 2, 
            XL: 4
        }
    });
    const searchParams = useSearchParams();

    const { data } = productsQueries.hooks.useIndexPublic({
        pagination: {
            limit: 10
        }
    });

    const listKey = searchParams.toString();

    const getInitialProducts = useCallback((): Product[] => {
        if(!data) return [];

        const searchCategory = searchParams.get("category");
        const searchSort = searchParams.get("sort");

        let productData = data?.pages.flatMap((page) => page.results) ?? [];

        if(searchCategory) {
            productData = productData.filter((item) => {
                if(!item.categories) return;

                const categoryNames = item.categories.map((category) => category.category.name);
                
                return categoryNames.includes(searchCategory);
            });
        }

        if(searchSort) {
            productData = productSort.sortProducts(searchSort, productData);
        }

        return productData;
    }, [data, searchParams]);

    const [products, setProducts] = useState(getInitialProducts());
    const [displayedProducts, setDisplayedProducts] = useState(getInitialProducts());

    useEffect(() => {
        const initialProducts = getInitialProducts();

        setProducts(initialProducts);
        setDisplayedProducts(initialProducts);
    }, [searchParams, getInitialProducts]);

    const renderProducts = (products: Product[]) => {
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