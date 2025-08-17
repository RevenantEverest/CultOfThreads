"use client"

import type { ProductMedia } from '@@shop/api/productMedia';

import { useState } from 'react';
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa';
import { URLS } from '@@shop/constants';

interface ProductImages {
    images: ProductMedia[]
};

function ProductImages({ images }: ProductImages) {

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
                    <img
                        alt={'Product Image'}
                        src={URLS.supabaseStorageUrl + image.media_url}
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
                <img className="rounded-xl border-muted border-4" src={URLS.supabaseStorageUrl + images[imageIndex].media_url} alt={`featured`} />
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
        </div>
    );
};

export default ProductImages;