"use client"

import { FaInstagram, FaFacebookF, FaTiktok, FaEtsy } from 'react-icons/fa6';
import { SOCIAL_LINKS, SocialIcon } from '@repo/ui';

function SocialsBar() {

    return(
        <div className="flex gap-10">
            <SocialIcon icon={FaEtsy} tooltip="Etsy" to={SOCIAL_LINKS.ETSY.url} size="7xl" />
            <SocialIcon icon={FaFacebookF} tooltip="Facebook" to={SOCIAL_LINKS.INSTAGRAM.url} size="7xl" />
            <SocialIcon icon={FaInstagram} tooltip="Instagram" to={SOCIAL_LINKS.INSTAGRAM.url} size="7xl" />
            <SocialIcon icon={FaTiktok} tooltip="TikTok" to={SOCIAL_LINKS.TIK_TOK.url} size="7xl" />
        </div>
    );
};

export default SocialsBar;