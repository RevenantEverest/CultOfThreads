import type { RootState } from '@@client/store/index';

import React, { useEffect, useCallback } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import { ENV } from '@@client/constants';
import { theme as themeUtils } from '@@client/utils';

export const Route = createRootRoute({
    component: Root
});

function Root() {

    const theme = useSelector((state: RootState) => state.theme);

    const validateTheme = useCallback(() => {
        themeUtils.applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        validateTheme();
    }, [validateTheme, theme]);

    return(
        <React.Fragment>
            <Outlet />
            <Toaster 
                position="top-right"
                toastOptions={{
                    style: {
                        border: "none",
                        background: "transparent",
                        boxShadow: "none",
                        maxWidth: "98%"
                    }
                }}    
            />
            {
                ENV.NODE_ENV !== "production" && 
                <TanStackRouterDevtools />
            }
        </React.Fragment>
    );
};