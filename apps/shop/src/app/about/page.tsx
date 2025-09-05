import type { Metadata, Viewport } from 'next';

import React from 'react';

import { Layout } from '@@shop/components/Common';
import Newsletter from '@@shop/components/Newsletter';
import { UpcomingEvents } from '@@shop/components/Events';

import { IMAGE_RESOURCES } from '@repo/ui';

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
            <Layout main transparent>
                <UpcomingEvents />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </React.Fragment>
    );
};

export default About;