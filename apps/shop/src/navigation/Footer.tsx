"use client"

import { FaEtsy, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa6';

import { useThemeStore } from '@@shop/store/theme';

import { SocialIcon, WaveDivider } from '@repo/ui';
import { FooterRoutes } from '@@shop/components/Navigation';

import { SOCIAL_LINKS, IMAGE_RESOURCES } from '@repo/ui';
import Image from 'next/image';

export interface FooterMenu {
    title: string,
    url: string
};

const FOOTER_MENU: FooterMenu[] = [
    {
        title: 'Privacy Policy',
        url: '/policies/privacy-policy'
    },
    {
        title: 'Refund Policy',
        url: '/policies/refund-policy'
    },
    {
        title: 'Shipping Policy',
        url: '/policies/shipping-policy'
    },
    {
        title: 'Terms of Service',
        url: '/policies/terms-of-service'
    },
];

function Footer() {

    const theme = useThemeStore((state) => state.theme);

    return (
        <div className="relative z-20">
            <footer className="bg-card-light py-10 flex flex-col gap-10 items-center justify-center">
                <WaveDivider className="absolute z-40 w-full -top-10" bgColor={theme.colors.card} />
                <div className="flex flex-col md:flex-row items-center justify-center md:w-6/12 pb-10 gap-20 md:gap-0">
                    <div className="flex-1 flex justify-center md:justify-start">
                        <Image className="!relative !w-9/12 md:!w-5/12" fill src={IMAGE_RESOURCES.LOGO_CIRCLE} alt="cult of threads logo" />
                    </div>
                    <div className="flex flex-1 flex-col gap-6 items-center md:items-end -mt-1">
                        <h1 className="font-bold text-2xl text-center md:text-left">Grow With Us</h1>
                        <div className="flex justify-center md:justify-end gap-6 w-full">
                            <SocialIcon icon={FaEtsy} tooltip="Etsy" to={SOCIAL_LINKS.ETSY.url} size="3xl" />
                            <SocialIcon icon={FaFacebookF} tooltip="Facebook" to={SOCIAL_LINKS.INSTAGRAM.url} size="3xl" />
                            <SocialIcon icon={FaInstagram} tooltip="Instagram" to={SOCIAL_LINKS.INSTAGRAM.url} size="3xl" />
                            <SocialIcon icon={FaTiktok} tooltip="TikTok" to={SOCIAL_LINKS.TIK_TOK.url} size="3xl" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10 text-xs font-semibold">
                    <p className="order-2 md:order-1 text-center md:text-left">Copyright © {new Date().getFullYear()} Cult of Threads</p>
                    <div className="order-1 md:order-2">
                        <FooterRoutes menu={FOOTER_MENU} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;




