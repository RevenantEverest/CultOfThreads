import React from 'react';

interface ScrollLinkProps extends React.HTMLAttributes<HTMLDivElement> {
    to: string,
    padding?: number
};

function ScrollLink({ to, padding=0, className, children, onClick, ...rest }: React.PropsWithChildren<ScrollLinkProps>) {

    const scrollToElement = () => {
        const element = document.getElementById(to);

        if(!element) {
            return;
        }

        const targetPosition = element.getBoundingClientRect().top + window.scrollY - padding;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
    };

    return(
        <div
            className={`${className}`}
            onClick={(e) => {
                e.preventDefault();

                scrollToElement();

                if(onClick) {
                    onClick(e);
                }
            }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default ScrollLink;