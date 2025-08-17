"use client"

import type { Theme } from '../../types/theme';

import { useEffect, useCallback } from 'react';
import { theme as themeUtils } from '../../utils';

interface ThemeValidatorProps {
    theme: Theme
};

function ThemeValidator({ theme }: ThemeValidatorProps) {

    const validateTheme = useCallback(() => {
        themeUtils.applyTheme(theme);
    }, [theme])
    
    useEffect(() => {
        validateTheme();
    }, [validateTheme, theme]);

    return null;
};

export default ThemeValidator;