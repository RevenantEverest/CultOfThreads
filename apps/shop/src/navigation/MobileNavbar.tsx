import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useThemeStore } from '@@shop/store/theme';

import ThemeChanger from '@@shop/components/ThemeChanger/ThemeChanger';
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
            const title = route.pathname.split("/")[1];
            const isActiveLink = title === currentPathname.split("/")[1];

            return(
                <div
                    className={`py-4`}
                    key={`mobile-navbar-route-${title}-${index}`} 
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Link 
                        href={route.pathname}
                        className={`
                            hover:bg-secondary/10 hover:cursor-pointer w-20 rounded-md text-lg 
                            
                        `}
                    >
                        <p className={`font-semibold`}>
                            {
                                title === "" ? "Home" :
                                title.charAt(0).toUpperCase() + title.slice(1)
                            }
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
            <div className="flex flex-col px-5 mt-10">
                {renderRoutes()}
            </div>
            <div className="flex flex-col gap-6 w-3/6 pl-5 pt-10">
                <p className="font-semibold">Themes:</p>
                <ThemeChanger theme={theme} setTheme={setTheme} />
            </div>
        </motion.div>
    );
};

export default MobileNavbar;