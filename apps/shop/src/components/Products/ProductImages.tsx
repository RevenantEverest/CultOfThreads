"use client"

import type { ProductMedia } from '@repo/supabase';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { URLS } from '@@shop/constants';
import { Lightbox } from '../Common';

interface ProductImages {
    images: ProductMedia[]
};

function ProductImages({ images }: ProductImages) {

    const [open, setOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const nextImage = () => {
        let newImageIndex = imageIndex + 1;

        if(imageIndex + 1 > (images.length - 1)) {
            newImageIndex = 0;
        }

        setImageIndex(newImageIndex);
    };

    const previousImage = () => {
        let newImageIndex = imageIndex - 1;

        if((imageIndex - 1) < 0) {
            newImageIndex = images.length - 1;
        }

        setImageIndex(newImageIndex);
    };

    const renderImages = () => {
        return images.map((image, index) => {
            const isActive = imageIndex === index;
            return(
                <button 
                    key={`product-image-${image.id}`}
                    className={`
                        hover:cursor-pointer
                        border-4 rounded-lg
                        w-20
                        ${isActive ? "border-primary" : "border-muted"}
                    `}
                    onClick={() => setImageIndex(index)}
                >
                    <Image
                        alt={'Product Image'}
                        height={400}
                        width={400}
                        src={URLS.SUPABASE_STORAGE + image.media_url}
                    />
                </button>
            );
        });
    };

    return(
        <div className="flex flex-col md:flex-row gap-2 relative">
            <div className="flex items-center justify-center relative rounded-xl">
                {
                    images.length > 1 &&
                    <FaChevronCircleLeft 
                        className="absolute left-4 text-4xl text-card/100 duration-150 hover:cursor-pointer hover:text-primary"
                        onClick={previousImage}
                    />
                }
                <Image 
                    className="rounded-xl border-muted border-4 hover:cursor-zoom-in"
                    height={1080}
                    width={1080}
                    loading="eager"
                    src={URLS.SUPABASE_STORAGE + (images[imageIndex] && images[imageIndex].media_url)} 
                    alt={`featured`}
                    onClick={() => setOpen(true)}
                />
                {
                    images.length > 1 &&
                    <FaChevronCircleRight 
                        className="absolute right-4 text-4xl text-card/100 duration-150 hover:cursor-pointer hover:text-primary"
                        onClick={nextImage}
                    />
                }
            </div>
            <div className="flex flex-row md:flex-col gap-3">
                {images.length > 1 && renderImages()}
            </div>
            <Lightbox 
                open={open} 
                setOpen={setOpen} 
                index={imageIndex}
                images={images.map((image) => URLS.SUPABASE_STORAGE + image.media_url)}
            />
        </div>
    );
};

export default ProductImages;