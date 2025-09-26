import NextImage, { type ImageProps as NextImageProps } from 'next/image';

import { ENV } from '@@shop/constants';

function Image({ className, height, width, src, alt, ...rest }: NextImageProps) {

    const renderNextImage = () => {
        return(
            <NextImage
                className={className}
                height={height}
                width={width}
                src={src}
                alt={alt}
                {...rest}
            />
        );
    };

    const renderNativeImage = () => {
        if(typeof src !== "string") {
            return;
        }

        return(
            <img className={className} src={src} alt={alt} /> //eslint-disable-line
        );
    };

    return ENV.USE_NATIVE_IMAGE ? renderNativeImage() : renderNextImage();
};

export default Image;