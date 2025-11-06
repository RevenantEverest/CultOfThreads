import type { Metadata, Viewport } from 'next';

import React from 'react';

import { Layout } from '@@shop/components/Common';
import { FAQ } from '@@shop/components/FAQ';
import { UpcomingEvents } from '@@shop/components/Events';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';
import { BestSellers, NewArrivals } from '@@shop/components/Products';
import Jumbotron from '@@shop/components/Jumbotron';

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cult of Threads",
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

function Home() {
    return (
        <React.Fragment>
            <Jumbotron />                
            <Layout main transparent className="!pt-40 pb-10 md:pb-20 gap-50 md:gap-20">
                <div className="flex flex-col gap-30">
                    <NewArrivals />
                    <BestSellers />
                </div>
                <UpcomingEvents />
                <FAQ className="md:!w-10/12" />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 lg:px-56" />
        </React.Fragment>
    );
};

export default Home;
