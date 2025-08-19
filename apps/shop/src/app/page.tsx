import React from 'react';
import { Button } from '@repo/ui';
import { PageHeader, Layout } from '@@shop/components/Common';
import { Highlights } from '@@shop/components/Homepage';
import Newsletter from '@@shop/components/Newsletter';

import { IMAGE_RESOURCES } from '@repo/ui';
import Image from 'next/image';

function Home() {
    return (
        <React.Fragment>
            <PageHeader>
                <div className="flex sm:flex-col md:flex-row md:gap-5 items-center justify-center md:px-72 h-[90dvh]">
                    <div className="order-2 md:order-1 md:flex-1 flex flex-col text-center md:text-left items-center md:items-start justify-center">
                        <h1 className="text-4xl md:text-6xl text-text font-bold mb-4">Horror Plushies</h1>
                        <p className="text-md text-text/60 font-semibold mb-5 md:mb-10 w-11/12 md:w-4/6">
                            Where Cuteness Meets the Creeps — Discover handmade horror plushies that blend spooky 
                            vibes with an irresistibly adorable twist. Perfect for collectors, horror fans, and anyone who loves the strange and sweet.
                        </p>
                        <Button size="lg" className="rounded-full text-white bg-secondary">
                            Shop Now
                        </Button>
                    </div>
                    <div className="order-1 md:order-2 md:flex-1 flex items-center justify-center">
                        <Image className="w-full" src={IMAGE_RESOURCES.LOGO_LANDSCAPE} alt="logo" />
                    </div>
                </div>
            </PageHeader>
            <Layout main transparent className="lg:px-96 !pt-4 pb-10 md:pb-0">
                <Highlights />
            </Layout>
            <Newsletter className="w-full bg-card z-20 relative py-20 md:px-56" />
        </React.Fragment>
    );
};

export default Home;
