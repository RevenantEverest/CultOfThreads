"use client"

import type { Dimensions } from './useWindowDimensions';
import type { Breakpoint } from '../types/breakpoints';

import { useEffect, useState } from 'react';
import useWindowDimensions from './useWindowDimensions';

import { BREAKPOINTS } from '../constants';


function calculateBreakpoint(dimensions: Dimensions): Breakpoint {
    let bp: keyof typeof BREAKPOINTS = "SM";

    if(dimensions.width <= BREAKPOINTS.SM) {
        bp = "SM";
    }
    if(dimensions.width > BREAKPOINTS.SM) {
        bp = "MD";
    }
    if(dimensions.width > BREAKPOINTS.MD) {
        bp = "LG";
    }
    if(dimensions.width > BREAKPOINTS.LG) {
        bp = "XL";
    }
    if(dimensions.width > BREAKPOINTS.XL) {
        bp = "XXL";
    }

    return bp;
}

function useBreakpoints(): Breakpoint | null {
    const dimensions = useWindowDimensions();
    const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(null);

    useEffect(() => {
        if(!dimensions) {
            return;
        }
        const bp = calculateBreakpoint(dimensions);
        setCurrentBreakpoint(bp);
    }, [dimensions]);

    return currentBreakpoint;
};

export default useBreakpoints;