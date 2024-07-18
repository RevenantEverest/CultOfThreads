import type { PropsWithChildren } from 'react';
import { Card as FlowbiteCard } from 'flowbite-react';

export interface CardProps {
    horizontal?: boolean;
    href?: string;
    imgAlt?: string;
    imgSrc?: string;
    className?: string
};

function Card({ className="", horizontal, href, imgAlt, imgSrc, children }: PropsWithChildren<CardProps>) {
    
    return(
        <FlowbiteCard 
            className={className}
            horizontal={horizontal}
            href={href}
            imgAlt={imgAlt}
            imgSrc={imgSrc}
            theme={{ 
                root: { 
                    base: "bg-card h-full rounded-2xl shadow-xl",
                    children: "flex h-full flex-col justify-center gap-4 p-2.5"
                } 
            }}
        >
            {children}
        </FlowbiteCard>
    );
};

export default Card;