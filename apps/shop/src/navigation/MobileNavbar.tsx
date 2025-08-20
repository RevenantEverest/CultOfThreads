import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useThemeStore } from '@@shop/store/theme';

import { ThemeChanger } from '@repo/ui';
import _Routes from './_Routes';

interface MobileNavbarProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

function MobileNavbar({ isOpen, setIsOpen }: MobileNavbarProps) {

    const currentPathname = usePathname();
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const { initial, animate, exit, transition } = {
        initial: { y: "-100vh" },
        animate: { y: 0 },
        exit: { y: "-100vh" },
        transition: { duration: .3 }
    };

    const renderRoutes = () => {
        return _Routes.map((route, index) => {
            const isActiveLink = currentPathname.split("/")[1] === route.pathname.split("/")[1];

            return(
                <div
                    className={`py-2 px-2 rounded-xl w-full text-center ${isActiveLink && " bg-primary/80 text-text"}`}
                    key={`mobile-navbar-route-${route.title}-${index}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Link 
                        href={route.pathname}
                        className={`
                            hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-lg 
                        `}
                    >
                        <p className={`font-semibold`}>
                            {route.title}
                        </p>
                    </Link>
                </div>
            );
        });
    };

    return(
        <motion.div 
            key="mobile-nav" 
            className="z-0 absolute bg-background w-screen h-screen" 
            initial={initial} 
            animate={animate} 
            exit={exit} 
            transition={transition}
        >
            <div className="flex flex-col px-5 mt-10 items-center justify-center">
                {renderRoutes()}
            </div>
            <div className="flex flex-col gap-6 w-3/6 pl-5 pt-10">
                <p className="font-semibold">Themes:</p>
                <ThemeChanger currentTheme={theme} setTheme={setTheme} />
            </div>
        </motion.div>
    );
};

export default MobileNavbar;