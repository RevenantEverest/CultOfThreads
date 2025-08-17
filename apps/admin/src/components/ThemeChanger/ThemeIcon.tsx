import type { Theme } from '@repo/ui';

import React from 'react';
import { 
    Tooltip, 
    TooltipContent, 
    TooltipProvider, 
    TooltipTrigger 
} from '@repo/ui';

export interface ThemeIconProps extends React.HTMLProps<HTMLDivElement> {
    theme: Theme,
    currentTheme: Theme
};

function ThemeIcon({ theme, currentTheme, onClick }: ThemeIconProps) {

    const isCurrentTheme = theme.name === currentTheme.name;

    const generateDisplayName = (): string => {
        const words = theme.name.split(" ");

        for(let i = 0; i < words.length; i++) {
            const current = words[i];
            words[i] = current.charAt(0).toUpperCase() + current.substring(1);
        };

        return words.join(" ");
    };

    return(
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <div 
                        onClick={onClick} 
                        className={`
                            rounded-full hover:cursor-pointer 
                            ${isCurrentTheme ? "border-2 border-secondary" : "border-2 border-gray-600"}
                        `}
                    >
                        <div
                            className="h-6 w-6 rounded-full" 
                            style={{ 
                                background: theme.colors.background 
                            }}
                        />                            
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-semibold">{generateDisplayName()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default ThemeIcon;