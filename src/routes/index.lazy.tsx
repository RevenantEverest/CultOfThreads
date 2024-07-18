import type { RootState } from '@@store/index';
import type { SocialBrand } from '@@components/Common/SocialIcon';
import type { SocialLink } from '@@types/socialLinks';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Box } from 'reflexbox';
import { useSelector } from 'react-redux';
import Sparkle from 'react-sparkle';

import { FaEnvelope } from 'react-icons/fa6';

import { Layout, Card, SocialIcon, RoundedIcon } from '@@components/Common';
import { LinkTreeElement } from '@@components/LinkTree';

import { IMAGE_RESOURCES, SOCIAL_LINKS, URLS } from '@@constants';

export const Route = createLazyFileRoute('/')({
    component: Index
});

function Index() {

    const theme = useSelector((state: RootState) => state.theme);

    const socialInfo: Record<SocialBrand, SocialLink> = {
        "Instagram": SOCIAL_LINKS.INSTAGRAM,
        "TikTok": SOCIAL_LINKS.TIK_TOK,
        "Etsy": SOCIAL_LINKS.ETSY
    };

    const renderSocialCards = () => {
        return Object.keys(socialInfo).map((key, index) => {
            
            const brand = key as SocialBrand;
            const handle = socialInfo[brand].handle;
            const url = socialInfo[brand].url;
            const icon = (
                <SocialIcon 
                    containerClassName="md:!p-7 md:!text-3xl"
                    gradient 
                    withLink={false} 
                    brand={brand} 
                    size="md"
                />);

            return(
                <LinkTreeElement
                    key={`${index}-social-card-${key}`}
                    index={index}
                    title={brand}
                    subtitle={handle}
                    url={url}
                    icon={icon}
                />
            );
        });
    };

    return(
        <Layout main className="bg-gradient-to-br from-background to-card lg:px-96 !pt-4 justify-center pb-10 md:pb-0">
            <div className="w-[100vw] h-[100vh] fixed">
                <Sparkle
                    color={theme.colors.cardLight}
                    count={100}
                    minSize={5}
                    maxSize={15}
                    fadeOutSpeed={2}
                />
            </div>
            <Box className="z-10">
                <Card className="flex items-center justify-center bg-card-light">
                    <img src={IMAGE_RESOURCES.LOGO_CIRCLE} className="w-4/6 md:w-4/6 lg:w-2/6 self-center pb-10" alt="logo" />
                    {renderSocialCards()}
                    <LinkTreeElement
                        title="Email" 
                        subtitle={URLS.BUSINESS_EMAIL}
                        copyContent={URLS.BUSINESS_EMAIL}
                        icon={(
                            <RoundedIcon 
                                gradient
                                containerClassName="md:!p-7 md:!text-3xl"
                                icon={FaEnvelope} 
                                size="md"
                            />
                        )}
                    />
                </Card>
            </Box>
        </Layout>
    );
};