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
import { useBreakpoints } from '@repo/ui/hooks';
import { MotionFadeIn, ScrollElement } from '@repo/ui';

function ProductList() {

    const breakpoint = useBreakpoints();
    const searchParams = useSearchParams();
    const query = useQuery({
        queryKey: ["products"],
        queryFn: productApi.fetchActiveListings
    });

    const [itemsInRow, setItemsInRow] = useState<number | null>(null);
    const listKey = searchParams.toString();

    useEffect(() => {
        switch(breakpoint) {
            case "XXL":
                setItemsInRow(4);
                break;
            case "XL": 
                setItemsInRow(4);
                break;
            case "LG":
                setItemsInRow(3);
                break;
            case "MD":
                setItemsInRow(2);
                break;
            case "SM": 
                setItemsInRow(1);
                break;
        }
    }, [breakpoint]);

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
        if(!itemsInRow) {
            return;
        }

        const ROW_STAGGER_TIME = 0.1;
        const COLUMN_STAGGER_TIME = 0.1;

        return products.map((item, index) => {            
            const rowIndex = Math.floor(index / itemsInRow);
            const colIndex = index % itemsInRow;

            const rowDelay = rowIndex * ROW_STAGGER_TIME;
            const colDelay = colIndex * COLUMN_STAGGER_TIME;
            const staggerDelay = rowDelay + colDelay;

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
                            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
                            justify-center items-center gap-5 gap-y-10 lg:gap-y-20 pb-20
                        `}
                    >
                        {itemsInRow && renderProducts(displayedProducts)}
                    </div>
                </ScrollElement>
            </div>
        </div>
    );
};

export default ProductList;