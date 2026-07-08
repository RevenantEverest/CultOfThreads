"use client"

import type { Product } from '@repo/entities';

import { useSearchParams } from 'next/navigation';

import { Breadcrumb, Spinner } from '@@shop/components/Common';

import ProductListItem from './ProductListItem';
import ProductCategoryList from './ProductCategoryList';

import ProductSort from './ProductSort';

import { FlatList, MotionFadeIn, ScrollElement } from '@repo/ui';
import { useBreakpointGrid } from '@@shop/hooks';

import { text } from "@@shop/utils";
import ProductSearch from './ProductSearch';

interface ProductListProps {
    products: Product[],
    nextPage: () => void,
    isLoading?: boolean
};

function ProductList({ products, nextPage, isLoading }: ProductListProps) {

    const breakpointGrid = useBreakpointGrid({ 
        overrides: {
            LG: 2, 
            XL: 4
        }
    });
    const searchParams = useSearchParams();
    const listKey = searchParams.toString();

    return(
        <div className="flex flex-col gap-10">
            <ProductCategoryList />
            <Breadcrumb routes={[
                { title: "Shop", path: "/shop" },
                { title: text.capitalizeFirstLetter(searchParams.get("filter[category]") ?? "All"), path: "/shop" },
            ]} />
            <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-center gap-10">
                    <ProductSearch />
                    <ProductSort dataAmount={products.length} />
                </div>
                <ScrollElement id="product-listings" className="flex items-center justify-center">
                    <div 
                        key={listKey}
                        className={`
                            ${breakpointGrid.gridClasses} 
                            justify-center items-center gap-5 gap-y-10 lg:gap-y-20 pb-20
                        `}
                    >
                        <FlatList
                            keyExtractor={(item: Product) => item.id}
                            data={products}
                            renderItem={({ item, index, key }) => {
                                const itemsPerRow = breakpointGrid.itemsPerRow ?? 0;
                                const staggerDelay = breakpointGrid.getAnimationStaggerValues(index, itemsPerRow);
                                return(
                                    <MotionFadeIn
                                        key={key}
                                        fadeDelay={staggerDelay}
                                        posYDelay={staggerDelay}
                                    >
                                        <ProductListItem  
                                            index={index}
                                            product={item}  
                                        />
                                    </MotionFadeIn>
                                );
                            }}
                            onEndReached={nextPage}
                            renderLoading={() => <Spinner />}
                            isLoading={isLoading}
                        />
                    </div>
                </ScrollElement>
            </div>
        </div>
    );
};

export default ProductList;