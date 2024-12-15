import type { Theme } from '@@client/types/theme';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { cute } from '@@client/themes';

interface ThemeState {
    theme: Theme,
    setTheme: (theme: Theme) => void
};

const initialState: Theme = cute;

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: initialState,
            setTheme: (theme: Theme) => set(() => ({ theme }))
        }),
        {
            name: 'theme-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);