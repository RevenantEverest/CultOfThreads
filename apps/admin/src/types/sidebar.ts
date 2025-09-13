import type { LinkProps } from '@tanstack/react-router';
import type { IconType } from 'react-icons';

export interface SidebarGroupItem {
    title: string,
    url: LinkProps["to"],
    icon: IconType,
    subRoutes?: Omit<SidebarGroupItem, "icon">[]
};