"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useThemeStore } from '@@admin/store/theme';
import { Button } from '@repo/ui';
import { RiUploadCloudFill } from 'react-icons/ri';
import { ProductImage } from '@@admin/components/Products';

export interface FileUploadProps {
    limit?: number,
    onChange: (files: File[]) => void; 
};

function FileUpload({ limit=0, onChange }: FileUploadProps) {

    const ref = useRef<HTMLInputElement>(null);
    const theme = useThemeStore((state) => state.theme);
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        onChange(images);
    }, [images]);

    const openFileBrowser = () => {
        if(!ref.current) {
            return;
        }

        ref.current.click();
    };

    const updateImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            return;
        }

        if(images.length >= limit) {
            return;
        }

        setImages([...images, ...e.target.files]);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        if(images.length >= limit) {
            return;
        }

        const droppedFiles = e.dataTransfer.files;

        if(droppedFiles.length > 0) {
            const newImages = Array.from(droppedFiles);

            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (removeIndex: number) => {
        const currentImages = images;
        const updatedImages = currentImages.filter((_, index) => index !== removeIndex);

        setImages(updatedImages);
    }

    const renderImages = () => {
        return images.map((image, index) => (
            <ProductImage 
                key={`file-upload-${index}`} 
                url={URL.createObjectURL(image)}
                alt={`file upload ${index}`}
                onRemoveImage={() => removeImage(index)}
            />
        ));
    };

    return(
        <div className="flex flex-col gap-5 w-full">
            <input ref={ref} type="file" hidden onChange={updateImages} />
            <div className="flex justify-center">
                <div 
                    className="flex flex-col items-center justify-center gap-2 border-dotted border-muted rounded-xl border-4 py-6 px-10 w-full"
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <RiUploadCloudFill color={theme.colors.primary} className="text-7xl" />
                    <p className="text-xl font-semibold">Drag files to upload</p>
                    <p className="text-lg">or</p>
                    <Button
                        type="button"
                        className="mt-1 bg-transparent border-3 border-primary text-primary hover:text-white" 
                        onClick={openFileBrowser}
                    >
                        Browse Files
                    </Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center justify-center">
                {renderImages()}
            </div>
        </div>
    );
};

export default FileUpload;