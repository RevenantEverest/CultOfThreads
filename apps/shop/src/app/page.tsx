import type { Metadata, Viewport } from 'next';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@repo/ui';
import { PageHeader, Layout, ScrollToSeeMore } from '@@shop/components/Common';
import { FAQ } from '@@shop/components/FAQ';
import { UpcomingEvents } from '@@shop/components/Events';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';
import { BestSellers, NewArrivals } from '@@shop/components/Products';

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
            <PageHeader>
                <div className="flex flex-col md:flex-row md:gap-5 items-center justify-center md:px-72 h-[90dvh] relative -top-5">
                    <div className="order-2 md:order-1 md:flex-1 flex flex-col text-center md:text-left items-center md:items-start justify-center">
                        <h1 className="text-3xl md:text-6xl text-text font-bold mb-4 px-5 md:px-0">
                            Handmade Crochet <span className="bg-gradient-to-tr from-primary to-accent bg-clip-text text-transparent">Horror</span> Plushies
                        </h1>
                        <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-10/12 md:w-5/6">
                            Welcome to Cult of Threads! We make unique crochet plushies that are creepy, cute, and full of personality. 
                            If you&apos;re into horror or just love things that are a little weird, you&apos;ve found your people.
                        </p>
                        <Link href="/shop">
                            <Button size="xl" className="rounded-full text-white bg-primary">
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                    <div className="order-1 md:order-2 md:flex-1 flex items-center justify-center">
                        <div className="w-60 h-50 lg:w-140 lg:h-120 flex overflow-hidden">
                            <Image 
                                width={800} 
                                height={800} 
                                className="shrink-0 relative object-cover w-full h-full rounded-lg" 
                                src={IMAGE_RESOURCES.LOGO_LANDSCAPE} 
                                alt="logo"
                            />
                        </div>
                    </div>
                    <ScrollToSeeMore className="hidden md:block" />
                </div>
            </PageHeader>
            <Layout main transparent className="!pt-4 pb-10 md:pb-20 gap-50 md:gap-20">
                <div className="flex flex-col gap-30">
                    <NewArrivals />
                    <BestSellers />
                </div>
                <UpcomingEvents />
                <FAQ className="md:!w-10/12" />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </React.Fragment>
    );
};

export default Home;
