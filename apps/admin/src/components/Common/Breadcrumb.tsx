import type { LinkProps } from '@tanstack/react-router';

import { Link } from '@tanstack/react-router';
import {
    Breadcrumb as UIBreadcrumb,
    BreadcrumbList as UIBreadcrumbList,
    BreadcrumbItem as UIBreadcrumbItem,
    BreadcrumbLink as UIBreadcrumbLink,
    BreadcrumbSeparator as UIBreadcrumbSeparator,
    BreadcrumbPage as UIBreadcrumbPage
} from '@repo/ui';
import React from 'react';

interface BreadcrumbRoute {
    title: string,
    path: LinkProps["to"]
};

interface BreadcrumbProps {
    routes: BreadcrumbRoute[]
};

function Breadcrumb({ routes }: BreadcrumbProps) {

    const renderRoutes = () => {
        return routes.map((route, index) => {
            const key = `breadcrumb-${route.title}-${index}`;

            if(index === (routes.length - 1)) {
                return(
                    <UIBreadcrumbItem key={key}>
                        <UIBreadcrumbPage className="text-primary">{route.title}</UIBreadcrumbPage>
                    </UIBreadcrumbItem>
                );
            }

            return(
                <React.Fragment key={key}>
                    <UIBreadcrumbItem>
                        <UIBreadcrumbLink asChild className="text-muted">
                            <Link to={route.path}>
                                {route.title}
                            </Link>
                        </UIBreadcrumbLink>
                    </UIBreadcrumbItem>
                    <UIBreadcrumbSeparator className="text-text" />
                </React.Fragment>
            );
        });
    };

    return(
        <UIBreadcrumb>
            <UIBreadcrumbList>
                {renderRoutes()}
            </UIBreadcrumbList>
        </UIBreadcrumb>
    );
};

export default Breadcrumb;