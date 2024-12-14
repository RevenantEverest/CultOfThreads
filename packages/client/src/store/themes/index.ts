import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Theme } from '@@client/types/theme';

import { cute } from '@@client/themes';

const initialState: Theme = cute;

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state = action.payload;
            return state;
        }
    }
});

export const { actions } = themeSlice;