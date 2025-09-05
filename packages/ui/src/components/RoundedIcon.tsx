"use client"

import type { IconType } from 'react-icons';

import { motion } from 'framer-motion';

export type RoundedIconSize = "sm" | "md" | "lg";

export interface RoundedIconType {
    icon: IconType,
    url?: string,
    size?: RoundedIconSize,
    gradient?: boolean,
    containerClassName?: string,
    iconClassName?: string

};

function RoundedIcon({ icon, size="md", url, gradient, containerClassName, iconClassName }: RoundedIconType) {

    const sizeClasses: Record<RoundedIconSize, string> = {
        "sm": "p-4 text-md",
        "md": "p-6 text-2xl",
        "lg": "p-7 text-3xl"
    };

    const Icon = icon;
    const backgroundClassName = gradient ? "bg-gradient-to-bl from-primary to-secondary text-white" : "bg-secondary text-card";

    const renderIcon = () => (
        <motion.div
            whileHover={{
                y: "-.5vh"
            }}
        >
            <div
                className={`
                    ${backgroundClassName} 
                    flex rounded-full items-center justify-center 
                    ${sizeClasses[size]} 
                    ${containerClassName}
                `}
            >
                <Icon className={`absolute ${iconClassName}`} />
            </div>
        </motion.div>
    );

    return url ? <a href={url} target="_blank" rel="noopener noreferrer">{renderIcon()}</a> : renderIcon();
};

export default RoundedIcon;