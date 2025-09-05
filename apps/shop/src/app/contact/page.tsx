import type { Metadata, Viewport } from 'next';

import React from 'react';
import { PageHeader, Layout } from '@@shop/components/Common';
import { FaEnvelope } from 'react-icons/fa6';

import { ContactContainer } from '@@shop/containers';
import { FAQ } from '@@shop/components/FAQ';
import Newsletter from '@@shop/components/Newsletter';
import SocialsBar from '@@shop/components/SocialsBar';

import { IMAGE_RESOURCES } from '@repo/ui';

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cult of Threads | Contact",
        description: `
            Discover unique handmade crochet goods and creepy plush horror characters. Explore our collection for quirky gifts, spooky décor, and one-of-a-kind creations
        `,
        openGraph: {
            siteName: "Cult of Threads | Handmade Crochet Plushies",
            images: IMAGE_RESOURCES.OPEN_GRAPH
        },
        twitter: {
            images: IMAGE_RESOURCES.TWITTER_META
        }
    };
};

function Contact() {

    return(
        <React.Fragment>
            <PageHeader>
                <div 
                    className={`
                        flex flex-col md:gap-5 items-center justify-center md:px-72 h-[90dvh]
                        text-secondary/80 font-bold
                    `}
                >
                        <FaEnvelope className="text-8xl" />
                        <h1 className="text-4xl md:text-8xl uppercase">Contact</h1>
                </div>
            </PageHeader>
            <Layout main transparent className="gap-50 mb-40">
                <div className="flex flex-col w-full items-center justify-center gap-10">
                    <h1 className="text-5xl font-bold font-beach">Contact Us</h1>
                    <ContactContainer />
                </div>
                <SocialsBar />
                <div className="bg-accent/50 rounded-full h-1 w-full" />
                <FAQ />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </React.Fragment>
    );
};

export default Contact;