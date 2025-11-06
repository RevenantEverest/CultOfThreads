import type { Metadata, Viewport } from 'next';

import { HydrationBoundary } from '@tanstack/react-query';
import { PageHeader, Layout, ScrollToSeeMore } from '@@shop/components/Common';
import { EventList, UpcomingEvents } from '@@shop/components/Events';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';

export const viewport: Viewport = {
    themeColor: "#FB5377"
};

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Cult of Threads | Events",
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

async function Events() {

    return(
        <HydrationBoundary>
            <PageHeader>
                <div className="flex sm:flex-col xl:flex-row xl:gap-5 items-center justify-center lg:px-72 h-[90dvh] relative">
                    <div className="flex-1 flex flex-col text-center xl:text-left items-center xl:items-start justify-center">
                        <h1 className="text-4xl md:text-6xl text-text font-bold mb-4">Upcoming Events</h1>
                        <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-11/12 xl:w-4/6">
                            We love meeting fellow horror fans in person! See our full calendar below to find out where we&apos;ll be next. Come by, 
                            browse our latest plushies, and let&apos;s geek out about all things creepy and cute!
                        </p>
                    </div>
                    <ScrollToSeeMore />
                </div>
            </PageHeader>
            <Layout main transparent className="gap-20">
                <UpcomingEvents isEventsPage amount={1} />
                <div className="text-center flex flex-col">
                    <p className="order-2 md:order-1 mt-5 md:mt-0 text-lg md:text-2xl text-muted mb-2 uppercase font-semibold">Thinking about catching us in person?</p>
                    <h1 className="order-1 md:order-2 text-5xl md:text-6xl font-beach">See Where We&apos;ll Be Next</h1>
                </div>
                <EventList />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 xl:px-56" />
        </HydrationBoundary>
    );
};

export default Events;