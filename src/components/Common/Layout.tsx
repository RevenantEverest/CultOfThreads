import React from 'react';
import { Flex } from 'reflexbox';

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
    main?: boolean,
    transparent?: boolean
};

function Layout({ className, main, transparent, children, ...rest }: React.PropsWithChildren<LayoutProps>) {
    
    const bgColor = transparent ? "bg-transparent" : "bg-background";
    const mainStyles = main && "min-h-[100vh]";
    
    return(
        <Flex
            className={`
                flex-col
                w-full
                relative 
                px-5 
                lg:px-64
                pt-20 
                pointer-events-auto 
                items-center
                ${mainStyles}
                ${bgColor} ${className}
            `}
            {...rest}
        >
            {children}
        </Flex>
    );
};

export default Layout;