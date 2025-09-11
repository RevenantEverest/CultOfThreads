import type { SidebarMenuItem as SidebarMenuItemType } from '@@admin/types/sidebar';

import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@repo/ui';
import GroupItem from '../GroupItem';

import { FaTachometerAlt } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa6';
import SubGroupItem from '../SubGroupItem';

// Menu items.
const items: SidebarMenuItemType[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: FaTachometerAlt,
    },
    {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: FaChartLine,
        subRoutes: [
            {
                title: "Overview",
                url: "/dashboard/analytics"
            },
            {
                title: "Traffic",
                url: "/dashboard/analytics/traffic",
            }
        ]
    }
]

function OverviewGroup() {

    const renderMenu = () => {
        return items.map((item) => {
            if(!item.subRoutes) {
                return(<GroupItem key={item.title} {...item} />);
            }

            return(<SubGroupItem key={item.title} {...item} />);
        });
    };

    return(
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted">Overview</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenu()}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default OverviewGroup;