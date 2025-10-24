"use client"

import React from 'react';
import Link from 'next/link';

import { Button, GlassSurface, MotionHover, MotionSlideIn, RotatingText, BubbleDivider } from '@repo/ui';
import { Image, Sparkle } from '@@shop/components/Common';

import { useBreakpoints } from '@repo/ui/hooks';

import { IMAGE_RESOURCES } from '@repo/ui';
import { useThemeStore } from '@@shop/store/theme';

function Jumbotron() {

    const theme = useThemeStore((state) => state.theme);
    const breakpoint = useBreakpoints();

    if(!breakpoint) {
        return;
    }

    const glassSurfaceProps = {
        width: 150,
        height: 40,
        borderRadius: 24,
        displace: 0,
        distortionScale: -150,
        redOffset: 5,
        greenOffset: 15,
        blueOffset: 25,
        brightness: 60,
        opacity: 0.5
    };

    const renderContentLeft = () => (
        <div className="flex flex-col gap-5 justify-center items-center lg:items-start text-center lg:text-start w-full">
            <GlassSurface 
                className=""
                {...glassSurfaceProps}
            >
                <p className="text-sm md:text-md font-semibold">Cult Of Threads</p>
            </GlassSurface>
            <div className="flex flex-col gap-4 lg:gap-5 text-4xl md:text-6xl font-bold px-5 md:px-0 text-text">
                <h1>Discover Our</h1>
                <div className="flex w-full gap-2 lg:gap-5 items-center">
                    <RotatingText
                        texts={["Handmade", "Horror", "Cute", "Crochet"]}
                        mainClassName={`
                            px-2 sm:px-2 md:px-3 bg-gradient-to-br from-primary to-accent text-card overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg
                        `}
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={3000}
                    />
                    <h1>
                        Plushies
                    </h1>
                </div>
            </div>
            <div className="w-90 md:w-120 xl:w-8/12 mb-4 px-3 md:px-0 text-sm md:text-md lg:text-lg">
                <p className="font-bold text-text/50">
                    Welcome to Cult of Threads! We make unique crochet plushies that are creepy, cute, and full of personality. 
                    If you&apos;re into horror or just love things that are a little weird, you&apos;ve found your people.
                </p>
            </div>
            <div className="flex gap-2 lg:gap-3">
                <Link href="/shop">
                    <Button className="rounded-full text-lg font-semibold lg:text-lg px-10 py-5 lg:px-10 lg:py-6">
                        Shop
                    </Button>
                </Link>
                <Link href="/events">
                    <MotionHover>
                        <GlassSurface
                            className="rounded-full text-lg font-semibold lg:text-lg px-10 py-5 lg:px-10 lg:py-6"
                            {...glassSurfaceProps}
                        >
                            Events
                        </GlassSurface>
                    </MotionHover>
                </Link>
            </div>
        </div>
    );

    const renderContentRight = () => (
        <div className="md:flex-1 flex items-center justify-center">
            <div className="w-60 h-50 md:w-80 md:h-70 lg:w-100 lg:h-90 xl:w-140 xl:h-120 flex overflow-hidden">
                <Image 
                    width={800} 
                    height={800} 
                    className="shrink-0 relative object-cover w-full h-full rounded-lg" 
                    src={IMAGE_RESOURCES.LOGO_LANDSCAPE} 
                    alt="logo"
                />
            </div>
        </div>
    );

    return(
        <div className="relative h-screen w-screen bg-primary">
            <div className="absolute z-10 h-screen top-0 w-screen bg-gradient-to-br from-card/80 to-card-light/60">
                <Sparkle
                    count={200}
                    minSize={5}
                    maxSize={15}
                    fadeOutSpeed={0.5}
                    flickerSpeed="slowest"
                    overflowPx={200}
                />
            </div>
            <div
                className={`
                    absolute z-10 h-11/12 top-0 w-screen px-10 lg:px-30 xl:px-56
                    flex flex-col lg:flex-row gap-5 md:gap-0 items-center justify-center 
                `}
            >
                <MotionSlideIn
                    key={"hero-left"}
                    className="flex lg:flex-1 order-2 lg:order-1"
                    fadeDelay={0.5}
                    posXDelay={0.5}
                    posXInitial={breakpoint === "SM" ? "-100dvw" : "-100%"}
                >
                    {renderContentLeft()}
                </MotionSlideIn>
                <MotionSlideIn
                    key={"hero-right"}
                    className="flex order-1 lg:order-2 md:hidden lg:flex"
                    fadeDelay={1}
                    posXDelay={1}
                    posXInitial={"100%"}
                >
                    {renderContentRight()}
                </MotionSlideIn>
            </div>
            <div className="absolute w-full bottom-0">
                <BubbleDivider bgColor={theme.colors.background} className="z-30 h-27 w-full relative" />
            </div>
        </div>
    );
};

export default Jumbotron;