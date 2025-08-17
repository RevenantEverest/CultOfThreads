import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@repo/ui';
import GroupItem from '../GroupItem';

import { FaTachometerAlt } from 'react-icons/fa';
import { FaChartLine } from 'react-icons/fa6';

// Menu items.
const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: FaTachometerAlt,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: FaChartLine,
    }
]

function OverviewGroup() {

    const renderMenu = () => {
        return items.map((item) => (
            <GroupItem key={item.title} {...item} />
        ));
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