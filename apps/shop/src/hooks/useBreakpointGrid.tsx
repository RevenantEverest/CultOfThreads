import type { Breakpoint } from '@repo/ui';

import { useBreakpoints } from '@repo/ui/hooks';
import { useEffect, useState } from 'react';

type AvailableItemsPerRow = 1 | 2 | 3 | 4 | 5;
type BreakpointGridOverrides = Partial<Record<Breakpoint, AvailableItemsPerRow>>;

interface BreakpointGridProps {
    overrides?: BreakpointGridOverrides,
    ROW_STAGGER_TIME?: number,
    COLUMN_STAGGER_TIME?: number
};

interface BreakpointGrid {
    itemsPerRow: AvailableItemsPerRow | null,
    gridClasses: string,
    getAnimationStaggerValues: (index: number, rowItems: number) => number
}

/**
 * Default Items Per Row
 * @default 
 * "SM": 1
 * "MD": 2
 * "LG": 3
 * "XL": 4
 * "XXL": 4
 * @param overrides 
 * @returns 
 */
function useBreakpointGrid(props?: BreakpointGridProps): BreakpointGrid {

    const ROW_STAGGER_TIME = props?.ROW_STAGGER_TIME ?? 0.1;
    const COLUMN_STAGGER_TIME = props?.COLUMN_STAGGER_TIME ?? 0.1;

    const breakpoint = useBreakpoints();
    const [itemsPerRow, setItemsPerRow] = useState<AvailableItemsPerRow | null>(1);

    const defaultGridSizes: Record<Breakpoint, AvailableItemsPerRow> = {
        "SM": 1,
        "MD": 2,
        "LG": 3,
        "XL": 4,
        "XXL": 4
    };

    const gridClasses: Record<
        Breakpoint, 
        Record<AvailableItemsPerRow, string>
    > = {
        "SM": {
            "1": "grid-cols-1",
            "2": "grid-cols-2",
            "3": "grid-cols-3",
            "4": "grid-cols-4",
            "5": "grid-cols-5"
        },
        "MD": {
            "1": "md:grid-cols-1",
            "2": "md:grid-cols-2",
            "3": "md:grid-cols-3",
            "4": "md:grid-cols-4",
            "5": "md:grid-cols-5"
        },
        "LG": {
            "1": "lg:grid-cols-1",
            "2": "lg:grid-cols-2",
            "3": "lg:grid-cols-3",
            "4": "lg:grid-cols-4",
            "5": "lg:grid-cols-5"
        },
        "XL": {
            "1": "xl:grid-cols-1",
            "2": "xl:grid-cols-2",
            "3": "xl:grid-cols-3",
            "4": "xl:grid-cols-4",
            "5": "xl:grid-cols-5"
        },
        "XXL": {
            "1": "xxl:grid-cols-1",
            "2": "xxl:grid-cols-2",
            "3": "xxl:grid-cols-3",
            "4": "xxl:grid-cols-4",
            "5": "xxl:grid-cols-5"
        }
    };

    useEffect(() => {
        if(!breakpoint) {
            return;
        }

        const currentDefault = defaultGridSizes[breakpoint];
        const override = props?.overrides && props?.overrides[breakpoint];


        setItemsPerRow(override ?? currentDefault);
    }, [breakpoint]); //eslint-disable-line

    const generateGridClasses = (): string => {
        const breakpointKeys: Array<Breakpoint> = ["SM", "MD", "LG", "XL", "XXL"];
        let classes = "";

        for(let i = 0; i < breakpointKeys.length; i++) {
            const currentBreakpoint = breakpointKeys[i] as Breakpoint;
            const currentDefault = defaultGridSizes[currentBreakpoint];
            const override = props?.overrides && props?.overrides[currentBreakpoint];

            classes += gridClasses[currentBreakpoint][override ?? currentDefault] + " ";
        }

        return classes;
    };

    const getAnimationStaggerValues = (index: number, rowItems: number) => {
        const rowIndex = Math.floor(index / rowItems);
        const colIndex = index % rowItems;

        const rowDelay = rowIndex * ROW_STAGGER_TIME;
        const colDelay = colIndex * COLUMN_STAGGER_TIME;
        const staggerDelay = rowDelay + colDelay;

        return staggerDelay;
    };

    return {
        itemsPerRow,
        gridClasses: `grid ${generateGridClasses()}`,
        getAnimationStaggerValues
    };
};

export default useBreakpointGrid;