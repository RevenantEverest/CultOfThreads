"use client"

import type { ProductListing } from '@repo/supabase';

import Link from 'next/link';
import posthog from 'posthog-js';
import { usePathname } from 'next/navigation';
import { FaDollarSign } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { MotionHover } from '@repo/ui';

import { Image } from '@@shop/components/Common';
import ProductTags from './ProductTags';

import { URLS } from '@@shop/constants';


interface ProductListItemProps {
    product: ProductListing,
    index: number,
};

function ProductListItem({ product }: ProductListItemProps) {

    const featuredImage = product.media && product.media[0];
    const pathname = usePathname();

    return(
        <Link 
            href={`/shop/${product.id}`} 
            onClick={() => 
                posthog.capture(
                    "product listing click", 
                    { productId: product.id, productName: product.name, locationUrl: pathname }
                )
            }
        >
            <MotionHover>
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 120 }}
                >
                <div className="flex flex-col gap-3">
                    <div className="flex justify-center items-center h-80 w-80 border-secondary border-6 rounded-xl overflow-hidden bg-secondary">
                        {
                            product.media &&                            
                                <motion.div
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 120 }}
                                >
                                    <Image 
                                        className="rounded-xl"
                                        height={500}
                                        width={500}
                                        loading="eager"
                                        src={URLS.SUPABASE_STORAGE + (featuredImage ? featuredImage.media_url : "")} 
                                        alt={product.name}
                                    />
                                </motion.div>
                        }
                    </div>
                    <div className="flex flex-col gap-2 px-2">
                        {(product.tags && product.tags.length > 0) && <ProductTags tags={product.tags} />}
                        <p className="font-bold text-left text-xl">{product.name}</p>
                        <div className="flex items-center -ml-1">
                            <FaDollarSign className="text-primary text-lg" />
                            <p className="font-semibold">
                                {product.details?.online_price}
                            </p>
                        </div>
                    </div>
                </div>
                </motion.div>
            </MotionHover>
        </Link>
    );
};

export default ProductListItem;