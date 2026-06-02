import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { auth } from '@@admin/utils';

import AppSidebar from '@@admin/navigation/AppSidebar';
import Navbar from '@@admin/navigation/Navbar';

export const Route = createFileRoute('/dashboard')({
    component: DashboardLayout,
    beforeLoad: auth.authGuard
})

function DashboardLayout() {

    return(
        <React.Fragment>
                <AppSidebar />
                <main className="bg-background w-full pt-10 text-text">
                    <Navbar />
                    <Outlet />
                </main>
        </React.Fragment>
    );
};