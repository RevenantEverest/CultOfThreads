"use client"

import React from 'react';
import { BeatLoader } from 'react-spinners';
import { useThemeStore } from '@@shop/store/theme';

interface SpinnerProps {
    className?: React.HTMLAttributes<HTMLDivElement>["className"]
};

function Spinner({ className }: SpinnerProps) {

    const theme = useThemeStore((state) => state.theme);

    return(
        <BeatLoader
            className={`
                flex items-center justify-center
                ${className}    
            `}
            size={"15px"}
            color={theme.colors.primary}
        />
    );
};

export default Spinner;