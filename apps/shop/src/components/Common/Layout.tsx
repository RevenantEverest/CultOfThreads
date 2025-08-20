import React from 'react';

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {
    main?: boolean,
    transparent?: boolean
};

function Layout({ className, main, transparent, children, ...rest }: React.PropsWithChildren<LayoutProps>) {
    
    const bgColor = transparent ? "bg-transparent" : "bg-background";
    const mainStyles = main && "min-h-[100vh]";
    
    return(
        <div
            className={`
                flex
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
        </div>
    );
};

export default Layout;