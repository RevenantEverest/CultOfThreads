import type { ProductListing } from '@repo/supabase';

import Link from 'next/link';
import Image from 'next/image';
import { FaDollarSign } from 'react-icons/fa6';
import { motion } from 'motion/react';
import { Card, CardContent } from '@repo/ui';

import { URLS } from '@@shop/constants';

interface ProductListItemProps {
    product: ProductListing,
    index: number
};

function ProductListItem({ product }: ProductListItemProps) {

    const featuredImage = product.media && product.media[0];

    return(
        <Link href={`/shop/${product.id}`}>
            <motion.div
                whileHover={{ y: "-.5dvh" }}
            >
                <motion.div
                    viewport={{ once: true }}
                >
                    <Card className="w-80 border-muted/20">
                        <CardContent className="flex justify-center items-center p-4">
                            {
                                product.media &&
                                <Image 
                                    className="rounded-xl"
                                    height={500}
                                    width={500}
                                    src={URLS.supabaseStorageUrl + (featuredImage ? featuredImage.media_url : "")} 
                                    alt={product.name}
                                />
                            }
                        </CardContent>
                    </Card>
                    <div className="flex flex-col gap-2 px-2">
                        <p className="font-bold text-left text-xl">{product.name}</p>
                        <div className="flex items-center -ml-1">
                            <FaDollarSign className="text-primary text-lg" />
                            <p className="font-semibold">
                                {product.details?.online_price}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </Link>
    );
};

export default ProductListItem;