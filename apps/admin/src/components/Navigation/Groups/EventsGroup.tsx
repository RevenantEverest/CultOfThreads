import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from '@repo/ui';

import GroupItem from '../GroupItem';

import { FaCalendarAlt } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa6';

const items = [
    {
      title: "Markets",
      url: "/dashboard/markets",
      icon: FaStore,
    },
    {
      title: "Events",
      url: "/dashboard/events",
      icon: FaCalendarAlt,
    }
]

function EventsGroup() {

    const renderMenu = () => {
        return items.map((item) => (
            <GroupItem key={item.title} {...item} />
        ));
    };

    return(
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted">Events</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenu()}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default EventsGroup;