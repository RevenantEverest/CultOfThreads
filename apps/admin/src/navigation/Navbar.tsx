import ThemeChanger from '@@admin/components/ThemeChanger/ThemeChanger';
import { useThemeStore } from '@@admin/store/theme';
import { SidebarTrigger } from '@repo/ui';

function Navbar() {

    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    return(
        <div className="fixed top-0 z-30 bg-card py-4 border-b-1 border-muted w-[86%]">
            <div className="flex">
                <div className="flex gap-2 pl-3">
                    <SidebarTrigger className="hover:bg-muted" />
                    <span className="text-muted">&#124;</span>
                    <p className="font-semibold">Admin Panel</p>
                </div>
                <div className="flex-1 flex justify-end pr-3">
                    <ThemeChanger theme={theme} setTheme={setTheme} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;