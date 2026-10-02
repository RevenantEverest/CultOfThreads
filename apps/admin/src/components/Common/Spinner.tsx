import type { ThemeColors } from '@repo/ui';

import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useThemeStore } from '@@admin/store/theme';

interface SpinnerProps {
    className?: React.HTMLAttributes<HTMLDivElement>["className"],
    color?: string | keyof ThemeColors
};

function isThemeColorKey(value: string, colors: ThemeColors): value is keyof ThemeColors {
    return value in colors;
};

function Spinner({ className, color }: SpinnerProps) {

    const theme = useThemeStore((state) => state.theme);
    const colorOverride = color && isThemeColorKey(color, theme.colors)
        ? theme.colors[color] 
        : color;

    return(
        <BeatLoader
            className={`
                flex items-center justify-center
                ${className}    
            `}
            size={"15px"}
            color={colorOverride ?? theme.colors.primary}
        />
    );
};

export default Spinner;