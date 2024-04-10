import type { RootState } from '@@store/index';
import type { SocialBrand } from '@@components/Common/SocialIcon';
import type { SocialLink } from '@@types/socialLinks';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Flex, Box } from 'reflexbox';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Sparkle from 'react-sparkle';

import { Layout, Card, SocialIcon } from '@@components/Common';

import { IMAGE_RESOURCES, SOCIAL_LINKS } from '@@constants';

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

            return(
                <a href={socialInfo[brand].url} target="_blank" rel="noopener noreferrer" key={`${index}-social-card-${key}`}>
                    <motion.div
                        key={`${index}-social-card-${key}-motion`}
                        className="hover:cursor-pointer"
                        whileHover={{
                            y: "-0.5vh"
                        }}
                    >
                        <Card>
                            <Flex className="items-center gap-4">
                                <Box>
                                    <SocialIcon gradient brand={brand} size="lg" />
                                </Box>
                                <Box className="flex items-center gap-2">
                                    <p className="font-bold text-background text-2xl">{brand}</p>
                                    <p className="font-semibold text-background text-xl mt-[.15rem]">{socialInfo[brand].handle}</p>
                                </Box>
                            </Flex>
                        </Card>
                    </motion.div>
                </a>
            );
        });
    };

    return(
        <Layout main className="bg-gradient-to-br from-background to-card lg:px-96 !pt-4 justify-center">
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
                    <img src={IMAGE_RESOURCES.LOGO_CIRCLE} className="w-full md:w-4/6 lg:w-2/6 self-center pb-10" alt="logo" />
                    {renderSocialCards()}
                </Card>
            </Box>
        </Layout>
    );
};