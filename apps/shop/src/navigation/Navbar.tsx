"use client"

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useThemeStore } from '@@shop/store/theme';
import { useScrollPosition } from '@repo/ui/hooks';

import { FaBars } from 'react-icons/fa6';
import { ThemeChanger } from '@repo/ui';
import { Image } from '@@shop/components/Common';
import MobileNavbar from './MobileNavbar';

import { IMAGE_RESOURCES } from '@repo/ui';
import _Routes from './_Routes';

function Navbar() {

    const currentPathname = usePathname();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const scrollPosition = useScrollPosition();

    const [solidBackground, setSolidBackground] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const solidPos = {
            home: 550,
            other: 400
        };

        if(isMobileOpen) {
            return;
        }

        if(currentPathname === "/") {
            if(scrollPosition > solidPos.home) {
                setSolidBackground(true);
            }

            if(scrollPosition < solidPos.home) {
                setSolidBackground(false);
            }
        }
        else {
            if(scrollPosition > solidPos.other) {
                setSolidBackground(true);
            }

            if(scrollPosition < solidPos.other) {
                setSolidBackground(false);
            }
        }
    }, [scrollPosition, currentPathname, isMobileOpen]);

    useEffect(() => {
        setSolidBackground(isMobileOpen);
    }, [isMobileOpen]);

    const renderRoutes = () => {
        return _Routes.map((route, index) => {
            const isActiveLink = currentPathname.split("/")[1] === route.pathname.split("/")[1];

            return(
                <Link 
                    href={route.pathname}
                    key={`navbar-route-${route.title}-${index}`} 
                    className={`
                        hover:bg-primary hover:cursor-pointer w-20 rounded-md text-center py-1 duration-300
                        ${isActiveLink && " bg-primary"}
                    `}
                >
                    <p className="font-semibold">
                        {route.title}
                    </p>
                </Link>
            );
        });
    };

    return(
        <div className="w-full fixed z-50">
            <div className="flex items-center justify-center">
                <AnimatePresence mode="wait">
                {
                    solidBackground &&
                    <motion.div 
                        className="fixed w-[140vw] top-0 left-0"
                        initial={{ skew: -50, x: "120vw" }}
                        animate={{ 
                            skew: 0, 
                            x: "-20vw",
                            transition: { duration: .3 } 
                        }}
                        exit={{
                            skew: 50,
                            x: "120vw",
                            transition: { duration: .3 }
                        }}
                    >
                        <div className="h-full w-full bg-background absolute py-11 z-40" />
                    </motion.div>
                }
                </AnimatePresence>
                <div className="flex items-center justify-center py-4 w-11/12 xl:w-8/12 z-10">
                    <Link href="/" className="flex-1 flex justify-start items-center gap-1">
                        <Image className="!relative !w-10 mr-1" fill src={IMAGE_RESOURCES.LOGO_CIRCLE} alt="logo" />
                        <h1 className="font-bold text-lg">Cult of Threads</h1>
                    </Link>
                    <div className="flex-1 hidden md:flex gap-2 items-center justify-center">
                        {renderRoutes()}
                    </div>
                    <div className="flex-1 hidden md:flex items-center justify-end gap-5">
                        <ThemeChanger currentTheme={theme} setTheme={setTheme} />
                    </div>
                    <div className="md:flex-1 flex items-center justify-end md:hidden">
                        <div className="ml-4 mr-4 flex md:hidden justify-center content-center items-center" onClick={() => setIsMobileOpen(!isMobileOpen)}>
                            <FaBars className="text-2xl text-text" />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence key="navbar-ap" mode="wait">
                {
                    isMobileOpen && 
                    <MobileNavbar 
                        isOpen={isMobileOpen} 
                        setIsOpen={setIsMobileOpen}
                    />
                }
            </AnimatePresence>
        </div>
    );
};

export default Navbar;