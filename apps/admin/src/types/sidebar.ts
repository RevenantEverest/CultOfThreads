import type { LinkProps } from '@tanstack/react-router';
import type { IconType } from 'react-icons';

export interface SidebarMenuItem {
    title: string,
    url: LinkProps["to"],
    icon: IconType,
    subRoutes?: Omit<SidebarMenuItem, "icon">[]
};