import { type Theme, type ThemeName } from '@repo/ui';

import ThemeIcon from './ThemeIcon';
import MotionHover from '../motion/MotionHover';

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
                <MotionHover 
                    key={`theme-${singleTheme!.name}-${index}`}
                    className="flex gap-5 bg-card lg:bg-transparent rounded-full pr-5 md:pr-0 hover:cursor-pointer"
                    onClick={() => {
                        setTheme(singleTheme as Theme);
                    }}
                >
                    <ThemeIcon 
                        theme={singleTheme as Theme} 
                        currentTheme={currentTheme}
                    />
                    <p className="lg:hidden">{generateDisplayName(singleTheme as Theme)}</p>
                </MotionHover>
            );
        });
    };

    return(
        <div className="flex gap-5 justify-center lg:gap-1 flex-col lg:flex-row">
            {renderThemes()}
        </div>
    );
};

export default ThemeChanger;