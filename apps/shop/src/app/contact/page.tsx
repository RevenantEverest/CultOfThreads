import type { Metadata, Viewport } from 'next';

import React from 'react';
import { Layout } from '@@shop/components/Common';

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
            <Layout main transparent className="gap-50 mb-40 pt-40">
                <div className="flex flex-col w-full items-center justify-center gap-10">
                    <h1 className="text-5xl font-bold font-beach">Contact Us</h1>
                    <ContactContainer />
                </div>
                <SocialsBar />
                <div className="bg-accent/50 rounded-full h-1 w-full" />
                <FAQ />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 xl:px-56" />
        </React.Fragment>
    );
};

export default Contact;