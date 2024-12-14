import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { 
    persistReducer, 
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeSlice } from './themes';

const rootReducer = combineReducers({
    [themeSlice.name]: themeSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                /* https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist */
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
            thunk: {
                extraArgument: {
                    
                }
            }
        })
    )
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;