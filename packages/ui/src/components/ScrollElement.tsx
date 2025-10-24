import React from 'react';

interface ScrollElementProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string
};

function ScrollElement({ id, className, children, ...rest }: React.PropsWithChildren<ScrollElementProps>) {

    return(
        <div
            id={id}
            className={`${className}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default ScrollElement;