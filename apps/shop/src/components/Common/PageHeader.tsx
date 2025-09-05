"use client"

import React from 'react';
import { BubbleDivider } from '@repo/ui';
import { useThemeStore } from '@@shop/store/theme';

interface PageHeaderProps {
    dividerColor?: string
};

function PageHeader({ dividerColor, children }: React.PropsWithChildren<PageHeaderProps>) {

    const theme = useThemeStore((state) => state.theme);

    return(
        <React.Fragment>
            <div className="bg-gradient-to-br from-card-light to-primary z-20 w-full overflow-hidden relative h-[90dvh]">
                {children}
            </div>
            <BubbleDivider bgColor={dividerColor ?? theme.colors.background} className="z-30 h-27 w-full relative -top-26 md:-top-26" />
        </React.Fragment>
    );
};

export default PageHeader;