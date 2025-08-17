import { FaTimesCircle, FaCircle } from 'react-icons/fa';
import { motion } from 'motion/react';
import React from 'react';

interface ProductImageProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string,
    alt: string,
    onRemoveImage: () => void
};

function ProductImage({ className, url, alt, onRemoveImage }: ProductImageProps) {

    return(
        <div className={`w-50 h-50 flex overflow-hidden border-muted border-2 rounded-lg relative group ${className}`}>
            <div className="absolute z-30 group-hover:block hover:cursor-pointer  -right-1 -top-1 p-1 rounded-full hidden">
                <motion.div
                    className="relative py-1 px-1 rounded-full items-center justify-center flex"
                    whileHover={{ y: "-0.5dvh" }}
                    onClick={onRemoveImage}
                >
                    <FaTimesCircle className="text-xl text-primary relative z-10" />
                    <FaCircle className="absolute text-text text-md bottom-1" />
                </motion.div>
            </div>
            <img className="shrink-0 relative object-cover w-full h-full" src={url} alt={alt} />
            <div className="group-hover:bg-black/60 w-50 h-50 absolute z-20 duration-150" />
        </div>
    );
};

export default ProductImage;