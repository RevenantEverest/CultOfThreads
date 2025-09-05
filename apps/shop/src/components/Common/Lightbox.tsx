"use client"

import ReactLightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import "yet-another-react-lightbox/styles.css";

interface LightboxProps {
    open: boolean,
    setOpen: (value: boolean) => void,
    images: string[],
    index?: number
};

function Lightbox({ open, setOpen, images, index }: LightboxProps) {
    return(
        <ReactLightbox
            plugins={[Zoom]}
            open={open}
            close={() => setOpen(false)}
            slides={images.map((image) => ({ src: image }))}
            index={index}
        />  
    );
};

export default Lightbox;