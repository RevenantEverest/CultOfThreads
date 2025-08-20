import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

import AppSidebar from '@@admin/navigation/AppSidebar';
import Navbar from '@@admin/navigation/Navbar';

export const Route = createFileRoute('/dashboard')({
    component: DashboardLayout,
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