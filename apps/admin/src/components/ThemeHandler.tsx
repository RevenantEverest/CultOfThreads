import { ThemeValidator } from '@repo/ui';
import { useThemeStore } from '@@admin/store/theme';

function ThemeHandler() {

    const theme = useThemeStore((state) => state.theme);

    return(
        <ThemeValidator theme={theme} />
    );
};

export default ThemeHandler;