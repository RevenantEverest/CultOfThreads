import { ThemeChanger } from '@repo/ui';
import { useThemeStore } from '@@admin/store/theme';
import { SidebarTrigger, useSidebar } from '@repo/ui';
import { useIsMobile } from '@repo/ui/hooks';

function Navbar() {

    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const { open } = useSidebar(); // true = expanded, false = collapsed
    const isMobile = useIsMobile();

    const sidebarWidth = isMobile ? "0rem" : (open ? "16rem" : "3rem"); // adjust to your widths

    return(
        <div 
            className="fixed top-0 z-30 bg-card py-4 border-b-1 border-muted transition-all duration-300 ease-in-out"
            style={{
                left: sidebarWidth, // start after the sidebar
                width: `calc(100% - ${sidebarWidth})`, // fill the rest
            }}
        >
            <div className="flex">
                <div className="flex gap-2 pl-3">
                    <SidebarTrigger className="hover:bg-muted" />
                    <span className="text-muted">&#124;</span>
                    <p className="font-semibold">Admin Panel</p>
                </div>
                <div className="flex-1 justify-end pr-3 hidden md:flex">
                    <ThemeChanger currentTheme={theme} setTheme={setTheme} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;