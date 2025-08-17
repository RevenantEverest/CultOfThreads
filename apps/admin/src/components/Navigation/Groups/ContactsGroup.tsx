import { 
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu
} from '@repo/ui';

import GroupItem from '../GroupItem';

import { MdPermContactCalendar } from 'react-icons/md';

const items = [
    {
      title: "Contacts List",
      url: "/dashboard/contacts",
      icon: MdPermContactCalendar,
    }
]

function ContactsGroup() {

    const renderMenu = () => {
        return items.map((item) => (
            <GroupItem key={item.title} {...item} />
        ));
    };

    return(
        <SidebarGroup>
            <SidebarGroupLabel className="font-semibold text-muted">Contacts</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {renderMenu()}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default ContactsGroup;