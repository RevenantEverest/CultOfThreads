"use client"

import ReactSparkle, { type ReactSparkleProps } from 'react-sparkle';
import { useThemeStore } from '@@shop/store/theme';

function Sparkle({ color, ...rest }: ReactSparkleProps) {

    const theme = useThemeStore((state) => state.theme);
    const defaultColor = theme.colors.cardLight;

    return(
        <ReactSparkle color={defaultColor ?? color} {...rest} />
    );
};

export default Sparkle;