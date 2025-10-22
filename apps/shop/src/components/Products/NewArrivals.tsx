"use client"

import type { ProductListing } from '@repo/supabase';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Button, MotionFadeIn } from '@repo/ui';
import { useBreakpoints } from '@repo/ui/hooks';
import ProductListItem from './ProductListItem';

import { productApi } from '@repo/supabase';
import { FaLongArrowAltRight } from 'react-icons/fa';

function NewArrivals() {

    const breakpoint = useBreakpoints();
    const query = useQuery({
        queryKey: ["new_products"],
        queryFn: () => productApi.fetchByTagName("New")
    });

    const [itemsInRow, setItemsInRow] = useState<number | null>(null);

    useEffect(() => {
        switch(breakpoint) {
            case "XXL":
                setItemsInRow(3);
                break;
            case "XL": 
                setItemsInRow(3);
                break;
            case "LG":
                setItemsInRow(3);
                break;
            case "MD":
                setItemsInRow(3);
                break;
            case "SM": 
                setItemsInRow(1);
                break;
        }
    }, [breakpoint]);

    const renderProducts = (products: ProductListing[]) => {
        if(!itemsInRow) {
            return;
        }

        const ROW_STAGGER_TIME = 0.1;
        const COLUMN_STAGGER_TIME = 0.1;

        return products.map((product, index) => {
            const rowIndex = Math.floor(index / itemsInRow);
            const colIndex = index % itemsInRow;

            const rowDelay = rowIndex * ROW_STAGGER_TIME;
            const colDelay = colIndex * COLUMN_STAGGER_TIME;
            const staggerDelay = rowDelay + colDelay;

            return(
                <MotionFadeIn
                    key={`new-arrivals-${product.id}`} 
                    fadeDelay={staggerDelay}
                    posYDelay={staggerDelay}
                >
                    <ProductListItem 
                        
                        product={product}
                        index={index}
                />
                </MotionFadeIn>
            );
        });
    };

    return(
        <div className="flex flex-col items-center justify-center gap-0">
            <MotionFadeIn>
            <div className="flex flex-col gap-5 items-center justify-center pb-20">
                <div className="text-center">
                    <p className="text-md md:text-2xl text-muted mb-2 uppercase font-semibold">See what&apos;s new!</p>
                    <h1 className="text-4xl md:text-6xl font-bold font-beach">New Arrivals</h1>
                </div>
                <Link href="/shop" className="">
                    <Button>
                        See Full Shop
                        <FaLongArrowAltRight className="ml-2" />
                    </Button>
                </Link>
            </div>
            </MotionFadeIn>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10 md:gap-y-20 pb-20">
                    {query.data && itemsInRow && renderProducts(query.data)}
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;