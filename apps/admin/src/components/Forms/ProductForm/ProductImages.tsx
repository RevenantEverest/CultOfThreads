import type { ProductMedia } from '@repo/supabase';

import { ProductImage as Image } from '@@admin/components/Products';
import { URLS } from '@@admin/constants';

interface ProductImagesProps {
    images: ProductMedia[],
    onRemoveImage: (image: ProductMedia) => void
};

function ProductImages({ images, onRemoveImage }: ProductImagesProps) {

    const renderImages = () => {
        const Images = images.filter((_, index) => index !== 0).map((image, index) => (
            <Image
                key={`product-image-${index}`}
                className={`!w-23 !h-23`}
                url={`${URLS.supabaseStorageUrl}/${image.media_url ?? ""}`}
                alt={`product image ${index}`}
                onRemoveImage={() => onRemoveImage(image)}
            />
        ));

        return(
            <div className="flex gap-4">
                <Image
                    url={`${URLS.supabaseStorageUrl}/${images?.[0]?.media_url ?? ""}`}
                    onRemoveImage={() => images[0] && onRemoveImage(images[0])}
                    alt={`featured product image`}
                />
                <div className="grid grid-flow-col gap-3 grid-rows-2">
                    {Images}
                </div>
            </div>
        );
    };

    return(
        <>
            {renderImages()}
        </>
    );
};

export default ProductImages;