import type { IconType } from 'react-icons';
import { Link } from '@tanstack/react-router';
import { 
    SidebarMenuButton,
    SidebarMenuItem
} from '@repo/ui';

interface GroupItemProps {
    title: string,
    url: string,
    icon: IconType
};

function GroupItem({ title, url, icon }: GroupItemProps) {

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