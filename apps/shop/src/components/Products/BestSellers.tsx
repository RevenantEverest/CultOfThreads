"use client"

import type { Product } from '@repo/entities';

import Link from 'next/link';

import { Button, MotionFadeIn } from '@repo/ui';
import ProductListItem from './ProductListItem';

import { useBreakpointGrid } from '@@shop/hooks';

import { FaLongArrowAltRight } from 'react-icons/fa';
import { products } from '@repo/queries';

function BestSellers() {

    const breakpointGrid = useBreakpointGrid();
    const query = products.hooks.useGetByBestSellersPublic();

    const renderProducts = (products: Product[]) => {
        const itemsPerRow = breakpointGrid.itemsPerRow;

        if(!itemsPerRow) {
            return;
        }

        return products.map((product, index) => {
            const staggerDelay = breakpointGrid.getAnimationStaggerValues(index, itemsPerRow);

            return(
                <MotionFadeIn
                    key={`best-sellers-${product.id}`}
                    fadeDelay={staggerDelay}
                    posYDelay={staggerDelay}
                >
                    <ProductListItem product={product} index={index} />
                </MotionFadeIn>
            );
        });
    };

    return(
        <div className="flex flex-col items-center justify-center gap-0">
            <MotionFadeIn>
            <div className="flex flex-col gap-5 items-center justify-center pb-20">
                <div className="text-center">
                    <p className="text-md md:text-2xl text-muted mb-2 uppercase font-semibold">Check out what other&apos;s think is our best in stock!</p>
                    <h1 className="text-4xl md:text-6xl font-bold font-beach">Best Sellers</h1>
                </div>
                <Link href="/shop">
                    <Button>
                        See Full Shop
                        <FaLongArrowAltRight className="ml-2" />
                    </Button>
                </Link>
            </div>
            </MotionFadeIn>
            <div className="flex items-center justify-center">
                <div className={`
                    ${breakpointGrid.gridClasses} gap-5 gap-y-10 md:gap-y-20 pb-20
                `}>
                    {query.data && breakpointGrid.itemsPerRow && renderProducts(query.data.results)}
                </div>
            </div>
        </div>
    );
};

export default BestSellers;