import type { 
    Theme, 
    MappedTheme, 
    MappedThemeKeys, 
    ThemeColors
} from '../types/theme';

export function applyTheme(theme: Theme) {
    const mappedTheme: MappedTheme = mapTheme(theme.colors);
    
    const root = document.documentElement;

    Object.keys(mappedTheme).forEach((property) => {
        root.style.setProperty(property, mappedTheme[property as MappedThemeKeys]);
    });
};

export function mapTheme(colors: ThemeColors): MappedTheme {
    return {
        "--color-primary": colors.primary,
        "--color-secondary": colors.secondary,
        "--color-accent": colors.accent,
        
        "--color-text": colors.text,
        "--color-muted": colors.muted,
        
        "--color-card": colors.card,
        "--color-card-light": colors.cardLight,

        "--background": colors.background,
    };
};