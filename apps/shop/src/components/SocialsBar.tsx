"use client"

import type { SocialIconSize } from '@repo/ui';

import { FaInstagram, FaFacebookF, FaTiktok, FaEtsy } from 'react-icons/fa6';
import { SOCIAL_LINKS, SocialIcon } from '@repo/ui';

interface SocialsBarProps {
    size?: SocialIconSize
};

function SocialsBar({ size="7xl" }: SocialsBarProps) {

    return(
        <div className="flex gap-10">
            <SocialIcon icon={FaEtsy} tooltip="Etsy" to={SOCIAL_LINKS.ETSY.url} size={size} />
            <SocialIcon icon={FaFacebookF} tooltip="Facebook" to={SOCIAL_LINKS.INSTAGRAM.url} size={size} />
            <SocialIcon icon={FaInstagram} tooltip="Instagram" to={SOCIAL_LINKS.INSTAGRAM.url} size={size} />
            <SocialIcon icon={FaTiktok} tooltip="TikTok" to={SOCIAL_LINKS.TIK_TOK.url} size={size} />
        </div>
    );
};

export default SocialsBar;