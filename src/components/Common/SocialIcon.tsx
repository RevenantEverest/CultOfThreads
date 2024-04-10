import type { IconType } from 'react-icons';

import { Flex } from 'reflexbox';
import { motion } from 'framer-motion';
import { FaEtsy, FaTiktok, FaInstagram } from 'react-icons/fa';

import { SOCIAL_LINKS } from '@@constants';

export type SocialBrand =  "Instagram" | "Etsy" | "TikTok";
type SocialIconSize = "sm" | "md" | "lg";

export interface SocialIconProps {
    brand: SocialBrand,
    size: SocialIconSize,
    gradient?: boolean,
    containerClassName?: string,
    iconClassName?: string
};

function SocialIcon({ brand, size, gradient, containerClassName, iconClassName }: SocialIconProps) {

    const brandLinks: Record<SocialBrand, string> = {
        "Instagram": SOCIAL_LINKS.INSTAGRAM.url,
        "Etsy": SOCIAL_LINKS.ETSY.url,
        "TikTok": SOCIAL_LINKS.TIK_TOK.url
    };

    const brandIcon: Record<SocialBrand, IconType> = {
        "Instagram": FaInstagram,
        "Etsy": FaEtsy,
        "TikTok": FaTiktok
    };

    const sizeClasses: Record<SocialIconSize, string> = {
        "sm": "p-4 text-md",
        "md": "p-6 text-2xl",
        "lg": "p-7 text-3xl"
    };

    const Icon = brandIcon[brand];
    const backgroundClassName = gradient ? "bg-gradient-to-bl from-primary to-secondary text-white" : "bg-secondary text-card"

    return(
        <a href={brandLinks[brand]} target="_blank" rel="noopener noreferrer">
            <motion.div
                whileHover={{
                    y: "-.5vh"
                }}
            >
                <Flex 
                    className={`
                        ${backgroundClassName} 
                        rounded-full items-center justify-center 
                        ${sizeClasses[size]} 
                        ${containerClassName}
                    `}
                >
                    <Icon className={`absolute ${iconClassName}`} />
                </Flex>
            </motion.div>
        </a>
    );
};

export default SocialIcon;