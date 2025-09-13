import type { SidebarMenuItem as SidebarMenuItemType } from '@@admin/types/sidebar';

import { Link } from '@tanstack/react-router';
import { 
    SidebarMenuButton,
    SidebarMenuItem
} from '@repo/ui';

function GroupItem({ title, url, icon }: SidebarMenuItemType) {

    const Icon = icon;

    return(
        <SidebarMenuItem key={title} className="hover:bg-card-light rounded-xl duration-150">
            <SidebarMenuButton asChild>
                <Link to={url}>
                    <Icon />
                    <span className="font-semibold">{title}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};

export default GroupItem;