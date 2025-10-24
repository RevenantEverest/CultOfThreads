/*

    Be careful in this hook, since Remix renders components server-side
    it has no concept of the "window" definition.

    The current workaround is to only access "window" in useEffect hooks
    since those only run on the client

*/

import { useEffect, useState } from 'react';

export interface Dimensions {
    width: number,
    height: number
};

function useWindowDimensions(): Dimensions | undefined {
    const [dimensions, setDimension] = useState<Dimensions | undefined>();

    useEffect(() => {
        const updateDimensions = () => {
            setDimension({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    });

    useEffect(() => {
        setDimension({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, []);

    return dimensions;
};

export default useWindowDimensions;