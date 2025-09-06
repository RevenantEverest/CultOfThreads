import type { Metadata, Viewport } from 'next';

import React from 'react';

import { Layout } from '@@shop/components/Common';
import { UpcomingEvents } from '@@shop/components/Events';
import { AboutMe } from '@@shop/components/About';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';
import { FAQ } from '@@shop/components/FAQ';

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cult of Threads | About",
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

function About() {

    return(
        <React.Fragment>
            <div className="px-5 md:px-20 pt-40">
                <AboutMe />
            </div>
            <Layout main transparent className="gap-40">
                <FAQ />
                <UpcomingEvents />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </React.Fragment>
    );
};

export default About;