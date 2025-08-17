import type { Theme, ThemeName } from '@repo/ui';

import ThemeIcon from './ThemeIcon';

import * as themes from '../../themes';

export interface ThemeChangerProps {
    currentTheme: Theme,
    setTheme: (theme: Theme) => void
};

function ThemeChanger({ currentTheme, setTheme }: ThemeChangerProps) {

    const allThemes: Record<ThemeName, Theme> = themes;

    const generateDisplayName = (t: Theme): string => {
        const words = t.name.split(" ");

        for(let i = 0; i < words.length; i++) {
            const current = words[i];
            words[i] = current!.charAt(0).toUpperCase() + current!.substring(1);
        };

        return words.join(" ");
    };

    const renderThemes = () => {
        return Object.keys(allThemes).map((key: string, index: number) => {
            const singleTheme = allThemes[key as ThemeName];
            return(
                <div 
                    key={`theme-${singleTheme!.name}-${index}`}
                    className="flex gap-5 bg-card md:bg-transparent rounded-full pr-5 md:pr-0" 
                >
                    <ThemeIcon 
                        theme={singleTheme as Theme} 
                        currentTheme={currentTheme}
                        onClick={() => {
                            setTheme(singleTheme as Theme);
                        }}
                    />
                    <p className="md:hidden">{generateDisplayName(singleTheme as Theme)}</p>
                </div>
            );
        });
    };

    return(
        <div className="flex gap-5 justify-center md:gap-1 flex-col md:flex-row">
            {renderThemes()}
        </div>
    );
};

export default ThemeChanger;