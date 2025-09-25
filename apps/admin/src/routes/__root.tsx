import React from 'react';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';
import { SidebarProvider } from '@repo/ui';

import AuthValidator from '@@admin/components/Auth/AuthValidator';
import ThemeHandler from '@@admin/components/ThemeHandler';

import { ENV } from '@@admin/constants';

export interface RouteContext {
    queryClient: QueryClient
};

export const Route = createRootRouteWithContext<RouteContext>()({
    component: Root
});

function Root() {

    return(
        <React.Fragment>
            <SidebarProvider defaultOpen={true}>
                <Outlet />
            </SidebarProvider>
            <AuthValidator />
            <ThemeHandler />
            <Toaster 
                position="top-center"
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
                (ENV.SHOW_ROUTER_DEV_TOOLS && process.env.NODE_ENV !== "production") && 
                <TanStackRouterDevtools />
            }
        </React.Fragment>
    );
};